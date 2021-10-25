import React, { useEffect, useReducer, useState } from "react";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

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
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmailAction] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassAction] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const { isValid: isEmailValid } = emailState;
  const { isValid: isPassValid } = passwordState;

  useEffect(() => {
    // console.log("useEffect called");
    const timeout = setTimeout(() => {
      // console.log("useEffect called");
      setFormIsValid(isEmailValid && isPassValid);
    }, 500);

    // Cleanup function useEffect hook
    return () => {
      clearTimeout(timeout);
      // console.log("clenup function called");
    };
  }, [isEmailValid, isPassValid]);

  const emailChangeHandler = (event) => {
    dispatchEmailAction({ type: "USER_INPUT", valEmail: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassAction({ type: "USER_PASS", valPass: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmailAction({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassAction({ type: "PASS_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    //I am not forwarding onLogout function somewhere in anothere child
    //component from her e that is why, I m not using context-api here. working
    //with props.

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
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
