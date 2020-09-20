import React from "react";
import "./InputTextBox.scss";

type InputTextBoxProps = {
  readonly placeholder: string;
  readonly value?: string;
  readonly inputEventHandler: (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
}

function InputTextBox(props: InputTextBoxProps) {
  return (
    <div className="InputTextBox">
      <textarea
        className="box"
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.inputEventHandler}
      />
    </div>
  );
}

export default InputTextBox;
