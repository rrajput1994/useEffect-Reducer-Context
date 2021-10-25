import React, { useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

// it is email Reducer function outsite of the component?
const emailReducer = (prevEmailState, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.valEmail, isValid: action.valEmail.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return {
      value: prevEmailState.value,
      isValid: prevEmailState.value.includes("@"),
    };
  }
  return { value: "", isValid: false };
};

// it is password Reducer function outside of the Component
const passwordReducer = (prevPassState, action) => {
  if (action.type === "USER_PASS") {
    return {
      value: action.valPass,
      isValid: action.valPass.trim().length > 6,
    };
  }
  if (action.type === "PASS_BLUR") {
    return {
      value: prevPassState.value,
      isValid: prevPassState.value.trim().length > 6,
    };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  const [emailState, dispatchEmailAction] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassAction] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const emailChangeHandler = (event) => {
    dispatchEmailAction({ type: "USER_INPUT", valEmail: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmailAction({ type: "INPUT_BLUR" });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassAction({ type: "USER_PASS", valPass: event.target.value });
  };

  const validatePasswordHandler = () => {
    dispatchPassAction({ type: "PASS_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button
            type="submit"
            className={classes.btn}
            disabled={!emailState.isValid}
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
