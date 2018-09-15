import * as React from 'react';
import './UpdatableInputTextBox.css';

interface IProps {
  placeholder: string;
}

class UpdatableInputTextBox extends React.Component<IProps> {
  public render() {
    return (
      <div className="InputTextBox">
        <textarea placeholder={this.props.placeholder}/>
      </div>
    );
  }
}

export default UpdatableInputTextBox;
