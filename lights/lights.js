// --------------------------
// bathroom
// --------------------------

const btnsBath = document.querySelectorAll("#bathroomlightauto, #bathroomlightbig, #bathroomlightsmall, #bathroomlightoff")

// handle changes to bathroom lights
subscribeTopic("bathroom/force_light", function (msg) {
    // clear all buttons
    for (const btn of btnsBath) {
        btn.checked = false
    }

    // activate proper button
    if (msg == "none") {
        const btn = document.querySelector("#bathroomlightauto")
        btn.checked = true
    } else if (msg == "big") {
        const btn = document.querySelector("#bathroomlightbig")
        btn.checked = true
    } else if (msg == "small") {
        const btn = document.querySelector("#bathroomlightsmall")
        btn.checked = true
    } else if (msg == "off") {
        const btn = document.querySelector("#bathroomlightoff")
        btn.checked = true
    } else {
        console.log("unknown bathroom/force_light msg " + msg)
    }
})

// set new bathroom light state
for (const btn of btnsBath) {
    btn.addEventListener('change', function (e) {
        if (this.checked) {
            if (this == document.querySelector("#bathroomlightauto")) {
                setTopic("bathroom/force_light", "none")
            } else if (this == document.querySelector("#bathroomlightbig")) {
                setTopic("bathroom/force_light", "big")
            } else if (this == document.querySelector("#bathroomlightsmall")) {
                setTopic("bathroom/force_light", "small")
            } else if (this == document.querySelector("#bathroomlightoff")) {
                setTopic("bathroom/force_light", "off")
            } else {
                console.log("unknown bathroom/force_light btn value " + this.value)
            }
        }
    })
}

// handle bathroom sensors
subscribeSensor("bathroom/temperature", "°C", "#bathtemp")
subscribeSensor("bathroom/humidity", "%", "#bathhumid")
subscribeSensor("bathroom/pressure", "mbar", "#bathpress", 100.0)
subscribeSensor("bathroom/tvoc", "ppb", "#bathtvoc")
subscribeSensor("bathroom/eco2", "ppm", "#batheco2")

// --------------------------
// livingroom
// --------------------------

const btnsKitchen = document.querySelectorAll("#kitchenon, #kitchenoff")
const btnsWorkspace = document.querySelectorAll("#workspaceon, #workspaceoff, #workspacepc, #workspacebench")
const btnsTv = document.querySelectorAll("#tvon, #tvamp, #tvbox, #tvoff")

// handle changes to kitchen lights
subscribeTopic("livingroom/light_kitchen", function (msg) {
    // clear all buttons
    for (const btn of btnsKitchen) {
        btn.checked = false
    }

    // activate proper button
    if (msg == "on") {
        const btn = document.querySelector("#kitchenon")
        btn.checked = true
    } else if (msg == "off") {
        const btn = document.querySelector("#kitchenoff")
        btn.checked = true
    } else {
        console.log("unknown livingroom/light_kitchen msg " + msg)
    }
})

// set new kitchen light state
for (const btn of btnsKitchen) {
    btn.addEventListener('change', function (e) {
        if (this.checked) {
            if (this == document.querySelector("#kitchenon")) {
                setTopic("livingroom/light_kitchen", "on")
            } else if (this == document.querySelector("#kitchenoff")) {
                setTopic("livingroom/light_kitchen", "off")
            } else {
                console.log("unknown livingroom/light_kitchen btn value " + this.value)
            }
        }
    })
}

const state_light_pc = 0
const state_light_bench = 0

function setWorkspaceLightsButtons() {
    // clear all buttons
    for (const btn of btnsWorkspace) {
        btn.checked = false
    }

    // activate proper button
    if ((state_light_pc == 1) && (state_light_bench == 1)) {
        const btn = document.querySelector("#workspaceon")
        btn.checked = true
    } else if ((state_light_pc == 1) && (state_light_bench == 0)) {
        const btn = document.querySelector("#workspacepc")
        btn.checked = true
    } else if ((state_light_pc == 0) && (state_light_bench == 1)) {
        const btn = document.querySelector("#workspacebench")
        btn.checked = true
    } else {
        const btn = document.querySelector("#workspaceoff")
        btn.checked = true
    }
}

// handle changes to workspace lights
subscribeTopic("livingroom/light_pc", function (msg) {
    if (msg == "on") {
        state_light_pc = 1
    } else if (msg == "off") {
        state_light_pc = 0
    } else {
        console.log("unknown livingroom/light_pc msg " + msg)
    }

    setWorkspaceLightsButtons()
})
subscribeTopic("livingroom/light_bench", function (msg) {
    if (msg == "on") {
        state_light_bench = 1
    } else if (msg == "off") {
        state_light_bench = 0
    } else {
        console.log("unknown livingroom/light_bench msg " + msg)
    }

    setWorkspaceLightsButtons()
})

// set new workspace light state
for (const btn of btnsWorkspace) {
    btn.addEventListener('change', function (e) {
        if (this.checked) {
            if (this == document.querySelector("#workspaceon")) {
                state_light_pc = 1
                state_light_bench = 1
                setTopic("livingroom/light_pc", "on")
                setTopic("livingroom/light_bench", "on")
            } else if (this == document.querySelector("#workspaceoff")) {
                state_light_pc = 0
                state_light_bench = 0
                setTopic("livingroom/light_pc", "off")
                setTopic("livingroom/light_bench", "off")
            } else if (this == document.querySelector("#workspacepc")) {
                state_light_pc = 1
                state_light_bench = 0
                setTopic("livingroom/light_pc", "on")
                setTopic("livingroom/light_bench", "off")
            } else if (this == document.querySelector("#workspacebench")) {
                state_light_bench = 1
                state_light_pc = 0
                setTopic("livingroom/light_bench", "on")
                setTopic("livingroom/light_pc", "off")
            } else {
                console.log("unknown btn value " + this.value)
            }
        }
    })
}

const state_light_amp = 0
const state_light_box = 0

function setTvLightsButtons() {
    // clear all buttons
    for (const btn of btnsTv) {
        btn.checked = false
    }

    // activate proper button
    if ((state_light_amp == 1) && (state_light_box == 1)) {
        const btn = document.querySelector("#tvon")
        btn.checked = true
    } else if ((state_light_amp == 1) && (state_light_box == 0)) {
        const btn = document.querySelector("#tvamp")
        btn.checked = true
    } else if ((state_light_amp == 0) && (state_light_box == 1)) {
        const btn = document.querySelector("#tvbox")
        btn.checked = true
    } else {
        const btn = document.querySelector("#tvoff")
        btn.checked = true
    }
}

// handle changes to tv lights
subscribeTopic("livingroom/light_amp", function (msg) {
    if (msg == "on") {
        state_light_amp = 1
    } else if (msg == "off") {
        state_light_amp = 0
    } else {
        console.log("unknown livingroom/light_amp msg " + msg)
    }

    setWorkspaceLightsButtons()
})
subscribeTopic("livingroom/light_box", function (msg) {
    if (msg == "on") {
        state_light_box = 1
    } else if (msg == "off") {
        state_light_box = 0
    } else {
        console.log("unknown livingroom/light_box msg " + msg)
    }

    setWorkspaceLightsButtons()
})

// set new tv light state
for (const btn of btnsTv) {
    btn.addEventListener('change', function (e) {
        if (this.checked) {
            if (this == document.querySelector("#tvon")) {
                state_light_amp = 1
                state_light_box = 1
                setTopic("livingroom/light_amp", "on")
                setTopic("livingroom/light_box", "on")
            } else if (this == document.querySelector("#tvoff")) {
                state_light_amp = 0
                state_light_box = 0
                setTopic("livingroom/light_amp", "off")
                setTopic("livingroom/light_box", "off")
            } else if (this == document.querySelector("#tvamp")) {
                state_light_amp = 1
                state_light_box = 0
                setTopic("livingroom/light_amp", "on")
                setTopic("livingroom/light_box", "off")
            } else if (this == document.querySelector("#tvbox")) {
                state_light_box = 1
                state_light_amp = 0
                setTopic("livingroom/light_box", "on")
                setTopic("livingroom/light_amp", "off")
            } else {
                console.log("unknown btn value " + this.value)
            }
        }
    })
}

// handle livingroom sensors
subscribeSensor("livingroom/temperature", "°C", "#livingtemp")
subscribeSensor("livingroom/humidity", "%", "#livinghumid")
subscribeSensor("livingroom/pressure", "mbar", "#livingpress", 100.0)
subscribeSensor("livingroom/tvoc", "ppb", "#livingtvoc")
subscribeSensor("livingroom/eco2", "ppm", "#livingeco2")
