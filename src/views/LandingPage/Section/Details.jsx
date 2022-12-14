import React from "react";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import ProductStyle from "../../../assets/jss/material-kit-react/components/productStyle";
import { withStyles, makeStyles } from "@material-ui/core";
import ShopIcon from "@material-ui/icons/Shop";
import Receipt from "@material-ui/icons/Receipt";
import AccountBalance from "@material-ui/icons/AccountBalance";
import Card from "@material-ui/core/Card";

import Image from "../../../assets/img/cryptoblue.jpg";

const useStyle = makeStyles((theme) => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    backgroundColor: "#031017",
    padding: "50px",
  },
  h4: {
    [theme.breakpoints.only("xs")]: {
      padding: "0px 10px 25px 10px",
    },
    marginTop: "5px",
    marginBottom: "10px",
    padding: "0px 10px 10px 10px",
    fontFamily: "none",
    textAlign: "justify",
    fontWeight: 300,
  },
  h3: {
    margin: "0px",
    textAlign: "left",
    paddingLeft: "10px",
  },
  icons: {
    display: "flex",
    marginBottom: "5px",
  },
  GridItem: {
    borderRadius: "5px",
    // padding: "50px",
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
  },
  link: {
    color: "#cbdffd",
    textDecoration: "none",
  },
}));

const Details = (props) => {
  const styleClass = useStyle();
  const { classes } = props;
  return (
    <div className={classes.section}>
      <GridContainer>
        <GridItem xs={12} sm={7} md={7} className={styleClass.GridItem}>
          <Card
            style={{
              padding: 30,
            }}
          >
            <div className={styleClass.icons}>
              <Receipt />
              <h3 className={styleClass.h3}>Instant Transactions</h3>
            </div>
            <h4 className={styleClass.h4}>
              Transactions with crytoarbitrage are swift and is been efficiently
              delivered just the way our customers want it.
            </h4>

            <div className={styleClass.icons}>
              <AccountBalance />
              <h3 className={styleClass.h3}>Simple Transactions</h3>
            </div>
            <h4 className={styleClass.h4}>
              Crytoarbitrage has simplified the process of exchanging your usdt
              for tron and BNB with few clicks.
            </h4>

            <div className={styleClass.icons}>
              <ShopIcon />
              <h3 className={styleClass.h3}>One Stop-Shop</h3>
            </div>
            <h4 className={styleClass.h4}>
              Crytoabitrage brings an ecosystem of products and services that
              allow customers to have one stop-shop experience for cryto to
              cryto transaction.
            </h4>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={5} ma={5}>
          <img src={Image} alt="trading" height="100%" width="100%" />
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default withStyles(ProductStyle)(Details);
