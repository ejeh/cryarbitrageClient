import React from "react";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import { makeStyles } from "@material-ui/core";
import Email from "@material-ui/icons/Email";
import Phone from "@material-ui/icons/Phone";
import Twitter from "@material-ui/icons/Twitter";
import Instagram from "@material-ui/icons/Instagram";
import { Link } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  h4: {
    [theme.breakpoints.only("xs")]: {
      padding: "0px 10px 25px 10px",
    },
    marginTop: "5px",
    marginBottom: "10px",
    color: "#cbdffd",
    padding: "0px 10px 10px 10px",
    fontFamily: "none",
    textAlign: "justify",
    fontWeight: 300,
  },
  h3: {
    color: "#cbdffd",
    margin: "0px",
    textAlign: "left",
    paddingLeft: "10px",
  },
  about: {
    backgroundColor: "#031017",
    padding: "100px 50px",
  },
  contact: {
    display: "flex",
    marginBottom: "5px",
  },

  button: {
    color: "#cbdffd",
    margin: "6px",
    textDecoration: "none",
  },
  link: {
    color: "#cbdffd",
    textDecoration: "none",
  },
}));

const About = () => {
  const styleClass = useStyle();
  return (
    <div style={{ paddingBottom: "0px", overflow: "hidden" }}>
      <GridContainer className={styleClass.about}>
        <GridItem xs={12} sm={4} md={4}>
          <h3 className={styleClass.h3}>About Us</h3>
          <h4 className={styleClass.h4}>
            Crytoarbitrage is the best amd most effective way to make money
            selling your usdt for tron. Our mission is to make this platform one
            the most intuitive place for fast cryto to cryto profitable
            transactions. And also to bring mass adoption closer
          </h4>
        </GridItem>
        <GridItem xs={12} sm={4} md={4}>
          <h3 className={styleClass.h3}>Quick Links</h3>
          <div className={styleClass.h4}>
            <div>
              <Link to="/" className={styleClass.link}>
                Home
              </Link>
            </div>
            <div>
              <Link to="/" className={styleClass.link}>
                Log In
              </Link>
            </div>
            <div>
              <Link to="/" className={styleClass.link}>
                Register
              </Link>
            </div>
            <div>
              <Link to="/" className={styleClass.link}>
                Contact
              </Link>
            </div>
            <div>
              <Link to="/" className={styleClass.link}>
                Buy Cryto (Start Arbitrage)
              </Link>
            </div>
          </div>
        </GridItem>
        <GridItem xs={12} sm={4} md={4}>
          <h3 className={styleClass.h3}>Contact Us</h3>
          <div className={styleClass.h4}>
            <div className={styleClass.contact}>
              <Email />
              <Link className={styleClass.button}>
                cryptoarbitrage0@gmail.com
              </Link>
            </div>
            <div className={styleClass.contact}>
              <Phone />
              <Link className={styleClass.button}>+549233749</Link>
            </div>
            <div className={styleClass.contact}>
              <Twitter />
              <Link className={styleClass.button}>@crytoarbitrage</Link>
            </div>
            <div className={styleClass.contact}>
              <Instagram />
              <Link className={styleClass.button}>crytoarbitrage</Link>
            </div>
          </div>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default About;
