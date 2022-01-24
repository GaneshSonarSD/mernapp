const mongoose = require("mongoose");

//** connection to database */
const conn_str =
  "mongodb+srv://root:root@cluster0.8i0tm.mongodb.net/tcet?retryWrites=true&w=majority";

mongoose
  .connect(conn_str, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected successfully..."))
  .catch((error) => console.log(error));

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  city: String,
});

const user = new mongoose.model("user", userSchema);

/** Express Mongoose Integration **/
const express = require("express");
const app = express();
const router = express.Router();

router.get("/:id", async (req, res) => {
  /** getting user email */
  console.log(req.params.id);
  let data = await user.find({ _id: req.params.id });
  console.log(data);

  // res.send(req.params);
  res.send(data);
});

router
  .route("/")
  .get(async (req, res) => {
    let data = await user.find(); // collection_name.find()
    console.log(data);
    res.send(data);
  })
  .post(async (req, res) => {
    req_data = req.body;
    // console.log(req_data);
    let obj = new user(req_data);
    let result = await obj.save();
    console.log(result);
    // res.send(req_data);
    res.send(result);
  })
  .put(async (req, res) => {
    req_data = req.body;
    console.log(req_data.id);
    let result = await user.updateOne(
      { _id: req_data.id },
      {
        $set: {
          name: req_data.name,
          age: req_data.age,
          city: req_data.city,
        },
      }
    );
    res.send(result);
    // res.send(req_data);
  })
  .delete(async (req, res) => {
    let result = await user.deleteOne({ _id: req.query.id });
    res.send(result);
  });

module.exports = router;
