import * as React from "react";
import "./SimpleButton.css";

interface IProps {
  readonly buttonText: string;
  readonly onClickEventHandler: (
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}
class SimpleButton extends React.Component<IProps> {
  public render() {
    return (
      <div className="simple-button-area">
        <button type="button" onClick={this.props.onClickEventHandler}>
          {this.props.buttonText}
        </button>
      </div>
    );
  }
}

export default SimpleButton;
