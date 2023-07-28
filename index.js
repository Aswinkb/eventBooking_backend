// import express
const express = require('express')

// import cors
const cors = require('cors')

const logic = require('./service/logic')
const adminlogic = require('./service/adminlogic')

// server creation
const server = express()

// json type data to js
server.use(express.json())

// front-end connection
server.use(cors({ origin: 'http://localhost:4200' }))

// setting port
server.listen(3000, () => {
    console.log("started");
})

// user register
server.post('/register', (req, res) => {
    logic.register(req.body.uname, req.body.email, req.body.mobno, req.body.upsw).then(result => {
        res.status(result.statusCode).json(result)
    })
})
// user login
server.post('/login', (req, res) => {
    logic.login(req.body.email, req.body.upsw).then(result => {
        res.status(result.statusCode).json(result)

    })
})
// get user
server.get('/getuser/:currentId', (req, res) => {
    logic.getuser(req.params.currentId).then(result => {
        res.status(result.statusCode).json(result)
    })
})
// update user
server.put('/updateUser/:uid', (req, res) => {
    logic.updateUser(req.params.uid, req.body).then(result => {
        res.status(result.statusCode).json(result)
    })
})



// admin
// admin login
server.post('/alogin', (req, res) => {
    adminlogic.alogin(req.body.aid, req.body.apsw).then(result => {
        res.status(result.statusCode).json(result)

    })
})
// admin add event
server.post('/addevent', (req, res) => {
    adminlogic.addevent(req.body.eid, req.body.cid, req.body.ename, req.body.desc, req.body.price, req.body.is_available, req.body.eimage, req.body.venue, req.body.organizer, req.body.date, req.body.time).then(result => {
        res.status(result.statusCode).json(result)
    })
})
// view events
server.get('/viewevents', (req, res) => {
    logic.getEvents().then(result => {
        res.status(result.statusCode).json(result)
    })
})
// view single event
server.get('/viewevent/:eid', (req, res) => {
    logic.viewEvent(req.params.eid).then(result => {
        res.status(result.statusCode).json(result)
    })
})
// book now
server.post('/booknow/:uid', (req, res) => {
logic.booknow(req.params.uid).then(result=>{
    res.status(result.statusCode).json(result)
})
})

