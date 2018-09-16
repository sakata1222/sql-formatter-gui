import * as React from 'react';
import './InputTextBox.css';

interface IProps {
  readonly placeholder: string;
  readonly inputEventHandler: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

class InputTextBox extends React.Component<IProps> {
  public render() {
    return (
      <div className="InputTextBox">
        <textarea placeholder={this.props.placeholder} onChange={this.props.inputEventHandler} />
      </div>
    );
  }
}

export default InputTextBox;
