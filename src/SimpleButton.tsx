import React from 'react';
import './bulma.scss';
import './SimpleButton.scss';

type SimpleButtonProps = {
  readonly buttonText: string;
  readonly onClickEventHandler: (
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
  readonly buttonClass?: string;
  readonly tooltip?: string;
};
function SimpleButton(props: SimpleButtonProps) {
  return (
    <div className="simple-button-area">
      <button
        className={'button ' + props.buttonClass}
        type="button"
        onClick={props.onClickEventHandler}
        data-tooltip={props.tooltip}
      >
        {props.buttonText}
      </button>
    </div>
  );
}

export default SimpleButton;
