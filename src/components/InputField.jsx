import React, { useState } from "react";
import styled from "styled-components";
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';


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


export default ({input_name, onChange,selected, setSelected, onBlur}) => {
    const [innerText, setInnerText] = useState("");


    return <InputField selected={selected}>
        <TitleInputText
            selected={selected}
            hasData={selected || innerText.length > 0}
        >{input_name}</TitleInputText>
        <TitleInput
            onFocus={() => {setSelected()}}

            onBlur={() => onBlur()}
            
            onChange={(input) => {
                setInnerText(input.target.value);
                onChange(input.target.value)
            }}
            
            value={innerText}
        ></TitleInput>
    </InputField>
}

export const CodeField = ({initialValue, input_name, onChange, selected, setSelected, onBlur, paddingCode}) => {
    const [innerText, setInnerText] = useState(initialValue || "");

    return <InputField selected={selected}>
    <TitleInputText
        selected={selected}
        hasData={true}
    >{input_name}</TitleInputText>
    <div style={{
            fontFamily: '"Fira Mono", monospace',
            fontSize: 12,
            color:"#818181"
        }}>
        {paddingCode && <div style={{padding:`5px`}} dangerouslySetInnerHTML={{__html:highlight(paddingCode[0], languages.js)}} />}
        <Editor
            onFocus={() => {setSelected()}}
            onBlur={() => onBlur()}
            highlight={code => highlight(code, languages.js)}
            padding={10}
            
            onValueChange={(code) => {
                setInnerText(code);
                onChange(code)
            }}

            style={{
                fontFamily: '"Fira Mono", monospace',
                fontSize: 12,
                marginLeft:paddingCode?`1em` : ``,
                boxSizing:`border-box`,
                color:"black",
                borderLeft:paddingCode?`1px solid #dddddd` : ``,
            }}
            
            value={innerText}
        ></Editor>
        {paddingCode && <div style={{padding:`5px`}} dangerouslySetInnerHTML={{__html:highlight(paddingCode[1], languages.js)}} />}
    </div>
</InputField>;
}