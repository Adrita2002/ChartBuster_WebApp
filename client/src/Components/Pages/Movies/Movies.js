import React,{useState,useEffect} from 'react'
import axios from 'axios'
import SingleMovie from '../../SingleMovie/SingleMovie';
import { Chip } from '@mui/material';
import useGenre from '../../../Hooks/useGenre';
const Movies = () => {
  const [page,setPage] = useState(1);
  const [movies, setMovies]=useState([]);
  const [numPage, setNumPage] = useState();
  const [selectedGenres,setSelectedGenres] = useState([])
  const [genres,setGenres] = useState([])
  const genreforURL = useGenre(selectedGenres);
  console.log(selectedGenres);
  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    // setPage(1);
  };

  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    // setPage(1);
  };

useEffect(() => {
    (async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US` //Generate your API Key
      );
      console.log(res.data.genres)
     setGenres(res.data.genres);
    })();
    return ()=>{
        setGenres({});
    }
  }, []);
  
  useEffect(() => {
    (async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
      );
      // setPage(res.data.results);
       setMovies(res.data.results)
       setNumPage(res.data.total_pages)
    })();
  }, [page,genreforURL]);
  
  return (
    <>
    <h1 className='heading'>Movies</h1>
    {/* <Genre type="movie" selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} genres={genres} setGenres={setGenres}/> */}
    <div className='genres'>
          {selectedGenres.length > 0 ? (
        selectedGenres.map((selectedGenre) => {
          return  <Chip style={{backgroundColor:"orangered",color:'black',cursor:'pointer',padding:'6px 0',margin:"   1px"}} label={selectedGenre.name} clickable key={selectedGenre.id} onDelete={()=>handleRemove(selectedGenre)}/> 

        })
      ) : ""}
       {genres.length > 0 ? (
        genres.map((genre) => {
          return  <Chip style={{backgroundColor:"black",color:'orangered',cursor:'pointer',padding:'6px 0',margin:"   1px"}} label={genre.name} clickable key={genre.id} onClick={()=>handleAdd(genre)}/> 

        })
      ) : (
        <div style={{ color: "white" }}>Loading...</div>
      )}  
     
    </div>

    <div className="trendList">
       {movies.length > 0 ? (
        movies.map((movie) => {
          // return <div style={{ color: "white" }}>{movie.original_title}</div>;
          return <SingleMovie key = {movie.id} id = {movie.id} poster = {movie.poster_path} title={movie.title || movie.name} date={movie.first_air_date || movie.release_date} media_type = "movie" vote_average={movie.vote_average}/>

        })
      ) : (
        <div style={{ color: "white" }}>Loading...</div>
      )} 
    </div>
    </>
  )
}

export default Movies