// import express, cors and axios:
const express = require("express");
const cors = require("cors");
const axios = require("axios");

// Load environment variables from the dotenv
require("dotenv").config();

//Declare app as express invoked
const app = express();

// enable cors
app.use(cors());

// set the PORT
const PORT = process.env.PORT || 8090;

// create an endpoint for the home route and set a response
app.get("/", (request, response) => {
  response.status(200).json("This is the home route");
});

// create an app.get endpoint and set the Route to /photos
// set the callback function with request, response however:
// make sure the function is async
// use await on the axios.get(API)
// declare a variable named API and set the value to the API url
// declare a variable named res and set the value to:
// await axios.get(API)
// console.log(res.data)
// In the browser search localhost:8090/photos
// show the terminal in VScode we have a results array
// Run console for:
// console.log(res.data.results)
// console.log(res.data.results[0].urls)
// we want the regulars
// declare a variable named photos and set the value to:
// res.data.results.map((photo)=>{})
// inside the .map function return an object with properties:
// id: photo.id
// img_url: photo.urls.regular,
// original_image: photo.links.self,
// photographer: photo.user.name,
// finally set the response.json(photos)

app.get("/photos", async (request, response) => {
  const subject = request.query.subject;
  const API = `https://api.unsplash.com/search/photos/?client_id=${process.env.ACCESS_KEY}&query=${subject}`;

  const res = await axios.get(API);

  const photos = res.data.results.map((photo) => {
    return {
      id: photo.id,
      img_url: photo.urls.regular,
      original_image: photo.links.self,
      photographer: photo.user.name,
    };
  });
  response.status(200).json(photos);
});

// invoke app.listen to listen on the PORT and run a callback to console.log in the terminal
app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));
