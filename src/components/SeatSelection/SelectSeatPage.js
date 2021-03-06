import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import SelectSeat from './SelectSeat';
import SelectSeatForm from './SelectSeatForm';
import Footer from '../Footer';


export default function SelectSeatPage(props){
    const params = useParams();
    const [sessionInfo, setSessionInfo]=useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [selectedSeatsNames, setSelectedSeatsNames]=useState([]);
    const [selectedSeatsBuyer, setSelectedSeatsBuyer]=useState([]);
    const [selectedSeatsBuyerCPF, setSelectedSeatsBuyerCPF]=useState([]);

    useEffect(() => {
        const requisition=axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${params.idSessao}/seats`)
        requisition.then(response=>{

            setSessionInfo(response.data)
        });
    }, []);
    function addSeat(id,name){
        const newSelectedSeats=[...selectedSeats, id];
        setSelectedSeats(newSelectedSeats);
        const newSelectedSeatsNames=[...selectedSeatsNames, name];
        setSelectedSeatsNames(newSelectedSeatsNames);
    };
    function removeSeat(id,name){
        const newSelectedSeats=[...selectedSeats];
        setSelectedSeats( newSelectedSeats.filter(currentSeat => currentSeat!==id));
        const newSelectedSeatsNames=[...selectedSeatsNames];
        setSelectedSeatsNames( newSelectedSeatsNames.filter(currentSeat => currentSeat!==name));
    };


    if(sessionInfo===null){
        return (<h1>carregando</h1>);
    };
    return(
        <>
            <h1>Selecione o(s) assento(s)</h1>
            <SelectSeat 
                seats={sessionInfo.seats} 
                addSeat={addSeat} 
                removeSeat={removeSeat} 
                selectedSeats={selectedSeats}
                seatBuyers={selectedSeatsBuyer}
                seatCpfs={selectedSeatsBuyerCPF}
                setSeatBuyers={setSelectedSeatsBuyer}
                setSeatCpfs={setSelectedSeatsBuyerCPF}
            />
            <LegendWrapper>
                <div>
                    <Legend background="#8DD7CF" border="#1AAE9E"></Legend>
                    <h2>Selecionado</h2>
                </div>
                <div>
                    <Legend background="#C3CFD9" border="#7B8B99"></Legend>
                    <h2>Dispon??vel</h2>
                </div>
                <div>                    
                    <Legend background="#FBE192" border="#F7C52B"></Legend>
                    <h2>Indispon??vel</h2>
                </div>
            </LegendWrapper>
            <SelectSeatForm 
                idSessao={params.idSessao} 
                selectedSeats={selectedSeats}
                selectedSeatsNames={selectedSeatsNames} 
                movie={sessionInfo.movie.title} 
                date={sessionInfo.day.date} 
                time={sessionInfo.name}
                buyerNames={selectedSeatsBuyer} 
                buyerCpfs={selectedSeatsBuyerCPF} 
                setNames={setSelectedSeatsBuyer} 
                setCpfs={setSelectedSeatsBuyerCPF} 
            />
            <Footer>
                <div>
                    <img src={sessionInfo.movie.posterURL}/>
                </div>
                <div>
                <p>{sessionInfo.movie.title}</p>
                <p>{sessionInfo.day.weekday} - {sessionInfo.name}</p>
                </div>        
            </Footer>
        </>
    );

}
const LegendWrapper = styled.div`
width:320px;
display: flex;
justify-content: space-around;
margin:0 auto;
div{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h2{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 13px;
    }
}
`;
const Legend=styled.div`
margin-bottom: 10px;
box-sizing: border-box;
width:26px;
height: 26px;
border-radius: 12px;
border: 1px solid ${props=>props.border};
background-color: ${props=>props.background};
`
