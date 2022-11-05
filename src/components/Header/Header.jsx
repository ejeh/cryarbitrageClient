import React from "react";
import clsx from "clsx";
import classNames from "classnames";

import {
  withStyles,
  makeStyles,
  useTheme,
  Dialog,
  Typography,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import headerStyle from "../../assets/jss/material-kit-react/components/headerStyle";
import HeaderDrawer from "../Header/HeaderDrawer";
import Register from "../Auth/Register";
import Login from "../Auth/Login";
import IconButton from "@material-ui/core/IconButton";
import CssBaseline from "@material-ui/core/CssBaseline";

const drawerWidth = 240;
const useStyle = makeStyles((theme) => ({
  menu: {
    [theme.breakpoints.only("lg")]: {
      display: "none",
    },
  },
  menuItem: {
    position: "absolute",
    top: "10px",
    left: "0px",
    transform: "translate3d(0px, 50px, 0px)",
    willChange: "transform",
  },

  hide: {
    display: "none",
  },
  buttonCollapse: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },

  button: {
    color: "#cbdffd",
    borderRadius: "3px",
    textTransform: "uppercase",
    fontSize: "13px",
    lineHeight: "20px",
    padding: "0.9375em",
    display: "inline-flex",
    position: "relative",
    fontWeight: 400,
    // margin: "30px 15px 0px 0px",
    margin: "0px 15px 0px 0px",
  },
  typography: {
    [theme.breakpoints.down("md")]: {
      margin: "0",
      textTransform: "capitalize",
    },
    color: "#cbdffd",
    borderRadius: "3px",
    lineHeight: "20px",
    padding: "0.9375em",
    display: "inline-flex",
    position: "relative",
    fontWeight: 400,
    margin: "0px 15px 0px 0px",
    textTransform: "uppercase",
    // margin: "auto",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  menuItemDiv: {
    margin: "10px 28px 0",
    fontSize: "15px",
    lineHeight: "20px",
    fontWeight: "normal",
    "&:hover": {
      color: "#FFFFFF",
      boxShadow:
        "0 12px 20px -10px rgba(20, 121, 251, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(20, 121, 251, 0.2)",
      backgroundColor: "#1479fb",
      borderRadius: "5px",
    },
  },
  span: {
    color: "#844e15",
  },
}));

const Header = (props) => {
  const { classes } = props;
  const styleClass = useStyle();
  const theme = useTheme();
  const [hidden, setHidden] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setHidden(true);
  };

  const handleClickClose = () => {
    setHidden(false);
  };

  const dialogClose = () => {
    setOpen(false);
  };

  const appBarClasses = classNames({
    [classes.appBar]: true,
  });

  return (
    <div>
      <CssBaseline />
      <div className={appBarClasses}>
        <div className={classes.container}>
          <Typography variant="h5" className={styleClass.typography}>
            Cryto<span className={styleClass.span}>arbitrage</span>
          </Typography>

          <div className={styleClass.buttonCollapse}>
            <Button className={styleClass.button} href="/">
              Home
            </Button>
            <Button className={styleClass.button}>
              <div onClick={handleClickOpen}>Login</div>
              <Login
                handleClickOpen={hidden}
                handleClickClose={handleClickClose}
              />
            </Button>
            <Button className={styleClass.button}>
              <Register />
            </Button>
            <Button className={styleClass.button} href="/contact">
              Contact
            </Button>
            <Button className={styleClass.button} href="/buycrypto">
              Buy Cryto (Start arbitrage)
            </Button>
          </div>
        </div>

        <IconButton
          style={{ color: "white" }}
          size="medium"
          arial-label="open-drawer"
          edge="end"
          onClick={handleDrawerOpen}
          className={clsx(open && styleClass.hide, [styleClass.menu])}
        >
          <MenuIcon />
        </IconButton>
      </div>
      <Dialog
        open={open}
        onClose={dialogClose}
        keepMounted
        aria-labelledby="form-dialog-title"
        aria-describedby="form-dialog-description"
        disableBackdropClick
        disableEscapeKeyDown
        style={{ textAlign: "center" }}
      >
        <Drawer
          className={styleClass.drawer}
          variant="persistent"
          anchor="right"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={styleClass.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>
          </div>
          <Divider />
          <div>
            <HeaderDrawer handleDrawerClose={handleDrawerClose} />
          </div>
        </Drawer>
      </Dialog>
    </div>
  );
};

export default withStyles(headerStyle)(Header);
