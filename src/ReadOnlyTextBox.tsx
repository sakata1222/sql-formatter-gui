import * as React from "react";
import "./ReadOnlyTextBox.css";

interface IProps {
  readonly placeholder: string;
  readonly formattedSql: string;
  readonly wrap?: string;
  readonly class?: string;
}
class ReadOnlyTextBox extends React.Component<IProps> {
  public render() {
    return (
      <div className={"TextBox " + this.props.class}>
        <textarea
          className="box"
          readOnly={true}
          placeholder={this.props.placeholder}
          value={this.props.formattedSql}
          wrap={this.props.wrap}
        />
      </div>
    );
  }
}

export default ReadOnlyTextBox;
