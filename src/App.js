import Header from './components/Header'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieSelect from './components/MovieSelect';
import SelectTime from './components/SelectTime';

export default function App(){

    return(
        <>
            <Header />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MovieSelect />} />
                    <Route path="/sessoes/:idFilme" element={<SelectTime />} />
                    <Route path="/assentos/:idSessao" />
                </Routes>
            </BrowserRouter>
        </>
    );

}
