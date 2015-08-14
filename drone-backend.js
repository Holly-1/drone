var Cylon = require('cylon');
var bot;

// Initialise the robot
Cylon.robot()
    .connection("ardrone", {
        adaptor: 'ardrone',
        port: '192.168.1.1'
    })
    .device("drone", {
        driver: "ardrone",
        connection: "ardrone"
    })
    .device("nav", {
        driver: "ardrone-nav",
        connection: "ardrone"
    })
    .on("ready", fly);
    
// Fly the bot

function fly(robot) {
    bot = robot;
    bot.drone.disableEmergency();

    bot.drone.config('general:navdata_demo', 'TRUE');

    bot.nav.on("navdata", function(data) {
        console.log(data);
    });

    bot.nav.on("altitudeChange", function(data) {
        console.log("Altitude:", data);
        // Drone is higher than 1.5 meters up
        if (altitude > 1.5) {
            bot.drone.land();
        }
    });

    bot.nav.on("batteryChange", function(data) {
        console.log("Battery level:", data);
    });

    //tell drone it's on the ground
    bot.drone.ftrim();
    bot.drone.takeoff();

    after(2*1000, function() {
        bot.drone.left(0.15);
    })
    after(3*1000, function() {
        bot.drone.left(0);
        bot.drone.forward(0.15)
    })
    after(4*1000, function() {
        bot.drone.forward(0);
        bot.drone.right(0.15)
    })
    after(5*1000, function() {
        bot.drone.right(0);
        bot.drone.back(0.15)
    })



    after(6*1000, function() {
        bot.drone.back(0);
        bot.drone.land();
    });
    after(12*1000, function() {
        bot.drone.stop();
    });
}


Cylon.start();
