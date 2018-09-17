import { pd } from "node-pretty-data";
import * as React from "react";
import sqlFormatter from "sql-formatter";

import "./App.css";
import InputTextBox from "./InputTextBox";
import ReadOnlyTextBox from "./ReadOnlyTextBox";
import SimpleButton from "./SimpleButton";

import logo from "./logo.svg";

interface IState {
  inputSql: string;
  formattedSql: string;
  minifiedSql: string;
}
class App extends React.Component<{}, IState> {
  private copyFormattedSql: (event: any) => void;
  private copyMinifiedSql: (event: any) => void;

  public constructor(props: any) {
    super(props);
    this.state = {
      formattedSql: "",
      inputSql: "",
      minifiedSql: ""
    };
    this.updateDisplayAreaByInput = this.updateDisplayAreaByInput.bind(this);
    this.copyFormattedSql = (event: any) =>
      this.copyTextToClipBoard(this.state.formattedSql);
    this.copyMinifiedSql = (event: any) =>
      this.copyTextToClipBoard(this.state.minifiedSql);
    this.updateInputAreaByFormattedSql = this.updateInputAreaByFormattedSql.bind(
      this
    );
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-main">
          <div className="input-area">
            <InputTextBox
              value={this.state.inputSql}
              placeholder="Please input SQL"
              inputEventHandler={this.updateDisplayAreaByInput}
            />
          </div>
          <div className="display-area">
            <div className="formatted-area">
              <div className="button-area">
                <SimpleButton
                  buttonText="copy"
                  onClickEventHandler={this.copyFormattedSql}
                />
                <SimpleButton
                  buttonText="<<"
                  onClickEventHandler={this.updateInputAreaByFormattedSql}
                />
              </div>
              <div className="text-area">
                <ReadOnlyTextBox
                  placeholder="This area shows formatted input SQL"
                  formattedSql={this.state.formattedSql}
                />
              </div>
            </div>
            <div className="minified-area">
              <div className="button-area">
                <div className="button-area">
                  <SimpleButton
                    buttonText="copy"
                    onClickEventHandler={this.copyMinifiedSql}
                  />
                </div>
              </div>
              <div className="text-area">
                <ReadOnlyTextBox
                  placeholder="This area shows minified input SQL"
                  formattedSql={this.state.minifiedSql}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private updateDisplayAreaByInput(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    const formattedSql = sqlFormatter.format(event.target.value);
    this.setState({
      formattedSql,
      inputSql: event.target.value,
      minifiedSql: pd.sqlmin(formattedSql)
    });
  }

  private updateInputAreaByFormattedSql(event: any) {
    this.setState({ inputSql: this.state.formattedSql });
  }

  private copyTextToClipBoard(target: string) {
    const divTemp = document.createElement("div");
    divTemp.appendChild(document.createElement("pre")).textContent = target;

    document.body.appendChild(divTemp);
    document.getSelection().selectAllChildren(divTemp);
    document.execCommand("copy");

    document.body.removeChild(divTemp);
  }
}

export default App;
