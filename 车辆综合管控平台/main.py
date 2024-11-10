from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
from pandas.tseries.holiday import holiday_calendars

app = Flask(__name__)
CORS(app)  # 允许所有来源的跨域请求
@app.route('/get_data', methods=['GET'])
def get_data():
    data_f = pd.read_csv("df.csv")
    data = data_f.copy()
    hour=int(request.args.get('hour'))
    day=int(request.args.get('day'))
    data=data.loc[(data['day']==day)&(data['hour']==hour)]
    weather = {}
    y = []
    j = -1
    for i in data['weather']:
        if i not in weather:
            weather[i] = j + 1
            j = j + 1
    w=data['weather'].iloc[0]

    metro = data.loc[data['is_metro'] == True, ['edge', 'traffic_volume', 'congestion_level']]
    metro_e = list(metro['edge'])
    metro_t = list(metro['traffic_volume'])
    metro_c = list(metro['congestion_level'])

    min_c = len(data.loc[data['congestion_level'] < 0.5])
    mid_c = len(data.loc[(data['congestion_level'] < 0.8) & (data['congestion_level'] >= 0.5)])
    max_c = len(data.loc[(data['congestion_level'] >= 0.8)])
    con = {'0-0.5': min_c, '0.5-0.8': mid_c, '0.8-1': max_c}

    top_t = data[['edge', 'traffic_volume']].sort_values(by='traffic_volume', ascending=False)
    top_t_e = list(top_t['edge'])
    top_t_t = list(top_t['traffic_volume'])

    top_c = data[['edge', 'congestion_level']].sort_values(by='congestion_level', ascending=False)
    top_c_e = list(top_c['edge'])
    top_c_c = list(top_c['congestion_level'])

    avr=list(data[['traffic_volume','population_density','public_transit_usage','num_poi']].mean())

    data_t = data[['edge', 'traffic_volume', 'congestion_level']]
    x = []
    name = ['edge', 'traffic_volume', 'congestion_level']
    for i in range(len(data_t)):
        # x += [{name[0] + '_' + str(i): data_t[name[0]].iloc[i], name[1] + '_' + str(i): data_t[name[1]].iloc[i],name[2] + '_' + str(i): data_t[name[2]].iloc[i]}]
        x += [{"road_name": data_t[name[0]].iloc[i], "traffic_volume": data_t[name[1]].iloc[i],"congestion_level": data_t[name[2]].iloc[i]}]

    holiday=str(data['is_holiday'].iloc[0])
    weekend=str(data['is_weekend'].iloc[0])

    d = {'weather': w, 'metro_e': metro_e, 'metro_t': metro_t, 'metro_c': metro_c, 'top_t_e': top_t_e,'top_t_t': top_t_t, 'top_c_e': top_c_e, 'top_c_c': top_c_c, 'avr': avr,'holiday':holiday,'weekend':weekend}

    return jsonify(d,con,x)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
