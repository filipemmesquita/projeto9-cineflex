import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function SelectSeat(){
    const params = useParams();
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [sessionInfo, setSessionInfo]=useState(null);
    useEffect(() => {
        const requisition=axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${params.idSessao}/seats`)
        requisition.then(response=>{

            setSessionInfo(response.data)
        });
    }, []);

    function addSeat(id){
        const newSelectedSeats=[...selectedSeats, id];
        setSelectedSeats(newSelectedSeats);
    };
    function removeSeat(id){
        const newSelectedSeats=[...selectedSeats];
        setSelectedSeats( newSelectedSeats.filter(currentSeat => currentSeat!==id));
    };

    if(sessionInfo===null){
        return (<h1>carregando</h1>);
    };
    return(
        <>
            <h1>Selecione o(s) assento(s)</h1>
            <SeatSelectionWrapper>
                {sessionInfo.seats.map(seat=><Seat isAvailable={seat.isAvailable} id={seat.id} name={seat.name} addSeat={addSeat} removeSeat={removeSeat} />)}
            </SeatSelectionWrapper>
        </>
    );

}
function Seat(props){
    const [isSelected, setIsSelected]=useState(false);
    function notAvailable(){
        alert("Este assento não está disponível")
    }
    function seatSelection(){
        if(isSelected){
            setIsSelected(false)
            props.removeSeat(props.id);
        };
        if(!isSelected){
            setIsSelected(true)
            props.addSeat(props.id);

        };
    }
    return(
        <SeatButton
            isAvailable={props.isAvailable}
            isSelected={isSelected} 
            id={props.id}
            onClick={props.isAvailable ? seatSelection : notAvailable }
        >
            {props.name}
        </SeatButton>
    );
}

const SeatSelectionWrapper = styled.div`
margin: 0 auto;
display: flex;
flex-wrap: wrap;
width:320px;
justify-content: center;
`;
const SeatButton = styled.button`
box-sizing: border-box;
margin:0 3px 26px;
width:26px;
height: 26px;
background: ${props => props.isAvailable ? props.isSelected ? "#8DD7CF" : "#C3CFD9"  : "#FBE192"} ;
border: 1px solid ${props => props.isAvailable ? props.isSelected ? "#45BDB0" : "#808F9D" : "#F7C52B"} ;
border-radius: 12px;
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 11px;
display: flex;
justify-content: center;
align-items: center;
`;