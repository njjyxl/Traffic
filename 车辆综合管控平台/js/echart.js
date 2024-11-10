// $(function () {
//     /*echart_1();*/
//     echart_2();

//     echart_3();
//     /*echart_4();*/

//     /*echart_map();*/
//     echarts_1();
//     echarts_4();
//     echarts_2();
//     char4();


    //echart_1
    


    // function echarts_1() {
    //     // 定义echarts实例
    //     var myChart = echarts.init(document.getElementById('echarts_1'));
    
    //     // 从后端获取数据
    //     axios.get('http://127.0.0.1:5000/get_data', {
    //         params: {
    //             hour: h,
    //             day: d
    //         }
    //     })
    //     .then(res => {
    //         // 从响应中提取数据
    //         var data = [
    //             { value: res.data[1]["0.8-1"], name: '0.8~1' },
    //             { value: res.data[1]["0.5-0.8"], name: '0.5~0.8' },
    //             { value: res.data[1]["0-0.5"], name: '0~0.5' }
    //         ];
    
    //         // 配置图表的选项
    //         var option = {
    //             backgroundColor: 'rgba(0,0,0,0)',
    //             tooltip: {
    //                 trigger: 'item',
    //                 formatter: "{b}: <br/>{c} ({d}%)"
    //             },
    //             color: ['#af89d6', '#4ac7f5', '#0089ff'],
    //             legend: {
    //                 x: '70%',
    //                 y: 'center',
    //                 orient: 'vertical',
    //                 itemGap: 12,
    //                 itemWidth: 10,
    //                 itemHeight: 10,
    //                 icon: 'rect',
    //                 data: ['0.8~1', '0.5~0.8', '0~0.5'],
    //                 textStyle: {
    //                     color: [],
    //                     fontStyle: 'normal',
    //                     fontFamily: '微软雅黑',
    //                     fontSize: 12,
    //                 }
    //             },
    //             series: [{
    //                 name: '不同拥堵比例',
    //                 type: 'pie',
    //                 clockwise: false,
    //                 minAngle: 20,
    //                 center: ['40%', '50%'],
    //                 radius: [90, 120],
    //                 avoidLabelOverlap: true,
    //                 itemStyle: {
    //                     normal: {
    //                         borderColor: '#1e2239',
    //                         borderWidth: 2,
    //                     },
    //                 },
    //                 label: {
    //                     normal: {
    //                         show: true,
    //                         position: 'inside',
    //                         formatter: "{d}%",
    //                         textStyle: {
    //                             color: '#fff',
    //                         }
    //                     },
    //                     emphasis: {
    //                         show: true,
    //                         textStyle: {
    //                             fontWeight: 'bold'
    //                         }
    //                     }
    //                 },
    //                 data: data
    //             }, {
    //                 name: '',
    //                 type: 'pie',
    //                 clockwise: false,
    //                 silent: true,
    //                 minAngle: 20,
    //                 center: ['40%', '50%'],
    //                 radius: [0, 80],
    //                 itemStyle: {
    //                     normal: {
    //                         borderColor: '#1e2239',
    //                         borderWidth: 1.5,
    //                         opacity: 0.21,
    //                     }
    //                 },
    //                 label: {
    //                     normal: {
    //                         show: false,
    //                     }
    //                 },
    //                 data: data
    //             }]
    //         };
    
    //         // 使用配置项和数据显示图表
    //         myChart.setOption(option);
    
    //         // 监听窗口大小变化，自动调整图表大小
    //         window.addEventListener("resize", function() {
    //             myChart.resize();
    //         });
    //     })
    //     .catch(err => {
    //         console.error("数据请求失败：", err);
    //     });
    // }
    //echart_2
    // function echart_2() {
    //     // 基于准备好的dom，初始化echarts实例
    //     var myChart = echarts.init(document.getElementById('chart_2'));
    
    //     option = {
    //         // title: {
    //         //     text: '综合指标图表',
    //         //     x: 'center'
    //         // },
    //         tooltip: {
    //             trigger: 'axis',
    //             axisPointer: {
    //                 type: 'shadow'
    //             }
    //         },
    //         legend: {
    //             data: ['traffic_volume', 'population_density', 'public_transit_usage', 'num_poi'],
    //             textStyle: {
    //                 color: '#fff',
    //                 fontSize: 16  // 原本是18，现在减小2
    //             }
    //         },
    //         grid: [{
    //             top: '36%',
    //             height: '40%',
    //             left: '0%',
    //             right: '5%',
    //             containLabel: true
    //         }, {
    //             bottom: '50%',
    //             height: '35%',
    //             left: '5%',
    //             right: '5%',
    //             containLabel: true
    //         }],
    //         xAxis: [{
    //             type: 'value',
    //             position: 'bottom',
    //             name: 'traffic_volume & population_density',
    //             nameLocation: 'middle',
    //             nameGap: 20,
    //             nameTextStyle: {
    //                 fontSize: 16,  // 原本是18，现在减小2
    //                 color: '#fff'
    //             },
    //             axisLabel: {
    //                 color: '#fff',
    //                 fontSize: 14  // 原本是16，现在减小2
    //             },
    //             splitLine: { show: false }
    //         }, {
    //             type: 'value',
    //             position: 'top',
    //             name: 'public_transit_usage & num_poi',
    //             nameLocation: 'middle',
    //             nameGap: 20,
    //             nameTextStyle: {
    //                 fontSize: 16,  // 原本是18，现在减小2
    //                 color: '#fff'
    //             },
    //             axisLabel: {
    //                 color: '#fff',
    //                 fontSize: 14  // 原本是16，现在减小2
    //             },
    //             splitLine: { show: false }
    //         }],
    //         yAxis: [{
    //             type: 'category',
    //             data: ['指标'],
    //             axisLabel: {
    //                 interval: 0,
    //                 rotate: 30,
    //                 color: '#fff',
    //                 fontSize: 14  // 原本是16，现在减小2
    //             },
    //             splitLine: { show: false }
    //         }],
    //         series: [{
    //             name: 'traffic_volume',
    //             type: 'bar',
    //             data: [1469],
    //             xAxisIndex: 1,
    //             yAxisIndex: 0,
    //             barWidth: '45%',
    //             label: {
    //                 show: true,
    //                 position: 'inside',  // 将数字显示在柱状图内部
    //                 color: '#fff',
    //                 fontSize: 14  // 原本是16，现在减小2
    //             }
    //         }, {
    //             name: 'population_density',
    //             type: 'bar',
    //             data: [13561],
    //             xAxisIndex: 1,
    //             yAxisIndex: 0,
    //             barWidth: '45%',
    //             label: {
    //                 show: true,
    //                 position: 'inside',  // 将数字显示在柱状图内部
    //                 color: '#fff',
    //                 fontSize: 14  // 原本是16，现在减小2
    //             }
    //         }, {
    //             name: 'public_transit_usage',
    //             type: 'bar',
    //             data: [129],
    //             xAxisIndex: 0,
    //             yAxisIndex: 0,
    //             barWidth: '45%',
    //             label: {
    //                 show: true,
    //                 position: 'inside',  // 将数字显示在柱状图内部
    //                 color: '#fff',
    //                 fontSize: 14  // 原本是16，现在减小2
    //             }
    //         }, {
    //             name: 'num_poi',
    //             type: 'bar',
    //             data: [11],
    //             xAxisIndex: 0,
    //             yAxisIndex: 0,
    //             barWidth: '45%',
    //             label: {
    //                 show: true,
    //                 position: 'inside',  // 将数字显示在柱状图内部
    //                 color: '#fff',
    //                 fontSize: 14  // 原本是16，现在减小2
    //             }
    //         }]
    //     };
    
    //     // 使用刚指定的配置项和数据显示图表。
    //     myChart.setOption(option);
    //     window.addEventListener("resize", function () {
    //         myChart.resize();
    //     });
    // }
    
   

    //echart_3
    // function echart_3() {
    //     // 基于准备好的dom，初始化echarts实例
    //     var myChart = echarts.init(document.getElementById('chart_3'));
    
    //     // 明确列出50条道路的名称
    //     var yAxisData = [
    //         '天安门路', '长安街', '复兴路', '建国路', '平安大街', '西直门外大街', 
    //         '东直门外大街', '德胜门外大街', '安定门外大街', '广渠路', '崇文门外大街', 
    //         '永定门外大街', '西二环', '东二环', '北二环', '南二环', '西三环', '东三环', 
    //         '北三环', '南三环', '西四环', '东四环', '北四环', '南四环', '西五环', '东五环', 
    //         '北五环', '南五环', '机场高速', '京藏高速', '京开高速', '京港澳高速', '京沪高速', 
    //         '京哈高速', '京承高速', '京昆高速', '京台高速', '京新高速', '京津塘高速', '京平高速', 
    //         '京通快速', '京密路', '京原路', '京昌公路', '京石公路', '京拉公路', '京张公路', 
    //         '京沈公路', '京秦公路', '京唐公路', '京涿公路'
    //     ];
    
    //     // 每条道路的车流量数值
    //     var trafficData = [120, 140, 100, 120, 300, 230, 130, 170, 140, 120, 300, 230, 120, 140, 100, 120, 300, 230, 130, 170,
    //                        140, 120, 300, 230, 120, 140, 100, 120, 300, 230, 130, 170, 140, 120, 300, 230, 120, 140, 100, 120,
    //                        300, 230, 130, 170, 140, 120, 300, 230, 120, 140, 100];
    
    //     var option = {
    //         backgroundColor: 'transparent',
    //         // title: {
    //         //     text: '50条道路的车流量统计',
    //         //     textAlign: 'left',
    //         //     textStyle: {
    //         //         color: "#fff",
    //         //         fontSize: "16",
    //         //         fontWeight: "normal"
    //         //     }
    //         // },
    //         tooltip: {
    //             trigger: 'axis',
    //             axisPointer: {
    //                 type: 'shadow'
    //             }
    //         },
    //         // legend: {
    //         //     data: ['车流量']
    //         // },
    //         grid: {
    //             left: '20%',
    //             top: "0%",
    //             bottom: "5%",
    //             right: "4%",
    //             containLabel: true
    //         },
    //         xAxis: {
    //             type: 'value',
    //             axisLabel: {
    //                 textStyle: {
    //                     color: '#fff',
    //                     fontSize: 12
    //                 }
    //             },
    //             axisLine: {
    //                 show: true,
    //                 lineStyle: {
    //                     color: '#2c3459'
    //                 }
    //             },
    //             axisTick: {
    //                 show: false
    //             }
    //         },
    //         yAxis: {
    //             type: 'category',
    //             data: yAxisData,
    //             axisTick: {
    //                 show: false
    //             },
    //             axisLabel: {
    //                 textStyle: {
    //                     color: '#fff',
    //                     fontSize: 12
    //                 }
    //             },
    //             axisLine: {
    //                 show: true,
    //                 lineStyle: {
    //                     color: '#2c3459'
    //                 }
    //             }
    //         },
    //         series: [{
    //             name: '车流量',
    //             type: 'bar',
    //             data: trafficData,
    //             barWidth: '60%'
    //         }]
    //     };
    
    //     // 使用刚指定的配置项和数据显示图表。
    //     myChart.setOption(option);
    //     window.addEventListener("resize", function () {
    //         myChart.resize();
    //     });
    // }
    
    // function echarts_4() {
    //     // 基于准备好的dom，初始化echarts实例
    //     var myChart = echarts.init(document.getElementById('echart4'));
    //     option = {
    //         tooltip: {
    //             trigger: 'axis',
    //             axisPointer: {
    //                 lineStyle: {
    //                     color: '#57617B'
    //                 }
    //             }
    //         },
    //         "legend": {

    //             "data": [
    //                 {"name": "traffic_volume"},
    //                 // {"name": "图例2"},
    //                 {"name": "congestion_level"}
    //             ],
    //             "top": "0%",
    //             "textStyle": {
    //                 "color": "rgba(255,255,255,0.9)"//图例文字
    //             }
    //         },

    //         "xAxis": [
    //             {
    //                 "type": "category",

    //                 data: ['Chunxi Road-Taikoo Li', 'Chunxi Road-Kuanzhai Alley', 'Chunxi Road-Eastern Suburb Memory', 'Taikoo Li-Tianfu Square', 'Du Fu Thatched Cottage-Jinli', 'Jinli-Tianfu Square'],
    //                 axisLine: { lineStyle: {color: "rgba(255,255,255,1)"}},
    //                 axisLabel:  { textStyle: {color: "rgba(255,255,255,1)", fontSize: '6', },
    //                 },

    //             },
    //         ],
    //         "yAxis": [
    //             {
    //                 "type": "value",
    //                 "name": "traffic_volume",
    //                 "min": 0,
    //                 "max": 6627,
    //                 "interval": 1000,
    //                 "axisLabel": {
    //                     "show": true,

    //                 },
    //                 axisLine: {lineStyle: {color: 'rgba(255,255,67,.8)'}},//左线色

    //             },
    //             {
    //                 "type": "value",
    //                 "name": "congestion_level",
    //                 "min": 0,
    //                 "max": 1,
    //                 "interval": 0.1,
    //                 "show": true,
    //                 "axisLabel": {
    //                     "show": true,

    //                 },
    //                 axisLine: {lineStyle: {color: 'rgba(255,255,67,.8)'}},//右线色
    //                 splitLine: {show:true,lineStyle: {color:"#ffffff"}},//x轴线
    //             },
    //         ],
    //         "grid": {
    //             "top": "10%",
    //             "right":"30",
    //             "bottom":"30",
    //             "left":"38",
    //         },
    //         "series": [
    //             {
    //                 "name": "traffic_volume",

    //                 "type": "bar",
    //                 "data": [1469.860396,1833.099356,2859.203157,2304.917299,880.6405036,1104.060803],
    //                 "barWidth": "auto",
    //                 "itemStyle": {
    //                     "normal": {
    //                         "color": {
    //                             "type": "linear",
    //                             "x": 0,
    //                             "y": 0,
    //                             // "x2": 0,
    //                             // "y2": 1,
    //                             "colorStops": [
    //                                 {
    //                                     "offset": 0,
    //                                     "color": "#609db8"
    //                                 },

    //                                 {
    //                                     "offset": 1,
    //                                     "color": "#609db8"
    //                                 }
    //                             ],
    //                             "globalCoord": false
    //                         }
    //                     }
    //                 }
    //             },
               
    //             {
    //                 "name": "congestion_level",
    //                 "type": "line",
    //                 "yAxisIndex": 1,

    //                 "data": [1,1,0.960087113,1,1,1],
    //                 lineStyle: {
    //                     normal: {
    //                         width: 2
    //                     },
    //                 },
    //                 "itemStyle": {
    //                     "normal": {
    //                         "color": "#cdba00",

    //                     }
    //                 },
    //                 "smooth": true
    //             }
    //         ]
    //     };


    //     // 使用刚指定的配置项和数据显示图表。
    //     myChart.setOption(option);
    //     window.addEventListener("resize",function(){
    //         myChart.resize();
    //     });
    // }

// })


// function echarts_2() {
//     // 基于准备好的dom，初始化echarts实例
//     var myChart = echarts.init(document.getElementById('echarts_2'));

//     // 道路名称列表
//     var roadNames = [
//         'Chunxi Road-Taikoo Li', 'Chunxi Road-Kuanzhai Alley', 'Chunxi Road-Eastern Suburb Memory', 
//         'Taikoo Li-Tianfu Square', 'Du Fu Thatched Cottage-Jinli', 'Jinli-Tianfu Square',
//         'Road 7', 'Road 8', 'Road 9', 'Road 10', 'Road 11', 'Road 12', 'Road 13', 'Road 14', 
//         'Road 15', 'Road 16', 'Road 17', 'Road 18', 'Road 19', 'Road 20', 'Road 21', 'Road 22', 
//         'Road 23', 'Road 24', 'Road 25', 'Road 26', 'Road 27', 'Road 28', 'Road 29', 'Road 30', 
//         'Road 31', 'Road 32', 'Road 33', 'Road 34', 'Road 35', 'Road 36', 'Road 37', 'Road 38', 
//         'Road 39', 'Road 40', 'Road 41', 'Road 42', 'Road 43', 'Road 44', 'Road 45', 'Road 46', 
//         'Road 47', 'Road 48', 'Road 49', 'Road 50'
//     ];

//     // 每条道路的拥堵程度数值
//     var congestionLevels = [0.9, 0.85, 0.92, 0.88, 0.95, 0.91,
//         0.8, 0.82, 0.87, 0.89, 0.9, 0.93, 0.91, 0.88, 0.87, 0.89, 0.92, 0.91, 0.9, 0.88,
//         0.87, 0.89, 0.92, 0.91, 0.9, 0.88, 0.87, 0.89, 0.92, 0.91, 0.9, 0.88, 0.87, 0.89,
//         0.92, 0.91, 0.9, 0.88, 0.87, 0.89, 0.92, 0.91, 0.9, 0.88, 0.87, 0.89, 0.92, 0.91
//     ];

//     var option = {
//         backgroundColor: 'rgba(0,0,0,0)',
//         tooltip: {
//             trigger: 'axis',
//             axisPointer: {
//                 lineStyle: {
//                     color: '#57617B'
//                 }
//             },
//             formatter: "{b}  <br/>拥堵程度: {c}"
//         },
//         // legend: {
//         //     data: ['拥堵程度'],
//         //     top: '0%',
//         //     textStyle: {
//         //         color: 'rgba(255,255,255,0.9)' // 图例文字颜色
//         //     }
//         // },
//         xAxis: {
//             type: 'value',
//             name: '拥堵程度',
//             min: 0,
//             max: 1,
//             interval: 0.1,
//             axisLabel: {
//                 show: true,
//                 textStyle: {
//                     color: 'rgba(255,255,255,1)', // X轴标签颜色
//                     fontSize: '12' // 字体大小
//                 }
//             },
//             axisLine: {
//                 lineStyle: {
//                     color: 'rgba(255,255,67,.8)'
//                 }
//             }
//         },
//         yAxis: {
//             type: 'category',
//             data: roadNames,
//             axisLabel: {
//                 textStyle: {
//                     color: 'rgba(255,255,255,1)', // Y轴标签颜色
//                     fontSize: '12' // 字体大小
//                 }
//             },
//             axisLine: {
//                 lineStyle: {
//                     color: 'rgba(255,255,255,1)'
//                 }
//             }
//         },
//         grid: {
//             top: '0%',
//             right: '5%',
//             bottom: '10%',
//             left: '38%'
//         },
//         series: [
//             {
//                 name: '拥堵程度',
//                 type: 'bar',
//                 data: congestionLevels,
//                 barWidth: '60%',
//                 itemStyle: {
//                     normal: {
//                         color: '#cdba00'
//                     }
//                 }
//             }
//         ]
//     };

//     // 使用刚指定的配置项和数据显示图表。
//     myChart.setOption(option);
//     window.addEventListener("resize", function () {
//         myChart.resize();
//     });
// }


let h = 0;
let d = 0;
let myChart;
let dataCache = null
function fetchData() {
    if (d==59&&h==24) {
            return;}
    else if(h==24){
            h=0;
            d+=1;
    }
   axios.get('http://127.0.0.1:5000/get_data',{params: {
                hour: h,
                day: d
            }})
   .then(res=>{
    dataCache=res.data;
    h+=1;
   })
    .catch(err => {
        console.error("数据请求失败：", err);
    });
}
// 定义图表初始化和数据更新函数
function echarts_1() {
    if (!myChart) {
        myChart = echarts.init(document.getElementById('echarts_1'));
        window.addEventListener("resize", function() {
            myChart.resize();
        });
    }

    if (!dataCache) return;  // 如果数据未加载完成，则不继续

    const echartData = [
        { value: dataCache[1]["0.8-1"], name: '0.8~1' },
        { value: dataCache[1]["0.5-0.8"], name: '0.5~0.8' },
        { value: dataCache[1]["0-0.5"], name: '0~0.5' }
    ];
    // 配置图表选项
        const option = {
            backgroundColor: 'rgba(0,0,0,0)',
            tooltip: { trigger: 'item', formatter: "{b}: <br/>{c} ({d}%)" },
            color: ['#af89d6', '#4ac7f5', '#0089ff'],
            legend: {
                x: '70%', y: 'center', orient: 'vertical', itemGap: 12, itemWidth: 10, itemHeight: 10,
                icon: 'rect', data: ['0.8~1', '0.5~0.8', '0~0.5'],
                textStyle: { fontStyle: 'normal', fontFamily: '微软雅黑', fontSize: 15, color: '#fff' }
            },
            series: [{
                name: '不同拥堵比例',
                type: 'pie', clockwise: false, minAngle: 20, center: ['40%', '50%'],
                radius: [90, 120], avoidLabelOverlap: true,
                itemStyle: { normal: { borderColor: '#1e2239', borderWidth: 2 } },
                label: { normal: { show: true, position: 'inside', formatter: "{d}%", textStyle: { color: '#fff' } } },
                data: echartData
            }, {
                name: '', type: 'pie', clockwise: false, silent: true, minAngle: 20, center: ['40%', '50%'],
                radius: [0, 80], itemStyle: { normal: { borderColor: '#1e2239', borderWidth: 1.5, opacity: 0.21 } },
                label: { normal: { show: false } }, data: echartData
            }]
        };

        myChart.setOption(option);
    }

let chart4;
function echarts_4() {
    if (!chart4) {
        chart4 = echarts.init(document.getElementById('echart4'));
        window.addEventListener("resize", function () {
            chart4.resize();
        });
    }

    if (!dataCache) return;  // 如果数据未加载完成，则不继续

        // 更新图表的配置项
        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { lineStyle: { color: '#57617B' } }
            },
            legend: {
                data: [{ name: "traffic_volume" }, { name: "congestion_level" }],
                top: "0%",
                textStyle: { color: "rgba(255,255,255,0.9)" }
            },
            xAxis: [{
                type: "category",
                data: ['Chunxi Road-Taikoo Li', 'Chunxi Road-Kuanzhai Alley', 'Chunxi Road-Eastern Suburb Memory', 'Taikoo Li-Tianfu Square', 'Du Fu Thatched Cottage-Jinli', 'Jinli-Tianfu Square'], // 使用从后端获取的 x 轴数据
                axisLine: { lineStyle: { color: "rgba(255,255,255,1)" }},
                axisLabel: { textStyle: { color: "rgba(255,255,255,1)", fontSize: '6' }}
            }],
            yAxis: [
                {
                    type: "value",
                    name: "traffic_volume",
                    min: 0,
                    max: 6627,
                    interval: 1000,
                    axisLabel: { show: true },
                    axisLine: { lineStyle: { color: 'rgba(255,255,67,.8)' }}
                },
                {
                    type: "value",
                    name: "congestion_level",
                    min: 0,
                    max: 1,
                    interval: 0.1,
                    axisLabel: { show: true },
                    axisLine: { lineStyle: { color: 'rgba(255,255,67,.8)' }},
                    splitLine: { show: true, lineStyle: { color: "#ffffff" }}
                }
            ],
            grid: { top: "10%", right: "30", bottom: "30", left: "38" },
            series: [
                {
                    name: "traffic_volume",
                    type: "bar",
                    data: dataCache[0]["metro_t"], // 从后端获取的 traffic_volume 数据
                    barWidth: "auto",
                    itemStyle: {
                        normal: {
                            color: {
                                type: "linear",
                                x: 0, y: 0,
                                colorStops: [
                                    { offset: 0, color: "#609db8" },
                                    { offset: 1, color: "#609db8" }
                                ],
                                globalCoord: false
                            }
                        }
                    }
                },
                {
                    name: "congestion_level",
                    type: "line",
                    yAxisIndex: 1,
                    data: dataCache[0]["metro_c"], // 从后端获取的 congestion_level 数据
                    lineStyle: { normal: { width: 2 }},
                    itemStyle: { normal: { color: "#cdba00" }},
                    smooth: true
                }
            ]
        };

        // 应用配置项到图表
        chart4.setOption(option);
    
}

// 定义图表初始化和数据更新函数
let chart2;
function echart_2() {
    if (!chart2) {
        chart2 = echarts.init(document.getElementById('chart_2'));
        window.addEventListener("resize", function () {
            chart2.resize();
        });
    }

    if (!dataCache) return;  // 如果数据未加载完成，则不继续

        // 更新图表的配置项
        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' }
            },
            legend: {
                data: ['traffic_volume', 'population_density', 'public_transit_usage', 'num_poi'],
                textStyle: { color: '#fff', fontSize: 16 }
            },
            grid: [
                { top: '36%', height: '40%', left: '0%', right: '5%', containLabel: true },
                { bottom: '50%', height: '35%', left: '5%', right: '5%', containLabel: true }
            ],
            xAxis: [
                { type: 'value', name: 'traffic_volume & population_density', position: 'bottom', nameGap: 20,
                  nameTextStyle: { fontSize: 16, color: '#fff' }, axisLabel: { color: '#fff', fontSize: 14 }, splitLine: { show: false }},
                { type: 'value', name: 'public_transit_usage & num_poi', position: 'top', nameGap: 20,
                  nameTextStyle: { fontSize: 16, color: '#fff' }, axisLabel: { color: '#fff', fontSize: 14 }, splitLine: { show: false }}
            ],
            yAxis: [
                { type: 'category', data: ['指标'], axisLabel: { interval: 0, rotate: 30, color: '#fff', fontSize: 14 }, splitLine: { show: false }}
            ],
            series: [
                { name: 'traffic_volume', type: 'bar', data: [dataCache[0]["avr"][0]], xAxisIndex: 1, yAxisIndex: 0, barWidth: '45%', label: { show: true, position: 'inside', color: '#fff', fontSize: 14 }},
                { name: 'population_density', type: 'bar', data: [dataCache[0]["avr"][1]], xAxisIndex: 1, yAxisIndex: 0, barWidth: '45%', label: { show: true, position: 'inside', color: '#fff', fontSize: 14 }},
                { name: 'public_transit_usage', type: 'bar', data: [dataCache[0]["avr"][2]], xAxisIndex: 0, yAxisIndex: 0, barWidth: '45%', label: { show: true, position: 'inside', color: '#fff', fontSize: 14 }},
                { name: 'num_poi', type: 'bar', data: [dataCache[0]["avr"][3]], xAxisIndex: 0, yAxisIndex: 0, barWidth: '45%', label: { show: true, position: 'inside', color: '#fff', fontSize: 14 }}
            ]
        };

        chart2.setOption(option);
}

let chart3;
function echart_3() {
    // 初始化 chart3
    if (!chart3) {
        chart3 = echarts.init(document.getElementById('chart_3'));
        window.addEventListener("resize", function () {
            chart3.resize();
        });
    }
    if (!dataCache) return;  // 如果数据未加载完成，则不继续

    // 配置图表选项
        const option = {
            backgroundColor: 'transparent',
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' }
            },
            grid: {
                left: '0%',
                top: "0%",
                bottom: "5%",
                right: "0%",
                containLabel: true
            },
            xAxis: {
                type: 'value',
                axisLabel: { textStyle: { color: '#fff', fontSize: 12 }},
                axisLine: { show: true, lineStyle: { color: '#2c3459' }},
                axisTick: { show: false }
            },
            yAxis: {
                type: 'category',
                data: dataCache[0]["top_t_e"].slice(0, 50), // 使用后端返回的道路名称
                axisTick: { show: false },
                axisLabel: { textStyle: { color: '#fff', fontSize: 12 }},
                axisLine: { show: true, lineStyle: { color: '#2c3459' }}
            },
            series: [{
                name: '车流量',
                type: 'bar',
                data: dataCache[0]["top_t_t"].slice(0, 50), // 使用后端返回的车流量数据
                barWidth: '60%',
                itemStyle: { color: '#609db8' }
            }]
        };

        // 应用配置项到图表
        chart3.setOption(option);
    
    
}

let chart;

function echarts_2() {
    // 初始化 chart2
    if (!chart) {
        chart = echarts.init(document.getElementById('echarts_2'));
        window.addEventListener("resize", function () {
            chart.resize();
        });
    }

    if (!dataCache) return;  // 如果数据未加载完成，则不继续

    // 配置图表选项
        const option = {
            backgroundColor: 'rgba(0,0,0,0)',
            tooltip: {
                trigger: 'axis',
                axisPointer: { lineStyle: { color: '#57617B' }},
                formatter: "{b}  <br/>拥堵程度: {c}"
            },
            xAxis: {
                type: 'value',
                name: '拥堵程度',
                min: 0,
                max: 1,
                interval: 0.1,
                axisLabel: { show: true, textStyle: { color: 'rgba(255,255,255,1)', fontSize: '12' }},
                axisLine: { lineStyle: { color: 'rgba(255,255,67,.8)' }}
            },
            yAxis: {
                type: 'category',
                data: dataCache[0]["top_c_e"].slice(0, 50), // 后端返回的道路名称
                axisLabel: { textStyle: { color: 'rgba(255,255,255,1)', fontSize: '12' }},
                axisLine: { lineStyle: { color: 'rgba(255,255,255,1)' }}
            },
            grid: { top: '0%', right: '5%', bottom: '10%', left: '38%' },
            series: [{
                name: '拥堵程度',
                type: 'bar',
                data: dataCache[0]["top_c_c"].slice(0, 50), // 后端返回的拥堵程度数据
                barWidth: '60%',
                itemStyle: { normal: { color: '#cdba00' }}
            }]
        };

        // 更新图表
        chart.setOption(option);
    
}

// 调用fetchData()一次，之后定时更新图表
fetchData();  // 初次加载数据
setInterval(fetchData, 5000);  // 每60秒更新数据






