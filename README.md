# 受流行病学模型预测启发的道路SIR<br>
## 运行说明:  
### 1.环境说明,python3.9，具体见requirements.txt  
### 2.model.ipynb(基于真实城市特征生成模拟交通数据，成都市的综合交通流量分析系统，结合了交通建模、数据分析和可视化的各个方面。该系统使用多种高级技术来分析和预测流量模式。)
环境配置完成后，正常运行即可。
### 3.SIR.ipynb(使用网络理论、流行病学模型（SIR 模型）和数据模拟相结合的方式对成都的交通拥堵进行建模和分析)
### 4.网页大屏(车辆综合管控平台)  
#### 启动大屏：先运行main.py文件，使后端数据开始输送；
#### 然后用浏览器打开index.html文件，即可以打开大屏。
#### index.html中<script src="https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js"></script>
####   <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
#### 分别引入了Echarts库和axios库
### 5.demo.py（利用Streamlit进行可视化）  
同样，在环境配置完成后，正常运行即可。

