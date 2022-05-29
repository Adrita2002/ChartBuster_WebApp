import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleMovie from "../../SingleMovie/SingleMovie";
import './trending.css'
const Trending = () => {
  const [movies, setMovies] = useState([]);

  // console.log(movies, "moviessss");

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}`//Generate your API KEY
      );
      setMovies(res.data.results);
      // console.log(res.data, "dataaaa");
    })();
  }, []);

  return (
    <>
    <h1 className='heading'>Trending Today</h1>
    <div className="trendList">
       {movies.length > 0 ? (
        movies.map((movie) => {
          // return <div style={{ color: "white" }}>{movie.original_title}</div>;
          return <SingleMovie key = {movie.id} id = {movie.id} poster = {movie.poster_path} title={movie.title || movie.name} date={movie.first_air_date || movie.release_date} media_type = {movie.media_type} vote_average={movie.vote_average}/>

        })
      ) : (
        <div style={{ color: "white" }}>Loading...</div>
      )} 
    </div>
    </>
  );
};

export default Trending;
