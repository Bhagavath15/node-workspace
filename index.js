import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
// const express = require("express"); //"type":"commonjs"
import express from "express"; //"type":"module"
import { MongoClient } from "mongodb"
import moviesRouter from "./router/movies.router.js";
import usersRouter from "./router/users.router.js"
import userRouter from "./router/user.router.js"

const app = express();

const PORT = process.env.PORT;

const MONGO_URL = process.env.MONGO_URL
// const MONGO_URL = "mongodb://127.0.0.1"

// console.log(process.env.MONGO_URL)

export const client = new MongoClient(MONGO_URL) //dial
await client.connect()
console.log("Mongo is connected")

app.use(express.json())

app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});

app.use("/movies", moviesRouter)
app.use("/users", usersRouter)
app.use("/user", userRouter)


app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));


