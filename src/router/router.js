const express = require("express");
const router = express.Router();
const UserControllers = require("../controller/userController")
const studentController = require("../controller/studentController")
const authWare = require("../middleware/auth")

router.get("/test-me", function (req, res) {
    res.send("Working fine");
});

router.post("/user", UserControllers.createUser);
router.post("/login", UserControllers.login);

router.post("/student",authWare.authentication,studentController.createStudent);
router.get("/student/details",studentController.getMarks)
router.put("/student/update",authWare.authentication,authWare.authorisation,studentController.updateStudent)
router.put("/student/Delete",authWare.authentication,authWare.authorisation,studentController.DeleteStudentData)


router.all("/*", function (req, res) {
    res.status(400).send({status: false, message: "Make Sure Your Endpoint is Correct !!!"
    });
});

module.exports = router;