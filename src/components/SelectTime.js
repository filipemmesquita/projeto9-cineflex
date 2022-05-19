import { useParams } from 'react-router-dom';

export default function SelectTime(props){
    const params = useParams();
    console.log(params)
    return(<h1>{params.idFilme} </h1>)

}