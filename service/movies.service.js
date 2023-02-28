import { client } from "../index.js";

export async function updateMovieById(id, data) {
    return await client.db("movies").collection("movies").updateOne({ id: id }, { $set: data });
}
export async function deleteMoviesById(id) {
    return await client.db("movies").collection("movies").deleteOne({ id: id });
}
export async function postMovies(data) {
    return await client.db("movies").collection("movies").insertMany(data);
}
export async function getMovieById(id) {
    return await client.db("movies").collection("movies").findOne({ id: id });
}
export async function getMovies() {
    return await client
        .db("movies")
        .collection("movies")
        .find({})
        .toArray();
}
