import { pd } from "node-pretty-data";
import * as React from "react";
import sqlFormatter from "sql-formatter";

import "./App.css";
import InputTextBox from "./InputTextBox";
import ReadOnlyTextBox from "./ReadOnlyTextBox";

import logo from "./logo.svg";

interface IState {
  inputSql: string;
  formattedSql: string;
  minifiedSql: string;
}
class App extends React.Component<any, IState> {
  public constructor(props: any) {
    super(props);
    this.state = {
      formattedSql: "",
      inputSql: "",
      minifiedSql: ""
    };
    this.handleInputAreaChanged = this.handleInputAreaChanged.bind(this);
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
              placeholder="Please input SQL"
              inputEventHandler={this.handleInputAreaChanged}
            />
          </div>
          <div className="control-area">
            <p>Control area</p>
          </div>
          <div className="display-area">
            <div className="formatted-area">
              <ReadOnlyTextBox
                placeholder="This area shows formatted input SQL"
                formattedSql={this.state.formattedSql}
              />
            </div>
            <div className="minified-area">
              <ReadOnlyTextBox
                placeholder="This area shows minified input SQL"
                formattedSql={this.state.minifiedSql}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  private handleInputAreaChanged(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    const formattedSql = sqlFormatter.format(event.target.value);
    this.setState({
      formattedSql,
      minifiedSql: pd.sqlmin(formattedSql)
    });
  }
}

export default App;
