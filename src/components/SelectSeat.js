import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function SelectSeat(){
    const params = useParams();
    const [SessionInfo, setSessionInfo]=useState(null);
    useEffect(() => {
        const requisition=axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${params.idSessao}/seats`)
        requisition.then(response=>{

            setSessionInfo(response.data)
        });
    }, []);
    if(SessionInfo===null){
        return (<h1>carregando</h1>);
    }
    return(
        <>
            <h1>Selecione o(s) assento(s)</h1>
            <SeatSelection>
                {SessionInfo.seats.map(seat=><Seat isAvailable={seat.isAvailable} id={seat.id}>{seat.name}</Seat>)}
            </SeatSelection>
        </>
    );

}

const SeatSelection = styled.div`
margin: 0 auto;
display: flex;
flex-wrap: wrap;
width:320px;
justify-content: center;
`;
const Seat = styled.div`
box-sizing: border-box;
margin:0 3px 26px;
width:26px;
height: 26px;
background: ${props => props.isAvailable ? "#C3CFD9" : "#FBE192"} ;
border: 1px solid ${props => props.isAvailable ? "#808F9D" : "#F7C52B"} ;
border-radius: 12px;
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 11px;
display: flex;
justify-content: center;
align-items: center;
`;