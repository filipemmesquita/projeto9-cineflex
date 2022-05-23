import styled from 'styled-components';
import { useState } from 'react';


export default function SelectSeat(props){
    return(
            <SeatSelectionWrapper>
                {props.seats.map(seat=><Seat 
                    key={seat.id} 
                    isAvailable={seat.isAvailable} 
                    id={seat.id} 
                    name={seat.name} 
                    addSeat={props.addSeat} 
                    removeSeat={props.removeSeat} 
                    selectedSeats={props.selectedSeats}
                    seatBuyers={props.seatBuyers}
                    seatCpfs={props.seatCpfs}
                    setSeatBuyers={props.setSeatBuyers}
                    setSeatCpfs={props.setSeatCpfs}
                />)}
            </SeatSelectionWrapper>
    );

}
function Seat(props){
    const [isSelected, setIsSelected]=useState(false);
    function notAvailable(){
        alert("Este assento não está disponível")
    }
    function removeNamesByIndex(index){
        let newNames=[...props.seatBuyers];
        newNames.splice(index,1);
        props.setSeatBuyers(newNames);

    }
    function removeCpfsByIndex(index){
        let newCpfs=[...props.seatCpfs];
        newCpfs.splice(index,1);
        props.setSeatCpfs(newCpfs);

    }
    function seatSelection(){
        if(isSelected){
            const index=props.selectedSeats.findIndex(seat=> seat===props.id)
            console.log(props.selectedSeats)
            console.log(props.id)
            console.log(index);
            if(index!=-1){
                if(window.confirm("Este assento tem valores preenchidos! tem certeza que quer removê-lo?")===true){
                    removeNamesByIndex(index);
                    removeCpfsByIndex(index);
                    props.removeSeat(props.id, props.name);
                    setIsSelected(false)
                    console.log("removido1")
                }
                else{
                    console.log("não removido")
                }               
            }else if(index==-1){
            props.removeSeat(props.id, props.name);
            setIsSelected(false)
            console.log("removido2")
            }
        };
        if(!isSelected){
            setIsSelected(true)
            props.addSeat(props.id, props.name);
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
