import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

export default function SelectSeatForm(props){
    const [name, setName]=useState("");
    const [cpf, setCpf]=useState("");
    const navigate = useNavigate();

    function submitSeats(event){
        event.preventDefault();
        if(props.selectedSeats.length!==0)
        {
            const submitObject={
                ids:props.selectedSeats,
                name:name,
                cpf:cpf
            }
                const requisition=axios.post(`https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many`, submitObject)
                requisition.then(response=>{
                    const successInfoObject = {
                        movie: props.movie,
                        date: props.date,
                        time: props.time,
                        seats:props.selectedSeatsNames,
                        name:name,
                        cpf:cpf,
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
            <label for="name">Nome do comprador:</label>
            <input type="text" id="name" value={name} placeholder="Digite seu nome..." onChange={e => setName(e.target.value)} required></input>
            <label for="cpf">CPF do comprador:</label>
            <input type="text" id="cpf" value={cpf} placeholder="Digite seu CPF..." onChange={e => setCpf(e.target.value)} required></input>
            <button type="submit">Reservar Assento(s)</button>
        </form>
        </FormWrapper>
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
        };
}
`;
