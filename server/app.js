const express = require("express");
const app = express();
const { PythonShell } = require("python-shell");
const fs = require("fs");
const cors = require("cors");

const moviesData = require("../client/src/movies.json");
const moviePosters = require("../client/src/moviePosters.json");

app.use(cors());
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  return res.status(200).json({
    status: "success",
  });
});

app.post("/get_recommendations", async (req, res) => {
  // console.log(req.body, "API REQ BODYYY");

  const ratingDetails = {
    movieName: req.body.movieName,
    rating: req.body.rating,
  };

  console.log(ratingDetails, "rating details");

  const movieRating = `(${ratingDetails.movieName}, ${ratingDetails.rating})`;

  const rawdata = fs.readFileSync("movies.json");
  const moviesFromFile = JSON.parse(rawdata);
  if (!moviesFromFile.movies.includes(movieRating)) {
    moviesFromFile.movies.push(movieRating);
  }
  const dataToWrite = JSON.stringify(moviesFromFile, null, 2);
  fs.writeFile("movies.json", dataToWrite, "utf8", function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }
    console.log("JSON file has been saved.");
  });

  await PythonShell.run(
    "./ML_Model/collaborative_filtering.py",
    {},
    async function (err, result) {
      if (err) throw err;
      const jsonResponse = JSON.stringify(result);

      const resultToModify = JSON.parse(jsonResponse);
      const finalResultArray = [];
      resultToModify.forEach((movie) => {
        if (movie !== "title") {
          movie = movie.split("  ")[0].trim();
          if (movie) {
            finalResultArray.push(movie);
          }
        }
      });
      finalResultArray.pop();
      finalResultArray.reverse();

      return res.status(200).json({
        status: "success",
        result: finalResultArray,
      });
    }
  );
});

app.get("/merge_json", (req, res) => {
  const finalArray = [];
  moviesData.forEach((movie) => {
    moviePosters.forEach((poster) => {
      if (movie.movieId === poster.movieId) {
        finalArray.push({
          title: movie.title,
          poster: poster.poster,
        });
      }
    });
  });

  res.json(finalArray);

  const finalJsonData = {
    movies: finalArray,
  };

  const dataToWrite = JSON.stringify(finalJsonData, null, 2);

  fs.writeFileSync("movies-with-posters.json", dataToWrite);
});

module.exports = app;
