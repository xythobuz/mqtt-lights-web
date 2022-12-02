/*
 * The idea is to use retained messages.
 * This way we can keep the state of the lights.
 * Make sure all senders use retained messages!
 * (in here and shell scripts on PC)
 */

const clientId = ("00" + Math.floor(Math.random() * 1000)).substr(-3)

const options = {
    clean: true,
    connectTimeout: 4000,
    clientId: 'lights-web-' + clientId,
    username: mqttUsername,
    password: mqttPassword,
}
const callbacks = []
const client  = mqtt.connect(mqttUrl, options)

client.on('connect', function () {
    console.log('MQTT Connected')
})

client.on('message', function (topic, message) {
    console.log("Rx \"" + topic.toString() + "\": \"" + message.toString() + "\"")

    for (const cb of callbacks) {
        if (cb.topic == topic) {
            console.log("Routing to Callback")
            cb.callback(message)
        }
    }
})

function subscribeTopic(topic, callback) {
    console.log("Sub to \"" + topic.toString() + "\"")

    subOptions = {
        rh: true,
    }
    client.subscribe(topic)

    callbackObj = {
        topic: topic,
        callback: callback,
    }
    callbacks.push(callbackObj)
}

function subscribeSensor(topic, unit, selector, divisor = 1.0) {
    subscribeTopic(topic, function (msg) {
        const txt = document.querySelector(selector)
        txt.innerHTML = "<p>" + parseInt(msg / divisor) + " " + unit + "</p>"
    })
}

function subscribeSensorString(topic, selector) {
    subscribeTopic(topic, function (msg) {
        const txt = document.querySelector(selector)
        txt.innerHTML = "<p>" + msg + "</p>"
    })
}

function setTopic(topic, message) {
    console.log("Tx \"" + topic.toString() + "\": \"" + message.toString() + "\"")

    pubOptions = {
        retain: true,
    }
    client.publish(topic, message, pubOptions)
}
