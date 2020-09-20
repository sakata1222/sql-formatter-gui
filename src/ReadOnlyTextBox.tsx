import React from 'react';
import './ReadOnlyTextBox.scss';

type ReadOnlyTextBoxProps = {
  readonly placeholder: string;
  readonly formattedSql: string;
  readonly wrap?: string;
  readonly class?: string;
};

function ReadOnlyTextBox(props: ReadOnlyTextBoxProps) {
  return (
    <div className={'TextBox ' + props.class}>
      <textarea
        className="box"
        readOnly={true}
        placeholder={props.placeholder}
        value={props.formattedSql}
        wrap={props.wrap}
      />
    </div>
  );
}

export default ReadOnlyTextBox;
