# solarMonitor

![image](https://user-images.githubusercontent.com/46090335/230337000-324da70d-c7ad-410e-9cfc-6798fed71840.png)

Solar Monitor has been created because i wanted to build by OWN UI for the "Fronius Wechselrichter"


This repo holds two main components that are neccessary

1. the web folder in which a simple script builds up the website
2. a basic flask Api which bypasses the CORS Policy and functions like a proxy

## Web

The animation is created by [justanotherguy](https://lottiefiles.com/justanotherguy)

With `fetch("http://yourflaskserverip:5000/solar")` the solar information is requested via the flask server proxy

## Flask Server

The flask proxy simply requests the fronius power inverter data by using the built in api:
```
def get_solar():
  website = requests.get(url='http://yourfroniusip/solar_api/v1/GetPowerFlowRealtimeData.fcgi')
  return website.json()
```

## Reproduce with different power inverter

In most cases power inverters are connected to the Network.

So you can follow these steps to get the realtime data:

1. request the root of the power inverter in your browser (e.g. "https://192.168.178.5/")
2. open dev-tools -> Network
3. scan the files which are loaded in regular intervals
4. open the request and copy the link after `Request URL`

---

For more information about CORS in combination with flask, feel free to visit: https://flask-cors.readthedocs.io/en/latest/
