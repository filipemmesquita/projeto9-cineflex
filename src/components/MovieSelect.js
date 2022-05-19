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
    console.log(movies)
    return(
    <Container>
        <h1>Selecione o filme</h1>
        <div>
        {movies.map(movie=><Movie movie={movie} />)}
        </div>
    </Container>
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
const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
text-align: center;
padding-top:30px;
div{
    flex-wrap: wrap;
    display: flex;
    margin:15px 6px;
    box-sizing: border-box;
    max-width: 100%;
    justify-content: center;
}
`;

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