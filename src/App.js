import Header from './components/Header'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieSelect from './components/MovieSelect';
import SelectTime from './components/SelectTime';
import SelectSeatPage from './components/SeatSelection/SelectSeatPage';
import styled from 'styled-components';
import SuccessPage from './components/SuccessPage'

export default function App(){

    return(
        <BrowserRouter>
            <Header />
            <Container>
                
                    <Routes>
                        <Route path="/" element={<MovieSelect />} />
                        <Route path="/sessoes/:idFilme" element={<SelectTime />} />
                        <Route path="/assentos/:idSessao" element={<SelectSeatPage  />} />
                        <Route path="/sucesso/" element={<SuccessPage />} />
                    </Routes>
                
            </Container>
        </BrowserRouter>
    );

}
const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
text-align: center;
padding-top:30px;
h1{
    margin-bottom: 30px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
}
`;
