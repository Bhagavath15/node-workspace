import express from "express";
import { client } from "../index.js";

const router = express.Router()

router.get("/", async function (request, response) {
    const users = await client
        .db("users")
        .collection("users")
        .find({})
        .toArray()
    console.log(users)
    response.send(users)
})

router.get('/:id', async function (request, response) {
    const { id } = request.params
    // const movie = movies.find((mv) => mv.id === id)
    console.log(id)

    const user = await client.db("users").collection("users").findOne({ id: id });
    console.log(user)
    movie ? response.send(user) : response.status(404).send({ message: "User is not found" })
})

router.post("/", async function (request, response) {
    const datas = request.body
    console.log(datas)
    //db.movies.insertMany()
    const result2 = await client.db("users").collection("users").insertMany(datas)
    console.log(result2)
})

router.delete('/:id', async function (request, response) {
    const { id } = request.params
    // const movie = movies.find((mv) => mv.id === id)
    console.log(id)

    const result = await client.db("users").collection("users").deleteOne({ id: id });
    console.log(result)
    result.deletedCount >= 1
        ? response.send({ message: "User deleted successfully" })
        : response.status(404).send({ message: "User is not found" })
})

router.put("/:id", async function (request, response) {
    const { id } = request.params
    const data = request.body
    console.log(data)
    // const movie = movies.find((mv) => mv.id === id)
    console.log(id)

    const result = await client.db("users").collection("users").updateOne({ id: id }, { $set: data });
    console.log(result)
    response.send(result)
})


export default usersRouter