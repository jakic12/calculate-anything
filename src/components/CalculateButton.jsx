import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    width:100%;
    position: absolute;
    bottom:0;
`;

const Button = styled.div`
    background: #008aff;
    color:white;
    padding:1em;
    margin:1em;
    border-radius:4px;

    &:hover{
        cursor: pointer;
    }
`;

const Result = styled.div`
    height:${props => props.show? `auto` : `0`};
    transition: height .5s;
    margin:1em;
    box-sizing: border-box;
`;

export default ({execute_function, children}) => {

    const [result, setResult] = useState("");
    const [showResult, setShowResult] = useState(false); 
    const [error, setError] = useState(""); 

    return <Wrapper>
        <Button onClick={() => {
            if(execute_function) execute_function().then(gotten_result => {
                setResult(gotten_result);
                setShowResult(true);
            }).catch((e) => {
                setError(e);
            })
        }}>{children}</Button>
        <Result show={showResult}>{result}</Result>
    </Wrapper>
}