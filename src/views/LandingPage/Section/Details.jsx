import React from "react";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import ProductStyle from "../../../assets/jss/material-kit-react/components/productStyle";
import { withStyles, makeStyles } from "@material-ui/core";
import ShopIcon from "@material-ui/icons/Shop";
import Receipt from "@material-ui/icons/Receipt";
import AccountBalance from "@material-ui/icons/AccountBalance";

import Image from "../../../assets/img/cryptoImg.jpg";

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
  icons: {
    display: "flex",
    color: "#844e15",
    marginBottom: "5px",
  },
  GridItem: {
    // backgroundColor: "#031017",
    borderRadius: "5px",
    padding: "50px",
    boxShadow:
      "0px 4px 10px 0px rgba(0, 0, 0, 0.14), 0px 7px 12px -5px rgba(20, 121, 251, 0.46)",
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
            for tron with few clicks.
          </h4>

          <div className={styleClass.icons}>
            <ShopIcon />
            <h3 className={styleClass.h3}>One Stop-Shop</h3>
          </div>
          <h4 className={styleClass.h4}>
            Crytoabitrage brings an ecosystem of products and services that
            allow customers to have one stop-shop experience for cryto to cryto
            transaction.
          </h4>
        </GridItem>
        <GridItem xs={12} sm={5} ma={5}>
          <img src={Image} alt="trading" height="100%" width="100%" />
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default withStyles(ProductStyle)(Details);
