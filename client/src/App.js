import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Movies from "./Components/Pages/Movies/Movies";
import Trending from "./Components/Pages/Trending/Trending";
import SearchPage from "./Components/Pages/Search/SearchPage";
import { Container } from "@mui/system";

function App() {
  
  return (
    <BrowserRouter>
    
      <Header />
      <div className="container">
      <Container>
      {/* <Trending /> */}
      <Routes>
        <Route path="/" element={<Trending/>} exact />
        <Route path="/movies" element={<Movies/>} />
        <Route path="/search" element={<SearchPage/>} />
      </Routes>
      
      </Container>
      </div>
      <Footer />

    
    </BrowserRouter>
  );
}

export default App;
