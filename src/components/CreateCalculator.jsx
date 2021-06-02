import React, {useState} from "react";
import styled from "styled-components";
import {MiddleCard, MiddleCardWrapper} from "./MiddleCard"

import InputField, {CodeField} from "./InputField";
import CalculateButton from "./CalculateButton";
import { useLocation } from "react-router";

const Title = styled.div`
    font-size: 1.5em;
    padding:.5em;
`;

const Description = styled.div`
    padding-left:2em;
    padding-bottom:2em;
    padding-right:2em;
    font-size:.8em;
    box-sizing:border-box;
`;
export default ({}) => {
    const location = useLocation();
    const [selected, setSelected] = useState(-1);
    const [calculatorName, setCalculatorName] = useState("");
    const [inputs, setInputs] = useState("");
    const [codeText, setCodeText] = useState(
`// Example code, that sums all of the inputs

const result = input_array.reduce((prev, curr) => 
    prev + parseInt(curr)
, 0);
resolve(result);`);

    return <MiddleCardWrapper>
        <MiddleCard>
            <Title>Create new calculator</Title>
            <InputField
                input_name={"Calculator name"}
                selected={selected == 0}
                setSelected={() => {setSelected(0)}}
                onChange={new_text => setCalculatorName(new_text)}
                onBlur={() => {setSelected(-1)}}
            ></InputField>
            <InputField
                input_name={"Inputs"}
                selected={selected == 1}
                setSelected={() => setSelected(1)}
                onChange={new_text => setInputs(new_text)}
                onBlur={() => {setSelected(-1)}}
            ></InputField>
            <Description>Here you can write input names in tics, sepparated by commas, example <code style={{borderBottom:`1px solid black`}}>"item1", "item2"</code></Description>
            <CodeField
                input_name={"Calculator code"}
                selected={selected == 2}
                setSelected={() => setSelected(2)}
                onChange={new_text => setCodeText(new_text)}
                onBlur={() => {setSelected(-1)}}
                paddingCode={[`new Promise((resolve, reject) => {`, `</div>`]}
                initialValue={codeText}
            ></CodeField>
            <Description>Whatever gets passed in the <code>resolve</code> function, will get returned as the result</Description>
            <Description>You can access the inputs from the <code>input_array</code> array.<br />Example <code>input_array</code>: <code>["answer 1", "answer 2"]</code></Description>
            <CalculateButton execute_function={
                () => new Promise((res, rej) => {
                    const inputs_array_string = encodeURIComponent(`[${inputs}]`);
                    const title = encodeURIComponent(calculatorName);
                    const code_1 = encodeURIComponent(codeText)

                    const relative_link = `#/calculator?title=${title}&inputs=${inputs_array_string}&code=${code_1}`;

                    res(<a href={relative_link}>Generated link</a>)
                })
            }>Generate link</CalculateButton>
        </MiddleCard>
    </MiddleCardWrapper>
}