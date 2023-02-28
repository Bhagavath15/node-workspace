import express from "express";
import {
    getMovies,
    getMovieById,
    postMovies,
    deleteMoviesById,
    updateMovieById
} from "../service/movies.service.js"
const router = express.Router()

router.get("/", async function (request, response) {
    const movies = await getMovies()
    console.log(movies)

    response.send(movies)
})



router.get('/:id', async function (request, response) {
    const { id } = request.params
    // const movie = movies.find((mv) => mv.id === id)
    console.log(id)

    const movie = await getMovieById(id)
    console.log(movie)
    movie ? response.send(movie) : response.status(404).send({ message: "Movie is not found" })
})


//express-json()-middleware
router.post("/", async function (request, response) {
    const data = request.body
    console.log(data)
    //db.movies.insertMany()
    const result = await postMovies(data)
    console.log(result)
})



router.delete('/:id', async function (request, response) {
    const { id } = request.params
    // const movie = movies.find((mv) => mv.id === id)
    console.log(id)

    const result = await deleteMoviesById(id)
    console.log(result)
    result.deletedCount >= 1
        ? response.send({ message: "Movie deleted successfully" })
        : response.status(404).send({ message: "Movie is not found" })
})

router.put("/:id", async function (request, response) {
    const { id } = request.params
    const data = request.body
    console.log(data)
    // const movie = movies.find((mv) => mv.id === id)
    console.log(id)

    const result = await updateMovieById(id, data)
    console.log(result)
    response.send(result)
})

export default router


