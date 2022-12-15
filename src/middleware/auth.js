const studentModel = require("../model/studentModel")
const userModel = require("../model/userModel")
const jwt = require("jsonwebtoken")

// AUTHENTICATION 

async function authentication(req, res, next) {
    try {
        const getToken = req.headers["x-api-key"]
        if (!getToken) {
            return res
                .status(401)
                .send({ status: false, msg: "require token" })
        }

        jwt.verify(getToken, "userlogIn", (error, decoded) => {
            if (error) {
                return res.status(401).send({ status: false, msg: error.message })
            } else {
                req.decodedPayload = decoded;
                // console.log(req.decodedPayload);   // it is userid
                next();
            }
        })
    } catch (error) {
        // console.log(error.message);
        return res.status(500).send({ staus: false, msg: error.message })
    }

}


async function authorisation(req, res, next) {
    try {
        const user = req.decodedPayload.userId
        // console.log(user);
        const data = await studentModel.find({userId:user})
        // console.log(data);
        if (!data) {
            return res.status(403).send({ staus: false, msg: "user not authorised" })
        }
        next()
    }
    catch (err) { return res.status(500).send({ staus: false, msg: err.message }) }
}
module.exports.authentication = authentication
module.exports.authorisation = authorisation