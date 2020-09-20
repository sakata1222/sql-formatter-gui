import { pd } from "pretty-data";
import React, { useState } from 'react';
import sqlFormatter from "sql-formatter";

import InputTextBox from "./InputTextBox";
import ReadOnlyTextBox from "./ReadOnlyTextBox";

import "./App.scss";
import "./bulma.scss";
import SimpleButton from "./SimpleButton";

function App() {
  const [inputSql, setInputSql] = useState("");
  const [formattedSql, setFormattedSql] = useState("");
  const [minifiedSql, setMinifiedSql] = useState("");

  const onInput = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    const formattedSql = sqlFormatter.format(e
      
      
      .target.value);
    setInputSql(input);
    setFormattedSql(formattedSql);
    setMinifiedSql(pd.sqlmin(formattedSql));
  };
  const copyFormattedSql = (_ : any) => copyTextToClipBoard(formattedSql);
  const copyMinifiedSql = (_ : any) => copyTextToClipBoard(minifiedSql);
  const updateInputByFormatted = (_ : any) => setInputSql(formattedSql);
  return (
    <div className="App">
      <header className="App-header has-background-info">
        <div className="title is-3 has-text-white-ter has-text-weight-bold">SQL Formatter</div>
      </header>
      <div className="App-main">
        <div className="input-area">
          <InputTextBox
            value={inputSql}
            placeholder="Please input SQL"
            inputEventHandler={onInput}
          />
        </div>
        <div className="display-area">
          <div className="formatted-area">
            <div className="button-area">
              <div className="button-wrapper">
                <SimpleButton
                  buttonClass="is-info is-rounded is-fullwidth has-tooltip-info"
                  buttonText="copy"
                  onClickEventHandler={copyFormattedSql}
                  tooltip="Copy the formatted SQL to the clipboard"
                />
              </div>
              <div className="button-wrapper">
                <SimpleButton
                  buttonClass="is-info is-rounded is-fullwidth has-tooltip-info"
                  buttonText="<<"
                  onClickEventHandler={updateInputByFormatted}
                  tooltip="Update the input area by the formatted SQL"
                />
              </div>
            </div>
            <div className="text-area">
              <ReadOnlyTextBox
                placeholder="This area shows formatted input SQL"
                formattedSql={formattedSql}
              />
            </div>
          </div>
          <div className="minified-area">
            <div className="button-area">
              <SimpleButton
                buttonClass="is-info is-rounded is-fullwidth has-tooltip-info"
                buttonText="copy"
                onClickEventHandler={copyMinifiedSql}
                tooltip="Copy the minified SQL to the clipboard"
              />
            </div>
            <div className="text-area">
              <ReadOnlyTextBox
                placeholder="This area shows minified input SQL"
                formattedSql={minifiedSql}
                wrap="off"
                class="no-scroll"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function copyTextToClipBoard(target: string) {
  const divTemp = document.createElement("div");
  divTemp.appendChild(document.createElement("pre")).textContent = target;

  document.body.appendChild(divTemp);
  const selection = document.getSelection();
  if (selection != null) {
    selection.selectAllChildren(divTemp);
  }
  document.execCommand("copy");

  document.body.removeChild(divTemp);
}
export default App;
