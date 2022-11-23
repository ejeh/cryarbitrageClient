import React from "react";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Header from "../../components/Header/Header";
import { makeStyles } from "@material-ui/core";
import Dark from "../../assets/img/arbitrage4.jpg";
import Details from "../LandingPage/Section/Details";
import About from "./Section/About";
import Footer from "../../components/Footer/Footer";
import What from "./Section/What";

const useStyle = makeStyles((theme) => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    backgroundColor: "#030d0f",
  },

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
    // paddingTop: "120px",
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
    color: "#cbdffd",
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
      <GridContainer className={classes.img}>
        <GridItem>
          <Header />
        </GridItem>
        <GridItem md={6} sm={6} xs={12}>
          <h1 className={classes.h1}>
            A Crypto To Crypto
            <br />
            Infrastructure
          </h1>
        </GridItem>
      </GridContainer>
      <div className={classes.root}>
        <What />

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
