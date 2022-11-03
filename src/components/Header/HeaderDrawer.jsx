import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  button: {
    borderRadius: "3px",
    textTransform: "uppercase",
    fontSize: "12px",
    lineHeight: "20px",
    padding: "0.9375em",
    position: "relative",
    fontWeight: "lighter",
    margin: "5px",
  },
}));

export default function MenuListComposition(props) {
  const { handleDrawerClose } = props;
  const classes = useStyles();
  const anchorRef = React.useRef(null);
  const [hidden, setHidden] = React.useState(false);

  const handleClickClose = () => {
    setHidden(false);
  };

  const handleClickOpen = () => {
    setHidden(true);
  };

  return (
    <div>
      <Divider />
      <Button fullWidth className={classes.button} href="/">
        Home
      </Button>
      <Divider />
      <div onClick={handleClickOpen}>
        <Button
          fullWidth
          ref={anchorRef}
          onClick={handleDrawerClose}
          className={classes.button}
        >
          Login
        </Button>
      </div>
      <Login handleClickOpen={hidden} handleClickClose={handleClickClose} />
      <Divider />

      <Button fullWidth ref={anchorRef} className={classes.button}>
        <Register handleDrawerClose={handleDrawerClose} />
      </Button>
      <Divider />
      <Button fullWidth className={classes.button} href="/contact">
        Contact
      </Button>
      <Divider />
      <Button fullWidth className={classes.button} href="/buycrypto">
        Buy Crypto (start arbitrage)
      </Button>
      <Divider />
    </div>
  );
}
