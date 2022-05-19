import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';


export default function SelectTime(props){
    const params = useParams();
    const [movieInfo, setMovieInfo]=useState(null);
    useEffect(() => {
        const requisition=axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${params.idFilme}/showtimes`)
        requisition.then(response=>{

            setMovieInfo(response.data)
        });
    }, []);
    if(movieInfo===null){
        return (<h1>carregando</h1>);
    }


    return(
    <>
        <h1>Selecione o horário</h1>
        <DayList>
        {movieInfo.days.map(day=><Day day={day} />)}
        </DayList>
    </>
    )

};
function Day(props){
    return(
        <>
            <h2>{props.day.weekday} - {props.day.date}</h2>
            <TimeList>
            {props.day.showtimes.map(time=><Showtime time={time} />)}
            </TimeList>
        </>
    );
};
function Showtime(props){
    return(
        <Link to={"/assentos/"+props.time.id}>
        <SessionLink>{props.time.name}</SessionLink>
        </Link>
    );
};

const DayList=styled.div`
box-sizing: border-box;
text-align: left;
width:100%;
padding:0 30px 0;
h2{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
}
`;
const TimeList=styled.div`
margin:22px 0;
display: flex;
flex-wrap: wrap;
justify-content: left;
a{
    text-decoration: none;
    margin-right:8px;
}
a:last-child{
    margin-right: 0px;
}
`;
const SessionLink=styled.div`
display: flex;
justify-content: center;
align-items: center;
background: #E8833A;
border-radius: 3px;
width: 83px;
height: 43px;
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 18px;
color:white;
`;