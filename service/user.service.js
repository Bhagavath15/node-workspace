import { client } from "../index.js";

export function createUser(data) {
    return client.db("user").collection("user").insertOne(data);
}
