import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
// const express = require("express"); //"type":"commonjs"
import express from "express"; //"type":"module"
import { MongoClient } from "mongodb"

const app = express();

const PORT = process.env.PORT;

const MONGO_URL = process.env.MONGO_URL
// console.log(process.env.MONGO_URL)

const client = new MongoClient(MONGO_URL) //dial
await client.connect()
console.log("Mongo is connected")


app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});


app.get("/movies", async function (request, response) {
  const movies = await client
    .db("movies")
    .collection("movies")
    .find({})
    .toArray()
  console.log(movies)

  response.send(movies)
})



app.get('/movies/:id', async function (request, response) {
  const { id } = request.params
  // const movie = movies.find((mv) => mv.id === id)
  console.log(id)

  const movie = await client.db("movies").collection("movies").findOne({ id: id })
  console.log(movie)
  movie ? response.send(movie) : response.status(404).send({ message: "Movie is not found" })
})


//express-json()-middleware
app.post("/movies", express.json(), async function (request, response) {
  const data = request.body
  console.log(data)
  //db.movies.insertMany()
  const result = await client.db("movies").collection("movies").insertMany(data)
  console.log(result)

})

app.delete('/movies/:id', async function (request, response) {
  const { id } = request.params
  // const movie = movies.find((mv) => mv.id === id)
  console.log(id)

  const result = await client.db("movies").collection("movies").deleteOne({ id: id })
  console.log(result)
  result.deletedCount >= 1
    ? response.send({ message: "Movie deleted successfully" })
    : response.status(404).send({ message: "Movie is not found" })
})

app.put("/movies/:id", express.json(), async function (request, response) {
  const { id } = request.params
  const data = request.body
  console.log(data)
  // const movie = movies.find((mv) => mv.id === id)
  console.log(id)

  const result = await client.db("movies").collection("movies").updateOne({ id: id }, { $set: data })
  console.log(result)
  response.send(result)
})



app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));