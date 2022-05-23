import styled from 'styled-components';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';


export default function MovieSelect(){
    const [movies, setMovies]=useState([]);
    useEffect(() => {
        const requisition=axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies")
        requisition.then(response=>{
            setMovies(response.data)
        });
    }, []);
    return(
    <>
        <h1>Selecione o filme</h1>
        <MovieList>
        {movies.map(movie=><Movie movie={movie} key={movie.id} />)}
        </MovieList>
    </>
    );
}
function Movie(props){
    return(
        <MovieWrapper>
            <Link to={"/sessoes/"+props.movie.id} >
                <img src={props.movie.posterURL} alt={props.movie.title} />
            </Link>
        </MovieWrapper>
    );
}


const MovieWrapper= styled.div`
padding: 8px;
background: #FFFFFF;
box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
border-radius: 3px;
margin:15px 6px;
box-sizing: border-box;
img{
    width: 129px;
    height: 193px;
}
`;
const MovieList=styled.div`
    flex-wrap: wrap;
    display: flex;
    margin:15px 6px;
    box-sizing: border-box;
    max-width: 100%;
    justify-content: center;
`;