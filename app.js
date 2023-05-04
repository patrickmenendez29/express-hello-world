"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const uri = "mongodb+srv://Cluster06656:Password@cluster06656.ohufi3a.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new mongodb_1.MongoClient(uri, {
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
// Connect to the MongoDB cluster
try {
    // Connect the client to the server	(optional starting in v4.7)
    client.connect().then(() => {
        console.log("Connected successfully to server");
        client.db("admin").command({ ping: 1 }).then(() => {
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
        }).catch((err) => {
            console.log("Something went wrong. Unable to ping your deployment");
            console.log(err);
        });
    });
    // Send a ping to confirm a successful connection
}
catch (e) {
    console.error(e);
}
// For backend and express
const express = require('express');
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.get("/", (req, resp) => {
    resp.send("App is Working");
});
app.post("/create", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield client.db("Events").collection("Events").insertOne(req.body);
        resp.send(result);
    }
    catch (e) {
        resp.send("Something Went Wrong");
    }
}));
app.get("/getEvent", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    // get event by id in query param
    try {
        console.log(req.query.id);
        // cast query param to number
        const id = parseInt(req.query.id);
        const coll = client.db('Events').collection('Events');
        const cursor = coll.find({ id: id });
        const result = yield cursor.toArray();
        console.log(result);
        resp.send(result);
    }
    catch (e) {
        resp.send("Something Went Wrong");
    }
}));
// get all events
app.get("/getEvents", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const coll = client.db('Events').collection('Events');
        const cursor = coll.find();
        const result = yield cursor.toArray();
        console.log(result);
        resp.send(result);
    }
    catch (e) {
        resp.send("Something Went Wrong");
    }
}));
// update event by id
app.put("/updateEvent", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.query.id);
        const coll = client.db('Events').collection('Events');
        const result = yield coll.updateOne({ id: id }, { $set: req.body });
        resp.send(result);
    }
    catch (e) {
        resp.send("Something Went Wrong");
    }
}));
// delete event by id
app.delete("/deleteEvent", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.query.id);
        const coll = client.db('Events').collection('Events');
        const result = yield coll.deleteOne({ id: id });
        resp.send(result);
    }
    catch (e) {
        resp.send("Something Went Wrong");
    }
}));
// get events byname
app.get("/getEventsByName", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.query.name;
        const coll = client.db('Events').collection('Events');
        const result = yield coll.find({ name: name }).toArray();
        resp.send(result);
    }
    catch (e) {
        resp.send("Something Went Wrong");
    }
}));
// try listening in port 5000, if not available, kill the process running in port 5000
app.listen(5001);
console.log("App listen at port 5001");
