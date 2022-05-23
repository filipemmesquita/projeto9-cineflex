import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Header(){
    const navigate = useNavigate();
    const currentLocation =useLocation().pathname;
    return(
        <HeaderContainer>
            {currentLocation !== "/" ? <button onClick={() => navigate(-1)}>Voltar</button> : ""}
            <h1>CINEFLEX</h1>
        </HeaderContainer>
    );

}
const HeaderContainer = styled.div`
width: 100%;
height:67px ;
background: #C3CFD9;
display: flex;
align-items: center;
justify-content: left;
h1{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 34px;
    color: #E8833A;
    text-align: left;
    width:calc(50% + 65px);
    margin-left: auto;
    
}
button{
    background: #E8833A;
    border-radius: 3px;
    border-style: none;
    padding:5px;
    color:white;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    margin-left:10px;
    width:45px;
    flex-basis: 0px;
}
`
