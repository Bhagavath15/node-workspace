//custom middleware
import jwt from "jsonwebtoken"

export const auth = (request, response, next) => {
    try {
        const token = request.header("x-uth-token")
        console.log(token)
        jwt.verify(token, process.env.SECRET_KEY) //for verify the password
        next()
    }
    catch (err) {
        response.status(401).send({ message: err.message })
    }
}