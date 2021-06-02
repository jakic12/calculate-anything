import React, { useState } from "react";
import styled from "styled-components";


const InputField = styled.div`
    margin:1em;
    border-radius: 4px;
    padding:1em;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    display:flex;
    flex-direction: column;
    align-items: flex-start;
    
    position:relative;

    ${props => props.selected? `
        border:1px #008aff solid;
    `:`border:1px #dadada solid;`}

    transition: border 0.3s;
`;

const TitleInputText = styled.div`
    flex-shrink:1;
    font-size:.8em;
    color:#008aff;
    
    position:absolute;
    z-index:10;
    
    background: white;
    padding:5px;
    transform: translate(0, -50%);
    pointer-events:none;
    
    color:#818181;
    ${props => props.selected? `
        color:#008aff;
    `:``}
    
    top:50%;
    ${props => props.hasData? `
        top:0 !important;
    `:``}

    transition: top 0.3s;
`;

const TitleInput = styled.input`
    flex-shrink: 0;
    border:none;
    box-sizing:border-box;
    width:100%;
    border:none;
    font-weight: bold;
    font-size:1em;

    &:focus{
        outline: none;
    }
`;

export default ({input_name, onChange,selected, setSelected}) => {
    const [innerText, setInnerText] = useState("");


    return <InputField selected={selected}>
        <TitleInputText
            selected={selected}
            hasData={selected || innerText.length > 0}
        >{input_name}</TitleInputText>
        <TitleInput
            onFocus={() => {setSelected()}}
            
            onChange={(input) => {
                setInnerText(input.target.value);
                onChange(input.target.value)
            }}
            
            value={innerText}
        ></TitleInput>
    </InputField>
}