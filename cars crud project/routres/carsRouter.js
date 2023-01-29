const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const fs = require("fs");
const carModel = require("../models/carModel");
const { request } = require("http");

//  Router get
router.get("/", async (request, response) => {
  try {
    // use find for see all the objects have
    const cars = await carModel.find();
    response.json({
      status: "success",
      results: cars.length,
      data: [{ cars }],
    });
  } catch (err) {
    response.status(500).send(err.message);
    console.log(err);
  }
});

//Router  post
router.post("/", async (request, response) => {
  try {
    // 1. Create BookModel from 'request.body' / 'Network' tab (in F12 mode) > Filter: 'Fetch/XHR' > 'Payload' tab
    // const book = new BookModel({isbn: "666", title: "The best book ever ever."});
    const newcar = new carModel(request.body);

    // 2. Validate the data (will be done later using JOI)

    // 3. Execute 'CarModel.save();' -> Will be granted a new '_id' from the DB
    await newcar.save();

    // 4. Send back success response. '201' status means CREATED, and we need to convert the 'book' object to a JSON object
    response.json({ status: "success", data: { newcar } });
  } catch (err) {
    response.status(500).send(err.message);
  }
});

//Router  update
router.put("/init", async (request, response) => {
  // 1. Clear the 'cars' collection from all entries
  carModel.collection.drop();
  // 2. Read the baseline .json data from 'cars.json'
  // Read the baseline 'cars' array from a JSON file

  fs.readFile("./dal/cars.json", (err, data) => {
    if (err) {
      console.error(err);
      response.json("Fail");
      return;
    }
    // Success file read
    // 3. Insert all of the .json data into the 'cars' collection
    const jsData = JSON.parse(data);

    jsData.cars.forEach((element) => {
      new carModel(element).save();
    });

    response.json("Success");
  });
});

//Router delete
router.delete("/:id", async (request, response) => {
  const id = new mongoose.Types.ObjectId(request.params.id);
  try {
    // take the specipical id  from carModel and delete him
    await carModel.findByIdAndDelete(id);
    response.json({ status: "deleted successfully ", data: { id } });
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id/buy", async (request, response) => {
  const id = new mongoose.Types.ObjectId(request.params.id);
  try {
    const car = await carModel.findById(id);
    // With each purchase, delete one vehicle from the inventory.
    if (car.Inventory > 0) {
      car.Inventory = car.Inventory - 1;
      // update the new Inventory after the purchase (רכישה)
      const updatedCar = await carModel.findByIdAndUpdate(id, car);
      response.json({ status: "buy successfully" });
    } else {
      response.status(409).json("This vehicle is out of stock");
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
