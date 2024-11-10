#!/usr/bin/env python
# coding: utf-8

# In[ ]:


import streamlit as st
import pandas as pd
import numpy as np
import networkx as nx
import plotly.express as px
import plotly.graph_objects as go
from datetime import datetime, timedelta
import matplotlib.pyplot as plt
import seaborn as sns
from scipy.integrate import odeint
import time

# 设置页面配置
st.set_page_config(page_title="成都智能交通管理系统", layout="wide")

from module import (
    sir_traffic_model,time_factor,analyze_interventions
)

# 复用原有的常量定义
LANDMARKS = {
    'Chunxi Road': (0, 0),
    'Taikoo Li': (0.5, 0.5),
    'Kuanzhai Alley': (-1, 1),
    'Du Fu Thatched Cottage': (-2, -1),
    'Jinli': (-1.5, -1.5),
    'Panda Base': (3, 2),
    'Tianfu Square': (0.2, -0.2),
    'Eastern Suburb Memory': (2.5, -1),
}

# 干预措施及其效果
INTERVENTIONS = {
    'Traffic Signal Optimization': {'reduction': 15, 'cost': 'Medium', 'implementation_time': 'Short'},
    'Public Transport Improvement': {'reduction': 22, 'cost': 'High', 'implementation_time': 'Long'},
    'Road Expansion': {'reduction': 18, 'cost': 'High', 'implementation_time': 'Long'},
    'Congestion Pricing': {'reduction': 20, 'cost': 'Low', 'implementation_time': 'Medium'},
    'Work from Home Promotion': {'reduction': 25, 'cost': 'Low', 'implementation_time': 'Short'},
    'Smart Traffic Management': {'reduction': 23, 'cost': 'Medium', 'implementation_time': 'Medium'},
}

class TrafficDataGenerator:
    def __init__(self):
        self.last_update = None
        self.historical_data = None
        self.update_interval = 300  # 更新间隔(秒)
        
        # 基础参数
        self.base_congestion = 40
        self.base_volume = 800
        self.base_speed = 45
        
        # 每个地标的基础拥堵水平
        self.landmark_base_congestion = {
            'Chunxi Road': 65,
            'Taikoo Li': 60,
            'Kuanzhai Alley': 55,
            'Du Fu Thatched Cottage': 35,
            'Jinli': 50,
            'Panda Base': 30,
            'Tianfu Square': 70,
            'Eastern Suburb Memory': 40
        }
        
        # 添加区域人口密度数据（人/平方公里）
        self.population_density = {
            'Chunxi Road': 25000,      # 商业中心区，人口密度最高
            'Taikoo Li': 22000,        # 高端商业区
            'Kuanzhai Alley': 18000,   # 文化旅游区
            'Tianfu Square': 20000,    # 市中心
            'Jinli': 15000,            # 文化商业区
            'Eastern Suburb Memory': 8000,  # 文创区
            'Du Fu Thatched Cottage': 5000, # 景区
            'Panda Base': 3000,        # 郊区
        }
        
        # 添加时间段人口流动系数
        self.time_population_factor = {
            'morning': {    # 早高峰(7-9点)
                'residential': 0.8,     # 人口流出
                'commercial': 1.5,      # 人口流入
                'tourist': 0.7          # 较少游客
            },
            'evening': {    # 晚高峰(17-19点)
                'residential': 1.5,     # 人口流入
                'commercial': 0.8,      # 人口流出
                'tourist': 1.2          # 较多游客
            },
            'midday': {     # 中午(11-14点)
                'residential': 1.0,
                'commercial': 1.3,
                'tourist': 1.4
            },
            'night': {      # 夜间(20-23点)
                'residential': 1.2,
                'commercial': 1.4,
                'tourist': 1.0
            },
            'late_night': { # 深夜(23-6点)
                'residential': 1.0,
                'commercial': 0.3,
                'tourist': 0.1
            }
        }
        
        # 区域类型定义
        self.area_types = {
            'Chunxi Road': 'commercial',
            'Taikoo Li': 'commercial',
            'Kuanzhai Alley': 'tourist',
            'Tianfu Square': 'commercial',
            'Jinli': 'tourist',
            'Eastern Suburb Memory': 'tourist',
            'Du Fu Thatched Cottage': 'tourist',
            'Panda Base': 'tourist'
        }
    def _generate_daily_pattern(self, hour):
        """生成每日交通模式"""
        # 早高峰 (7-9点)
        if 7 <= hour <= 9:
            return np.random.normal(1.6, 0.1)
        # 晚高峰 (17-19点)
        elif 17 <= hour <= 19:
            return np.random.normal(1.8, 0.15)
        # 中午峰值 (12-13点)
        elif 12 <= hour <= 13:
            return np.random.normal(1.3, 0.1)
        # 深夜 (23-5点)
        elif hour >= 23 or hour <= 5:
            return np.random.normal(0.4, 0.05)
        # 其他时间
        else:
            return np.random.normal(1.0, 0.1)
            
    def _generate_weekly_pattern(self, day_of_week):
        """生成每周交通模式"""
        # 周末
        if day_of_week in [5, 6]:
            return np.random.normal(1.2, 0.1)
        # 周五
        elif day_of_week == 4:
            return np.random.normal(1.3, 0.1)
        # 工作日
        else:
            return np.random.normal(1.0, 0.05)
            
    def _apply_weather_effect(self, base_value, timestamp):
        """模拟天气影响"""
        # 使用时间戳的小时作为随机种子，确保同一小时内天气影响一致
        hour_seed = int(timestamp.timestamp() // 3600)
        np.random.seed(hour_seed)
        
        # 随机生成天气状况 (0: 晴天, 1: 多云, 2: 雨天)
        weather = np.random.choice([0, 1, 2], p=[0.6, 0.3, 0.1])
        
        if weather == 0:  # 晴天
            return base_value * np.random.normal(1.0, 0.05)
        elif weather == 1:  # 多云
            return base_value * np.random.normal(1.1, 0.07)
        else:  # 雨天
            return base_value * np.random.normal(1.3, 0.1)
            
    def _generate_special_events(self, timestamp):
        """生成特殊事件影响"""
        # 使用时间戳作为随机种子
        day_seed = int(timestamp.timestamp() // 86400)
        np.random.seed(day_seed)
        
        # 随机生成特殊事件 (0: 无事件, 1: 小型事件, 2: 大型事件)
        event = np.random.choice([0, 1, 2], p=[0.8, 0.15, 0.05])
        
        if event == 0:
            return 1.0
        elif event == 1:
            return np.random.uniform(1.2, 1.4)
        else:
            return np.random.uniform(1.5, 2.0)
            
    def _generate_incident_effects(self, timestamp):
        """生成交通事故等突发事件的影响"""
        hour_seed = int(timestamp.timestamp() // 3600)
        np.random.seed(hour_seed)
        
        # 随机生成突发事件 (0: 无事件, 1: 小事故, 2: 严重事故)
        incident = np.random.choice([0, 1, 2], p=[0.95, 0.04, 0.01])
        
        if incident == 0:
            return 1.0
        elif incident == 1:
            return np.random.uniform(1.3, 1.5)
        else:
            return np.random.uniform(1.8, 2.5)
    
#     def _calculate_metrics(self, base_congestion, timestamp):
#         """计算所有交通指标"""
#         hour = timestamp.hour
#         day_of_week = timestamp.weekday()
        
#         # 应用各种模式和效应
#         daily_effect = self._generate_daily_pattern(hour)
#         weekly_effect = self._generate_weekly_pattern(day_of_week)
#         weather_effect = self._apply_weather_effect(1, timestamp)
#         special_event_effect = self._generate_special_events(timestamp)
#         incident_effect = self._generate_incident_effects(timestamp)
        
#         # 计算最终拥堵指数
#         congestion = base_congestion * daily_effect * weekly_effect * weather_effect * special_event_effect * incident_effect
#         congestion = min(100, max(0, congestion))  # 限制在0-100范围内
        
#         # 计算相关指标
#         # 交通流量与拥堵程度成反比
#         volume = self.base_volume * (2 - congestion/100) * np.random.normal(1, 0.1)
        
#         # 平均速度与拥堵程度成反比
#         speed = self.base_speed * (1.5 - congestion/100) * np.random.normal(1, 0.05)
#         speed = max(5, min(80, speed))  # 限制在合理范围内
        
#         return congestion, volume, speed
        
#     def _generate_landmark_data(self, timestamp):
#         """生成各地标的交通数据"""
#         landmark_data = []
        
#         for landmark, base_congestion in self.landmark_base_congestion.items():
#             congestion, volume, speed = self._calculate_metrics(base_congestion, timestamp)
#             landmark_data.append({
#                 'timestamp': timestamp,
#                 'location': landmark,
#                 'congestion_index': congestion,
#                 'traffic_volume': volume,
#                 'average_speed': speed
#             })
            
#         return pd.DataFrame(landmark_data)
    def _get_time_period(self, hour):
        """确定时间段"""
        if 7 <= hour < 9:
            return 'morning'
        elif 17 <= hour < 19:
            return 'evening'
        elif 11 <= hour < 14:
            return 'midday'
        elif 20 <= hour < 23:
            return 'night'
        else:
            return 'late_night'

    def _calculate_population_impact(self, location, timestamp):
        """计算人口密度对交通的影响"""
        hour = timestamp.hour
        time_period = self._get_time_period(hour)
        area_type = self.area_types[location]
        base_density = self.population_density[location]
        
        # 获取时间段系数
        time_factor = self.time_population_factor[time_period][area_type]
        
        # 考虑周末效应
        is_weekend = timestamp.weekday() >= 5
        weekend_factor = 1.2 if is_weekend else 1.0
        
        # 考虑节假日效应（简化处理）
        is_holiday = self._is_holiday(timestamp)
        holiday_factor = 1.3 if is_holiday else 1.0
        
        # 计算实际人口密度影响
        population_impact = (base_density * time_factor * weekend_factor * holiday_factor) / 25000  # 归一化
        
        return min(2.0, max(0.5, population_impact))  # 限制在合理范围内

    def _is_holiday(self, timestamp):
        """判断是否为节假日（简化版）"""
        # 这里可以添加更详细的节假日判断逻辑
        major_holidays = [
            (1, 1),   # 元旦
            (5, 1),   # 劳动节
            (10, 1),  # 国庆节
        ]
        return (timestamp.month, timestamp.day) in major_holidays

    def _calculate_metrics(self, base_congestion, timestamp, location):
        """计算所有交通指标（修改版）"""
        # 获取原有的效应
        hour = timestamp.hour
        day_of_week = timestamp.weekday()
        
        daily_effect = self._generate_daily_pattern(hour)
        weekly_effect = self._generate_weekly_pattern(day_of_week)
        weather_effect = self._apply_weather_effect(1, timestamp)
        special_event_effect = self._generate_special_events(timestamp)
        incident_effect = self._generate_incident_effects(timestamp)
        
        # 添加人口密度影响
        population_effect = self._calculate_population_impact(location, timestamp)
        
        # 计算最终拥堵指数
        congestion = (base_congestion * 
                     daily_effect * 
                     weekly_effect * 
                     weather_effect * 
                     special_event_effect * 
                     incident_effect * 
                     population_effect)
        
        congestion = min(100, max(0, congestion))
        
        # 计算相关指标
        volume = self.base_volume * (2 - congestion/100) * population_effect * np.random.normal(1, 0.1)
        speed = self.base_speed * (1.5 - congestion/100) * np.random.normal(1, 0.05)
        speed = max(5, min(80, speed))
        
        return congestion, volume, speed

    def _generate_landmark_data(self, timestamp):
        """生成各地标的交通数据（修改版）"""
        landmark_data = []
        
        for landmark, base_congestion in self.landmark_base_congestion.items():
            congestion, volume, speed = self._calculate_metrics(base_congestion, timestamp, landmark)
            landmark_data.append({
                'timestamp': timestamp,
                'location': landmark,
                'congestion_index': congestion,
                'traffic_volume': volume,
                'average_speed': speed,
                'population_density': self.population_density[landmark],
                'area_type': self.area_types[landmark]
            })
            
        return pd.DataFrame(landmark_data)
        
    def get_latest_data(self, lookback_hours=48):
        """获取最新数据，如果数据过期则更新"""
        current_time = datetime.now()
        
        # 检查是否需要更新数据
        if (self.last_update is None or 
            (current_time - self.last_update).total_seconds() > self.update_interval):
            
            # 生成历史数据
            if self.historical_data is None:
                start_time = current_time - timedelta(hours=lookback_hours)
                timestamps = pd.date_range(start_time, current_time, freq='5T')
                all_data = []
                
                for ts in timestamps:
                    all_data.append(self._generate_landmark_data(ts))
                
                self.historical_data = pd.concat(all_data)
            else:
                # 只生成新的数据点
                new_data = self._generate_landmark_data(current_time)
                
                # 移除旧数据并添加新数据
                cutoff_time = current_time - timedelta(hours=lookback_hours)
                self.historical_data = pd.concat([
                    self.historical_data[self.historical_data['timestamp'] > cutoff_time],
                    new_data
                ])
            
            self.last_update = current_time
            
        return self.historical_data
        
    def get_current_status(self):
        """获取当前状态"""
        current_time = datetime.now()
        return self._generate_landmark_data(current_time)

# 修改原有的 generate_mock_data 函数
def generate_mock_data():
    """生成模拟数据的主函数"""
    # 创建全局数据生成器实例（如果不存在）
    if not hasattr(generate_mock_data, 'generator'):
        generate_mock_data.generator = TrafficDataGenerator()
        
    # 获取最新数据
    data = generate_mock_data.generator.get_latest_data()
    
    # 添加时间特征
    data['hour'] = data['timestamp'].dt.hour
    data['is_peak'] = data['hour'].apply(lambda x: 1 if (x in range(7,10) or x in range(17,20)) else 0)
    data = generate_mock_data.generator.get_latest_data()
    
    # 添加 congestion_level 列
    data['congestion_level'] = data['congestion_index']
    
    return data

def create_heatmap(df):
    """创建交通热力图"""
    pivot_data = df.pivot_table(
        values='congestion_index',
        index=df['timestamp'].dt.date,
        columns=df['timestamp'].dt.hour,
        aggfunc='mean'
    )
    
    fig = go.Figure(data=go.Heatmap(
        z=pivot_data.values,
        x=pivot_data.columns,
        y=pivot_data.index,
        colorscale='RdYlBu_r'
    ))
    
    fig.update_layout(
        title='交通拥堵热力图',
        xaxis_title='小时',
        yaxis_title='日期',
        height=400
    )
    
    return fig


class TrafficPredictor:
    def __init__(self):
        # 预测模型参数
        self.alpha = 0.3  # 时间衰减因子
        self.beta = 0.4   # 历史模式权重
        self.gamma = 0.3  # 外部因素权重
        
    def _get_historical_pattern(self, df, hour):
        """获取特定小时的历史模式"""
        return df[df['hour'] == hour]['congestion_index'].mean()
    
    def _calculate_trend(self, recent_values):
        """计算近期趋势"""
        if len(recent_values) < 2:
            return 0
        return np.polyfit(range(len(recent_values)), recent_values, 1)[0]
    
    def _external_factors(self, hour, day_of_week):
        """考虑外部因素的影响"""
        # 基础负载
        base_load = 50
        
        # 考虑高峰时段
        if hour in range(7, 10):  # 早高峰
            base_load += 30
        elif hour in range(17, 20):  # 晚高峰
            base_load += 25
        
        # 工作日/周末效应
        if day_of_week in [5, 6]:  # 周末
            base_load *= 0.8
        
        # 添加天气影响（模拟）
        weather_effect = np.random.normal(0, 5)
        
        return base_load + weather_effect
    
    def _traffic_flow_model(self, state, t, params):
        """使用简化的交通流动力学模型"""
        density, velocity = state
        max_density, free_flow_speed, interaction_strength = params
        
        # 简化的交通流方程
        dρ_dt = -velocity * density + interaction_strength * (max_density - density)
        dv_dt = (free_flow_speed - velocity) / 5 - 0.1 * density
        
        return [dρ_dt, dv_dt]

    def predict(self, df, start_time, periods=24):
        """预测未来交通状况"""
        predictions = []
        current_congestion = df.iloc[-1]['congestion_index']
        
        # 获取最近的观测值
        recent_values = df.tail(6)['congestion_index'].values
        
        for i in range(periods):
            future_time = start_time + timedelta(hours=i)
            hour = future_time.hour
            day_of_week = future_time.weekday()
            
            # 1. 历史模式
            historical_pattern = self._get_historical_pattern(df, hour)
            
            # 2. 趋势分析
            trend = self._calculate_trend(recent_values)
            
            # 3. 外部因素
            external_effect = self._external_factors(hour, day_of_week)
            
            # 4. 动力学模型
            # 使用简化的交通流模型
            params = [100, 60, 0.1]  # max_density, free_flow_speed, interaction_strength
            t = np.linspace(0, 1, 2)
            initial_state = [current_congestion/2, 30]  # 初始密度和速度
            solution = odeint(self._traffic_flow_model, initial_state, t, args=(params,))
            model_prediction = solution[-1][0] * 2  # 转换回拥堵指数
            
            # 组合预测
            prediction = (
                self.alpha * model_prediction +
                self.beta * historical_pattern +
                self.gamma * external_effect
            )
            
            # 添加一些随机扰动
            noise = np.random.normal(0, 2)
            prediction = max(0, min(100, prediction + noise))  # 确保在0-100范围内
            
            predictions.append(prediction)
            
            # 更新最近值列表
            recent_values = np.roll(recent_values, -1)
            recent_values[-1] = prediction
            current_congestion = prediction
            
        return pd.DataFrame({
            'timestamp': pd.date_range(start_time, periods=periods, freq='H'),
            'predicted_congestion': predictions
        })

def predict_traffic(df):
    """预测未来交通状况的主函数"""
    predictor = TrafficPredictor()
    predictions = predictor.predict(df, datetime.now())
    return predictions

def recommend_interventions(congestion_level):
    """基于当前拥堵水平推荐干预措施"""
    if congestion_level >= 80:
        return ['Congestion Pricing', 'Work from Home Promotion', 'Traffic Signal Optimization']
    elif congestion_level >= 60:
        return ['Traffic Signal Optimization', 'Smart Traffic Management']
    else:
        return ['Public Transport Improvement']

def main():
    st.title("成都智能交通管理系统")
    
    # 生成模拟数据
    df = generate_mock_data()
    
    # 侧边栏：时间选择和过滤器
    st.sidebar.header("控制面板")
    selected_date = st.sidebar.date_input(
        "选择日期",
        datetime.now()
    )
    
    selected_hour = st.sidebar.slider(
        "选择时间",
        0, 23, datetime.now().hour
    )
    
    # 主页面分为三列
    col1, col2, col3 = st.columns(3)
    
    # 当前状态指标
    current_data = df[
        (df['timestamp'].dt.date == selected_date) & 
        (df['timestamp'].dt.hour == selected_hour)
    ].iloc[0] if len(df) > 0 else None
    
    if current_data is not None:
        with col1:
            st.metric(
                label="当前拥堵指数",
                value=f"{current_data['congestion_index']:.1f}",
                delta=f"{current_data['congestion_index'] - df['congestion_index'].mean():.1f}"
            )
            
        with col2:
            st.metric(
                label="交通流量",
                value=f"{current_data['traffic_volume']:.0f}",
                delta=f"{current_data['traffic_volume'] - df['traffic_volume'].mean():.0f}"
            )
            
        with col3:
            st.metric(
                label="平均车速",
                value=f"{current_data['average_speed']:.1f} km/h",
                delta=f"{current_data['average_speed'] - df['average_speed'].mean():.1f}"
            )
    
    # 交通热力图
    st.subheader("交通状况热力图")
    st.plotly_chart(create_heatmap(df), use_container_width=True)
    
    # 分两列显示预测和建议
    col_pred, col_rec = st.columns(2)
    
    with col_pred:
        st.subheader("未来24小时预测")
        predictions = predict_traffic(df)
        fig_pred = px.line(predictions, 
                          x='timestamp', 
                          y='predicted_congestion',
                          title="交通拥堵预测")
        st.plotly_chart(fig_pred, use_container_width=True)
    
    with col_rec:
        st.subheader("干预措施建议")
        if current_data is not None:
            current_congestion = current_data['congestion_index']
            recommended = recommend_interventions(current_congestion)
            
            for intervention in recommended:
                effect = INTERVENTIONS[intervention]
                st.info(
                    f"建议采取: {intervention}\n"
                    f"- 预期改善: {effect['reduction']}%\n"
                    f"- 成本: {effect['cost']}\n"
                    f"- 实施时间: {effect['implementation_time']}"
                )
    
    # 区域分析
    st.subheader("区域拥堵分析")
    area_data = pd.DataFrame({
        'area': list(LANDMARKS.keys()),
        'congestion': np.random.normal(60, 15, len(LANDMARKS)),
        'flow': np.random.normal(1000, 200, len(LANDMARKS))
    })
    
    fig_area = px.bar(area_data,
                     x='area',
                     y='congestion',
                     color='flow',
                     title="各区域拥堵状况")
    st.plotly_chart(fig_area, use_container_width=True)
    
    # 高峰时段分析
    st.subheader("高峰时段分析")
    peak_hours_data = df[df['is_peak'] == 1].copy()
    fig_peak = px.box(peak_hours_data, 
                      x='hour', 
                      y='congestion_index',
                      title="高峰时段拥堵分布")
    st.plotly_chart(fig_peak, use_container_width=True)

    #st.subheader("干预措施分析")
    intervention_analysis = analyze_interventions(df)
    
if __name__ == "__main__":
    main()

