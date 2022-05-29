import React from 'react'
import './SingleMovie.css'
import {img_300,unavailable} from '../config/config'
import Badge from '@mui/material/Badge'
const SingleMovie = ({
    id,
    poster,
    title,
    date,
    media_type,
    vote_average
}) => {
    
  return (
    <div className='movie'>
       
        <img className='poster' src={poster?`${img_300}/${poster}`:unavailable} alt={title}/>
        <Badge badgeContent={vote_average} color={{vote_average}>6?'primary':'secondary'}/>
        <div className='desc'>
        <p className='title'>{title} <br/>({date})</p>
        
        </div>
        
    </div>
  )
}

export default SingleMovie