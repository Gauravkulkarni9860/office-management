import React from "react";

import "./Button.css";

const button = (props) => {
  let buttonElement = null;
  const buttonClasses = ["Button", [props.btnType]];
  buttonElement = (
    <button
      disabled={props.disabled}
      className={buttonClasses.join(" ")}
      onClick={props.clicked}
    >
      {props.children}
    </button>
  );
  return <div>{buttonElement}</div>;
};

export default button;
