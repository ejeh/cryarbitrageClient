import React from "react";
import Header from "../../components/Header/Header";
import { makeStyles } from "@material-ui/core";
import Dark from "../../assets/img/arbitrage4.jpg";
import Details from "../LandingPage/Section/Details";
import About from "./Section/About";
import Footer from "../../components/Footer/Footer";
import What from "./Section/What";
import Grid from "@material-ui/core/Grid";

const useStyle = makeStyles((theme) => ({
  img: {
    [theme.breakpoints.down("sm")]: {
      marginTop: "0px",
    },

    [`${theme.breakpoints.between("xs", "sm")} and (orientation: landscape)`]: {
      height: "100vh",
    },

    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: `url("${Dark}")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "100% 100%",
    paddingBottom: "120px",
    // opacity: 1,
    marginRight: "0px",
    marginLeft: "0px",
    height: "100vh",
  },
  h1: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "2.5em",
    },

    [`${theme.breakpoints.only("sm")} and (orientation: landscape)`]: {
      fontSize: "3.0em",
    },

    textAlign: "center",
    opacity: 0,
    color: "#fff",
    fontWeight: 600,
    fontSize: "3.8em",
    lineHeight: "1.222",
    marginTop: "50px",
    textTransform: "capitalize",
    fontFamily: " Arial, Helvetica, sans-serif",
    transform: "translateY(300px)",
    animation: "$slidUp .9s ease-in-out forwards .9s",
    zIndex: 5,
  },
  "@keyframes slidUp": {
    "0%": {
      opacity: 0,
      transform: "translateY(300px)",
    },
    "100%": {
      opacity: 1,
      transform: "translateY(0px)",
    },
  },

  span: {
    color: "#3e8839",
  },
}));
const LandingPage = () => {
  const classes = useStyle();
  document.title = "Home - cryptoarbitrage";
  return (
    <React.Fragment>
      <Grid container className={classes.img}>
        <Grid item>
          <Header color="customblue" />
        </Grid>
        <Grid item md={6} sm={6} xs={12}>
          <h1 className={classes.h1}>
            A Crypto To Crypto
            <br />
            Infrastructure
          </h1>
        </Grid>
      </Grid>
      <What />
      <div style={{ overflowX: "hidden" }}>
        <Details />

        <About />
      </div>

      <div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default LandingPage;
