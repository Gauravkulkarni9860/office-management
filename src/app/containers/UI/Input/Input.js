import React from "react";

import "./Input.css";

const input = (props) => {
  let inputElement = null;
  const inputClasses = ["InputElement"];
  if (props.invalid && props.touched) {
    inputClasses.push("Invalid");
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          type={props.elementConfig.type}
          value={props.value}
          placeholder={props.elementConfig.placeholder}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          type={props.type}
          value={props.value}
          placeholder={props.placeholder}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className="Input">
      <label className="Label">{props.label}</label>
      {inputElement}
      <label
        className="LabelInvalid"
        hidden={!(props.invalid && props.touched)}
      >
        This is required field.
      </label>
    </div>
  );
};

export default input;
