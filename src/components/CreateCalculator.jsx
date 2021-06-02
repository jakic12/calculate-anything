import React, { useState } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";
import CalculateButton from "./CalculateButton";
import InputField from "./InputField";

const MiddleCard = styled.div`
    width:500px;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    border-radius: 4px;
    background: white;
    position:relative;
    padding-bottom:200px;
`;

const MiddleCardWrapper = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    height:100vh;
    background: white;
`;

const Title = styled.div`
    font-size: 1.5em;
    padding:.5em;
`;
  
export default () => {
    const { search } = useLocation();
    const inputs = ["test", "kekistan", "  asd asd "];
    const [selected, setSelected] = useState(-1);
    const [datahook, setDatahook] = useState(inputs.map(() => ""))

    return <MiddleCardWrapper><MiddleCard>
        <Title>Calculate keks</Title>
        {inputs.map((input_name, i) => (
            <InputField
                selected={i == selected}
                setSelected={() => setSelected(i)}
                input_name={input_name}
                onChange={newText => {setDatahook(datahook.map((v, j) => i == j? newText : v))}}
            ></InputField>
        ))}
        <CalculateButton execute_function={() => new Promise((res, rej) => {
            console.log(datahook);
            res(datahook.reduce((prev, curr) => {
                return prev + parseInt(curr);
            }, 0))
        })}></CalculateButton>
    </MiddleCard></MiddleCardWrapper>
}
