const studentModel = require("../model/studentModel")
const userModel = require("../model/userModel")
const jwt = require("jsonwebtoken")

// function checkname(str) {
//     var re = /^[A-Za-z]*$/;
//     return re.test(str);
// }

// --------------- CREATE STUDENT ----------------------

async function createStudent(req, res) {
    try {
        const data = req.body

        if (Object.keys(data) < 1) {
            return res
                .status(400)
                .send({ status: false, msg: "Name,Subject,Marks,userId all are required" })
        }

        if (!data.Name || (!data.Subject) || (!data.Marks) || (!data.userId)) {
            return res
                .status(400)
                .send({ status: false, msg: "all input are necessary" })
        }

        let obj = {
            Name: data.Name,
            Subject: data.Subject,
            idDeleted: false
        }

        const student = await studentModel.findOne(obj)
        if (!student) {
            const savedata = await studentModel.create(data)
            return res.status(201).send({ status: true, msg: savedata })
        }
        else {
            data.Marks = student.Marks + data.Marks
            student.Marks = data.Marks
            // console.log(student.Marks);
            // console.log(student);
            await student.save()
            return res
                .status(200)
                .send({ status: true, msg: student })
        }
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

//------------------- GET STUDENT DETAILS---------
//  ANYONE CAN SEE THE MARKS CORRESPONDING TO SUBJECT 

async function getMarks(req, res) {
    try {
        const data = req.query

        if (Object.keys(data) < 1) {
            return res
                .status(400)
                .send({ status: false, msg: "query is required" })
        }

        data.idDeleted = false


        const Marks_subject = await studentModel.find(data)
        if (Marks_subject.length < 1) {
            return res
                .status(404)
                .send({ status: false, msg: "student not found" })
        }
        return res
            .status(200)
            .send({ status: true, msg: Marks_subject })
    }
    catch (err) {
        return res
            .status(500)
            .send({ status: false, msg: err.message })
    }

}

// ------UPDATE STUDENT ----- 
// ONLY VALID USER/TEACHER CAN UPDATE THE DOCUMENT
// user can only update marks corresponding to a subject for a particular student 
// if he want to update name or subject then delete existing one ans create a fresh student with require stuject

async function updateStudent(req, res) {

    try {
        const data = req.query
        // console.log(data);

        if (Object.keys(data) < 1) {
            return res
                .status(400)
                .send({ status: false, msg: "query is required" })
        }

        const obj = {
            Name: data.Name,
            Subject: data.Subject,
            idDeleted: false
        }
        // console.log(obj);
        const updatedData = await studentModel.findOneAndUpdate(
            obj,
            { $set: data },
            { new: true }
        )
        // console.log(updatedData);
        return res.status(200).send({ status: true, msg: updatedData })
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

// ------DELETE STUDENT --- 
//In common practice we dont delete any document , we introduce some flag.

async function DeleteStudentData(req, res) {
    try {
        let data = req.query
        if (Object.keys(data) < 1) {
            return res
                .status(406)
                .send({ status: false, msg: "query is required" })
        }
        // query must be name , subject or both
        let set = new Set()
        set.add("Name")
        set.add("Subject")
        for(let val of Object.keys(data)){
            if(!set.has(val)){
              return res.status(400).send({status: false, msg: "give valid query"})
            }
        }
        data.idDeleted = true
        const obj = {
            Name: data.Name,
            Subject: data.Subject,
        }
        // console.log(obj);
        const updatedData = await studentModel.findOneAndUpdate(
            obj,
            { $set: data },
            { new: true }
        )
        // console.log(updatedData);
        return res.status(200).send({ status: true, msg: updatedData })
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })

    }
}

module.exports.createStudent = createStudent
module.exports.getMarks = getMarks
module.exports.updateStudent = updateStudent
module.exports.DeleteStudentData = DeleteStudentData 