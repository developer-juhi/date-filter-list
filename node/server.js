const express = require('express');
const http = require('http');
var cors = require('cors')
var bodyParser = require('body-parser')

var moment = require('moment'); // require

const app = express()
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
const server = http.createServer(app);
server.listen(8080, function () {
    console.log("server start in " + 8080)
});
app.get("/", function (req, res) {
    res.send("welcome juhi")
})
function getDatesInRange(startDate, endDate, dayOfWeek, skipNumber) {
    let start = moment(startDate);
    let end = moment(endDate);
    let day = dayOfWeek;
    console.log(day)
    console.log("day")
    var arr = [];
    let tmp = start.clone().day(day);

    while (tmp.isBefore(end)) {
        tmp.add(skipNumber, 'days');
        if (tmp <= end) {
            arr.push(tmp.format('YYYY-MM-DD'));
        }
    }
    return arr;
}

app.post("/calcularion", function (req, res) {
    const { startDate, endDate, option, dayOfWeek } = req.body;
    const startDateData = new Date(startDate);
    const endDateData = new Date(endDate);
    let sendResponse = []
    console.log(dayOfWeek)
    if (option == '0') {
        sendResponse = getDatesInRange(startDateData, endDateData, dayOfWeek, 7)
    }
    if (option == '1') {
        sendResponse = getDatesInRange(startDateData, endDateData, dayOfWeek, 14)
    }
    if (option == '2') {
        sendResponse = getDatesInRange(startDateData, endDateData, dayOfWeek, 21)
    }
    console.log("sendResponse")
    console.log(sendResponse)
    res.status(200).send(sendResponse)
})

console.log("hi");
