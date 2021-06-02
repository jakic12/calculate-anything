import React, { useState } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";
import CalculateButton from "./CalculateButton";
import InputField from "./InputField";

import {MiddleCard, MiddleCardWrapper} from "./MiddleCard"

const Title = styled.div`
    font-size: 1.5em;
    padding:.5em;
`;
  
export default () => {
    const { search } = useLocation();
    
    const searchParams = new URLSearchParams(search);
    const code_string = searchParams.get('code');
    const title_string = searchParams.get('title');
    const input_array = JSON.parse(searchParams.get('inputs'));

    const inputs = input_array;
    const [selected, setSelected] = useState(-1);
    const [datahook, setDatahook] = useState(inputs.map(() => ""));

    return <MiddleCardWrapper><MiddleCard>
        <Title>{title_string || "Unknown calculator"}</Title>
        {inputs.map((input_name, i) => (
            <InputField
                selected={i == selected}
                setSelected={() => setSelected(i)}
                input_name={input_name}
                onBlur={() => {setSelected(-1)}}
                onChange={newText => {setDatahook(datahook.map((v, j) => i == j? newText : v))}}
            ></InputField>
        ))}

        <CalculateButton execute_function={() => new Function(`input_array`,`return new Promise((resolve, reject) => {
            debugger;
            ${code_string}
        })`).call(null, datahook)}>Calculate</CalculateButton>
    </MiddleCard></MiddleCardWrapper>
}