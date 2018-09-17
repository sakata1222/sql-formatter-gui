import * as React from "react";
import "./InputTextBox.css";

interface IProps {
  readonly placeholder: string;
  readonly value?: string;
  readonly inputEventHandler: (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
}

class InputTextBox extends React.Component<IProps> {
  public render() {
    return (
      <div className="InputTextBox">
        <textarea
          className="box"
          value={this.props.value}
          placeholder={this.props.placeholder}
          onChange={this.props.inputEventHandler}
        />
      </div>
    );
  }
}

export default InputTextBox;
