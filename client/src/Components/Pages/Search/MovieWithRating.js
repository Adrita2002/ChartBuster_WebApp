import React, { useState } from "react";
import { Rating } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import moviePosters from "../../../moviePosters.json";

import moviesWithPosters from "../../../movies-with-posters.json";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1616530940355-351fabd9524b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW92aWUlMjBwb3N0ZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const MovieWithRating = ({
  name,
  posterUrl,
  movieId,
  rating,
  setRating,
  onRatingChange,
  callApiForRecommendation,
  selectedMovie,
  setSelectedMovie,
  apiLoading,
  setApiLoading,
}) => {
  const onRatingValueChange = async (event, setRating) => {
    setRating({
      ...rating,
      movieName: name,
      rating: event.target.value,
    });
    const apiBody = {
      movieName: name,
      rating: event.target.value,
    };
    setTimeout(() => {
      setRating({
        ...rating,
        movieName: name,
        rating: 0,
      });
    }, 2000);
    setApiLoading(true);
    await callApiForRecommendation(apiBody);
    setApiLoading(false);
    // set rating to zero after 3 seconds
    setSelectedMovie("");

    console.log(selectedMovie, "selected movie");
  };

  return (
    <div className="movie">
      <img
        alt="poster-url"
        className="poster"
        src={
          (moviesWithPosters.movies.find((movie) => movie.title === name) &&
            moviesWithPosters.movies.find((movie) => movie.title === name)
              .poster) ||
          FALLBACK_IMAGE
        }
      />
      <div className="desc">
        <p className="title">
          {name}
          <ThemeProvider theme={darkTheme}>
            <Rating
              id={movieId}
              style={{}}
              name="simple-controlled"
              value={
                name === selectedMovie
                  ? rating.rating
                    ? rating.rating
                    : ""
                  : 0
              }
              color="primary"
              // setSelectedMovie={setSelectedMovie}
              onChange={(event) => onRatingValueChange(event, setRating)}
            />
          </ThemeProvider>
        </p>
      </div>
    </div>
  );
};

export default MovieWithRating;
