const express = require('express')
const app = express()
const port = 80
const cors = require('cors')
const firebase = require('firebase/compat/app');

require('firebase/compat/database');

require("dotenv").config();

const firebaseConfig = {
    ßapiKey: process.env.FB_APIKEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DB_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

app.use(express.static('public'))
app.use(cors())
app.use(express.json());

app.get('/patient_data', function (req, res) {
    firebase.database().ref("approved_users").once("value", (snapshot) => {
        if (snapshot.val() !== null) {
            res.json(snapshot.val());
        } else {
            res.json({ message: "데이터를 찾지 못했습니다!" });
        }
    });
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/main.html')
    console.log(req.query);
    firebase.database().ref("approved_users/").push(req.query);
})

app.listen(port)