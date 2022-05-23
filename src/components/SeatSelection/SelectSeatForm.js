import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

export default function SelectSeatForm(props){


    const navigate = useNavigate();

    function submitSeats(event){
        event.preventDefault();
        if(props.selectedSeats.length!==0)
        {
 
            const compradores=[]
            props.selectedSeats.map((seat,index)=>compradores.push({
                idAssento:seat, 
                nome:props.buyerNames[index],
                cpf:props.buyerCpfs[index]}))

            const submitObject={ids:props.selectedSeats, compradores:compradores}

            const requisition=axios.post(`https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many`, submitObject)
            requisition.then(response=>{
                    const successInfoObject = {
                        movie: props.movie,
                        date: props.date,
                        time: props.time,
                        seats:props.selectedSeatsNames,
                        names:props.buyerNames,
                        cpfs:props.buyerCpfs,
                        idSessao:props.idSessao
                        };
                    navigate('/sucesso',{state:successInfoObject});
                });
            requisition.catch(error=>{console.log(error.response.status);})
        }
        else{
            alert("Selecione assentos!")
        }
    }
    return(
        <FormWrapper>
        <form onSubmit={submitSeats}>
            {props.selectedSeats.map((seat, index) => <SubForm 
                index={index} 
                key={seat} 
                seat={seat} 
                seatName={props.selectedSeatsNames[index]} 
                buyerNames={props.buyerNames} 
                buyerCpfs={props.buyerCpfs} 
                setNames={props.setNames} 
                setCpfs={props.setCpfs} 
            />)}
            <button type="submit">Reservar Assento(s)</button>
        </form>
        </FormWrapper>
    );
}
function SubForm(props){
    function setNamesByIndex(value, index){
        let newNames=[...props.buyerNames];
        newNames[index]=value;
        props.setNames(newNames);

    }
    function setCpfsByIndex(value, index){
        let newCpfs=[...props.buyerCpfs];
        newCpfs[index]=value;
        props.setCpfs(newCpfs);

    }
    return(
        <>
            <h2>Assento {props.seatName}</h2>
            <label htmlFor={"name"+props.seat}>Nome do comprador:</label>
            <input type="text" id={"name"+props.seat} value={props.buyerNames[props.index]} placeholder="Digite seu nome..." onChange={e => setNamesByIndex(e.target.value, props.index)} required></input>
            <label htmlFor={"cpf"+props.seat}>CPF do comprador:</label>
            <input type="text" id={"cpf"+props.seat} value={props.buyerCpfs[props.index]} placeholder="Digite seu CPF..." onChange={e => setCpfsByIndex(e.target.value, props.index)} required></input>
        </>
    );
}

const FormWrapper = styled.div`
width: 320px;
margin: 30px auto 120px;
form{
    display: flex;
    flex-direction:column;
    align-items: center;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
        label{
            align-self: flex-start;
        };
        input{
            background: #FFFFFF;
            border: 1px solid #D5D5D5;
            border-radius: 3px;
            height: 51px;
            margin-top: 3px;
            margin-bottom: 10px;
            width:320px;
            padding:18px;
            box-sizing: border-box;
            font-style: italic;
            font-size: 18px;
        };
        button{
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 400;
            font-size: 18px;
            width: 225px;
            height: 42px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #FFFFFF;
            background: #E8833A;
            border-radius: 3px;
            border-style: none;
            margin-bottom:20px;
        };
}
`;
