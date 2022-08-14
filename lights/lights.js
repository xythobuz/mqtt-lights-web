/*
 * The idea is to use retained messages.
 * This way we can keep the state of the lights.
 * Make sure all senders use retained messages!
 * (in here and shell scripts on PC)
 */

const options = {
    clean: true,
    connectTimeout: 4000,
    clientId: 'lights-web',
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

/*
function clearSubscriptions() {
    for (const cb of callbacks) {
        client.unsubscribe(cb.topic)
    }
    callbacks = []
}
*/

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

function setTopic(topic, message) {
    console.log("Tx \"" + topic.toString() + "\": \"" + message.toString() + "\"")

    pubOptions = {
        retain: true,
    }
    client.publish(topic, message, pubOptions)
}
