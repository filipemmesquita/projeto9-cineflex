import styled from 'styled-components';

export default function Header(){
    return(
        <HeaderContainer>
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
justify-content: center;
h1{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 34px;
    color: #E8833A;

}
`;