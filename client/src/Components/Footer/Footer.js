import React,{useState,useEffect} from 'react'
import './footer.css'
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import SearchIcon from '@mui/icons-material/Search';
import {useNavigate} from 'react-router-dom'
function Footer() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate()
  
  return (
    <BottomNavigation className="bottomnav" style={{backgroundColor:"#000000"}}
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <BottomNavigationAction label="Trending" style={{color:"orangered"}} icon={<WhatshotIcon onClick = {()=>navigate("/")}/>} />
      <BottomNavigationAction label="Movies" style={{color:"orangered"}}icon={<MovieFilterIcon onClick = {()=>navigate("/movies")}/> } />
      <BottomNavigationAction label="Search" style={{color:"orangered"}}icon={<SearchIcon onClick = {()=>navigate("/search")}/>} />
    </BottomNavigation>
)

 
}

export default Footer
 