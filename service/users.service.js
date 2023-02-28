import { client } from "../index.js";

export function updateUser(id, data) {
    return client.db("workspace").collection("users").updateOne({ id: id }, { $set: data });
}
export function deleteUser(id) {
    return client.db("workspace").collection("users").deleteOne({ id: id });
}
export function postUsers(datas) {
    return client.db("workspace").collection("users").insertMany(datas);
}
export function getUsersById(id) {
    return client.db("workspace").collection("users").findOne({ id: id });
}
export function getUsers() {
    return client
        .db("workspace")
        .collection("users")
        .find({})
        .toArray();
}
