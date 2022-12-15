const { find } = require("../model/userModel");
const userModel = require("../model/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
// create user 
// login user

function checkname(str) {
    var re = /^[A-Za-z]*$/;
    return re.test(str);
}

function checkPassword(str) {
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
    return re.test(str);
}

async function createUser(req, res) {
    try {
        const data = req.body;
        let { password } = data
        // console.log(data);

        //--------------VALIDATIONS----------------

        if (Object.keys(data).length < 1) {
            return res.status(400).send({ status: false, msg: "Bad request" });
        }
        if (!data.fname) {
            return res.status(400).send({ status: false, msg: "Bad request" })
        }
        if (!checkname(data.fname.trim())) {
            return res.status(400).send({
                status: false,
                msg: "fname should not contain any numbers",
            });
        }

        if (!data.lname) { return res.status(400).send({ status: false, msg: "Bad request" }) }

        if (!data.password) { return res.status(400).send({ status: false, msg: "Bad request" }) }

        if (!checkPassword(data.password.trim())) {
            return res.status(400).send({
                status: false,
                msg: "password should contain at least 1 lowercase, uppercase ,numeric alphabetical character and at least one special character and also The string must be eight characters or longer",
            });
        }

        const userPresent = await userModel.find({ fname: data.fname })
        if (userPresent.length > 0) {
            return res.status(403).send({ status: false, msg: "user already present" })
        }
        // ------ BCRYPT----------
        let newPassword = await bcrypt.hash(password, 10)
        data.password = newPassword

        let saveData = await userModel.create(data)
        return res.status(201).send({ status: true, data: saveData })
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
}
// ------------------LOGIN ------------ 

async function login(req, res) {
    try {
        const data = req.body;
        if (Object.keys(data).length < 1) {
            return res
                .status(400)
                .send({ status: false, msg: "fname and password is required" });
        }

        if (!data.fname) {
            return res.status(400).send({ status: false, msg: "fname is required" });
        }
        if (!data.password) {
            return res
                .status(400)
                .send({ status: false, msg: "password is required" });
        }


        const logined = await userModel.findOne(data)
        if (!logined) {
            return res
                .status(401)
                .send({ status: true, msg: "wrong credentials" })
        }

        const token = jwt.sign(
            { userId: logined._id.toString() },
            "userlogIn"    // secret key 
        )
        return res.status(201).send({ status: true, data: token });
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
}

module.exports.createUser = createUser
module.exports.login = login