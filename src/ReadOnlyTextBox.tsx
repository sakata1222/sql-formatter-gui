import * as React from 'react';
import './ReadOnlyTextBox.css';

interface IProps {
  readonly placeholder: string;
  readonly formattedSql: string;
}
class ReadOnlyTextBox extends React.Component<IProps> {
  public render() {
    return (
      <div className="TextBox">
        <textarea readOnly={true} placeholder={this.props.placeholder} value={this.props.formattedSql} />
      </div>
    );
  }
}

export default ReadOnlyTextBox;
