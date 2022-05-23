import styled from "styled-components";
import {useLocation} from 'react-router-dom';
import { Link } from "react-router-dom";

export default function SuccessPage(){
    const location=useLocation();
    
    return(
        <>
            <Title1>Pedido feito <br /> com sucesso!</Title1>
            <Content>
                <div>
                    <Title2>Filme e sessão</Title2>
                        <h3>{location.state.movie}</h3>
                        <h3>{location.state.date} {location.state.time}</h3>
                </div>
                <div>
                    <Title2>Ingressos</Title2>
                        {location.state.seats.map((seat,index) => <p key={seat}>Assento {seat} <br /> Comprador {location.state.names[index]} <br /> CPF: {location.state.cpfs[index]}</p>)}
                </div>
                <Link to="/"><ReturnHome>Voltar para Home</ReturnHome></Link>
            </Content>

        </>
    );
};
const Title1=styled.h1`
color: #247A6B;

`;
const Title2=styled.h2`
font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 24px;
line-height: 28px;
`;
const Content=styled.div`
width: 320px;
display: flex;
justify-content: center;
align-items: flex-start;
flex-direction: column;
margin:0 auto;
div{
    margin-bottom:20px ;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 22px;
    line-height: 26px;
    p{
        
        text-align: left;
        margin-bottom: 20px;
    }
}
a{
    margin:0 auto;
}
`;
const ReturnHome=styled.button`
width: 225px;
height: 42px;
background: #E8833A;
border-radius: 3px;
color:white;
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 18px;
border-style: none;
`;