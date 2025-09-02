from flask import Flask, json
from flask_cors import CORS, cross_origin
import requests
import os

api = Flask(__name__)
cors = CORS(api)
api.config['CORS_HEADERS'] = 'Content-Type'
FRONIUS_IP = os.getenv("FRONIUS_IP", "0.0.0.0")

@api.route('/solar', methods=['GET'])
@cross_origin()
def get_solar():
  website = requests.get(url=f"http://{FRONIUS_IP}/solar_api/v1/GetPowerFlowRealtimeData.fcgi")
  return website.json()



if __name__ == '__main__':
    api.run(host='0.0.0.0', port=5000)
