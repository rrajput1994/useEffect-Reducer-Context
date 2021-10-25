import Button from "../UI/Button/Button";

import Card from "../UI/Card/Card";
import classes from "./Home.module.css";

const Home = (props) => {
  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      {/*---I am not forwarding onLogout function somewhere in anothere child
      component from here that is why, I m not using context-api here. working 
      with props.--*/}
      <Button onClick={props.onLogout}>Logout</Button>
    </Card>
  );
};

export default Home;
