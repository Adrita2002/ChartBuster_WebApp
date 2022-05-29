import React, { useState } from "react";
import "./search.css";
import { TextField } from "@mui/material";
import { ThemeProvider } from "@mui/private-theming";
import { createTheme } from "@mui/material/styles";
import { red, orange } from "@mui/material/colors";
import SearchIcon from "@mui/icons-material/Search";
import { Spin } from "antd";
import MovieWithRating from "./MovieWithRating";
import axios from "axios";

import "antd/dist/antd.css";
import { AutoComplete } from "antd";
import moviesData from "../../../movies.json";

const BASE_URL = "http://localhost:8000";

// const mockApiResponses = ["Avengers", "Adrita", "Endgame"];

const movieTitles = moviesData.map(function (movie) {
  return movie["title"];
});

const findMatching = (key, array) => {
  var results = [];
  for (var i = 0; i < array.length; i++) {
    if (array[i].indexOf(key) === 0) {
      results.push(array[i]);
    }
  }
  return results;
};

const SearchPage = () => {
  const [options, setOptions] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState();

  console.log(selectedMovie, "selected movie");

  const [apiLoading, setApiLoading] = useState(false);

  const [rating, setRating] = useState({
    movieName: "",
    rating: 0,
  });

  const callApiForRecommendation = async (apiBody) => {
    const resp = await axios.post(`${BASE_URL}/get_recommendations`, {
      movieName: apiBody.movieName,
      rating: apiBody.rating,
    });
    console.log(resp, "resp");
    setRecommendedMovies(resp.data.result);
  };

  const [recommendedMovies, setRecommendedMovies] = useState([]); //mockApiResponses

  const onSelect = async (data) => {
    console.log("onSelect", data);
    setSelectedMovie(data);
  };

  const onChange = (data) => {
    const ress = findMatching(data, movieTitles);
    const newOptions = [];
    ress.forEach((element) => {
      newOptions.push({ value: element });
    });
    setOptions(newOptions);
  };

  return (
    <div className = "search-container">
      <div className="search-area">
      <AutoComplete 
        options={options}
        style={{
          width: "90%",
          margin:"20px 0"
        }}
        onSelect={onSelect}
        // value=
        // onSearch={onSearch}
        onChange={onChange}
        placeholder="Search for a movie and get recommendations!"
      />
      </div>
      <br />
      <br />

      {apiLoading ? (
        <div>
          <Spin /> &nbsp; Loading Recommendations...
        </div>
      ) : (
        <div></div>
      )}

      {selectedMovie ? (
        <div>
          <MovieWithRating
            name={selectedMovie}
            rating={rating}
            setRating={setRating}
            callApiForRecommendation={callApiForRecommendation}
            setSelectedMovie={setSelectedMovie}
            selectedMovie={selectedMovie}
            apiLoading={apiLoading}
            setApiLoading={setApiLoading}
          />
        </div>
      ) : (
        <div></div>
      )}
      <div className="recommended-movies">
        {recommendedMovies.length > 0
          ? recommendedMovies.map((movie, idx) => {
              return (
                <MovieWithRating
                  key={idx}
                  name={movie}
                  rating={rating}
                  setRating={setRating}
                  callApiForRecommendation={callApiForRecommendation}
                  setSelectedMovie={setSelectedMovie}
                  selectedMovie={selectedMovie}
                  apiLoading={apiLoading}
                  setApiLoading={setApiLoading}
                />
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default SearchPage;
