import React from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import ResetPasswordView from "../../components/Auth/ResetPasswordView";
import Image from "../../assets/img/profileBg.jpg";
import { makeStyles } from "@material-ui/core";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import About from "../LandingPage/Section/About";

const useStyle = makeStyles((theme) => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    backgroundColor: "#030d0f",
  },
  containerMaxWidth: {
    [theme.breakpoints.up("lg")]: {
      width: "70%",
      textAlign: "center",
    },
  },

  img: {
    [theme.breakpoints.only("xs")]: {
      height: "130vh",
    },
    backgroundColor: "transparent",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: `url("${Image}")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    // paddingTop: "120px",
    paddingBottom: "120px",
    marginRight: "0px",
    marginLeft: "0px",
    height: "100vh",
  },
}));

const ResetPasswordPage = (props) => {
  const { token } = props.match.params;
  const classes = useStyle();
  document.title = `Crytoarbitrage Password Reset @Cryptoarbitrage`;
  return (
    <div>
      <GridContainer className={classes.img}>
        <GridItem>
          <Header />
        </GridItem>
        <GridItem md={6} sm={6} xs={12}>
          <div
            style={{
              marginTop: "50px",
              textAlign: "center",
              opacity: 0.9,
              backgroundColor: "#fafafa",
              borderRadius: "5px",
              paddingBottom: "20px",
              paddingTop: "25px",
            }}
            className={classes.containerMaxWidth}
          >
            <ResetPasswordView resetToken={token} />
          </div>
        </GridItem>
      </GridContainer>
      <div className={classes.root}>
        <GridContainer container>
          <About />
        </GridContainer>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
