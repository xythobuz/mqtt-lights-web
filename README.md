# Lights Web

Simple Bootstrap webinterface to control room lights via MQTT.

## Quick started

To set up the MQTT broker credentials, run the following commands:

    echo "const mqttUsername = 'MQTT_USERNAME'" > lights/credentials.js
    echo "const mqttPassword = 'MQTT_PASSWORD'" >> lights/credentials.js
    echo "const mqttUrl = 'wss://MQTT_HOST:MQTT_PORT'" >> lights/credentials.js

Then run `localtest.py` and open `http://localhost:8080` to access local test instance.

## Sources

 * [Bootstrap 5.2](https://getbootstrap.com/docs/5.2/getting-started/introduction/)
 * [bootstrap-dark-5](https://github.com/vinorodrigues/bootstrap-dark-5/blob/main/docs/bootstrap-dark.md)
 * [MQTT.js](https://github.com/mqttjs/MQTT.js)
 * [MQTT.js Tutorial](https://www.emqx.com/en/blog/mqtt-js-tutorial)
 * [JS Radio Buttons](https://www.javascripttutorial.net/javascript-dom/javascript-radio-button/)
 * [Python webserver](https://stackoverflow.com/a/52531444)
 * [Re-use socket address](https://stackoverflow.com/a/16641793)
