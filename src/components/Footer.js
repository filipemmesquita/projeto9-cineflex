import styled from "styled-components";

export default function Footer(props){
    return(
        <FooterContent>
            {props.children}
        </FooterContent>
    );
}
const FooterContent=styled.div`
position:fixed;
left:0;
bottom:0;
width:100%;
height: 117px;
background: #DFE6ED;
border: 1px solid #9EADBA;
display: flex;
align-items: center;
box-sizing: border-box;
padding: 14px 10px;
div{
    margin-left:14px;
    text-align: left;
    img{
        width: 48px;
        height: 72px;
        border: white;
        border-width: 8px;
        border-style:solid ;

    }
    p{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 26px;
    }
}
`;