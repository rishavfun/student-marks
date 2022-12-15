const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const route = require("./router/router");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

app.use(bodyParser.json())


mongoose
    .connect(
        "mongodb+srv://rishav:cNUVlhgpdlf8pXMx@cluster0.zvf3loz.mongodb.net/school",
        { useNewUrlParser: true }
    )
    .then(() => console.log("MongoDB is Connected"))
    .catch((err) => console.log(err));

app.use("/", route);
app.listen(3000, function () {
    console.log("Express is connected in port:" + 3000);
});