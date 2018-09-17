import * as React from "react";
import "./bulma.css";
import "./SimpleButton.css";

interface IProps {
  readonly buttonText: string;
  readonly onClickEventHandler: (
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
  readonly buttonClass?: string;
  readonly tooltip?: string;
}
class SimpleButton extends React.Component<IProps> {
  public render() {
    return (
      <div className="simple-button-area">
        <button
          className={"button " + this.props.buttonClass}
          type="button"
          onClick={this.props.onClickEventHandler}
          data-tooltip={this.props.tooltip}
        >
          {this.props.buttonText}
        </button>
      </div>
    );
  }
}

export default SimpleButton;
