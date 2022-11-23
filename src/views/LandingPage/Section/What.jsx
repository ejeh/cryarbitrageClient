import React from "react";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import ProductStyle from "../../../assets/jss/material-kit-react/components/productStyle";
import { withStyles, makeStyles, Container } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  container: {
    backgroundColor: "#ffffff !important",
    paddingTop: "1px",
  },
  wrapper: {
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
      left: "0px",
      paddingLeft: 0,
      paddingRight: 0,
      textAlign: "center",
    },
    position: "relative",
    boxSizing: "border-box",
    paddingLeft: "7.5px",
    paddingRight: "7.5px;",
    marginTop: "55px",
    width: "100%",
    textAlign: "left",
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
    letterSpacing: "0.03em",
    lineHeight: "1.9em",
    paddingLeft: "10px",
  },
  h3: {
    margin: "0px",
    textAlign: "left",
    paddingLeft: "10px",
  },

  title: {
    fontSize: "2.3em",
    color: "#111111",
    paddingBottom: "0.62em",
    letterSpacing: "-3.0px",
    lineHeight: "1.2em",
    fontFamily: " Arial, Helvetica, sans-serif",
    fontWeight: 600,
    fontStyle: "normal",
    textTransform: "capitalize",
    paddingLeft: "10px",
  },
  title_desc: {
    lineHeight: "1.9em",
    border: 0,
    outline: 0,
    fontSize: "0.8em",
    wordWrap: "break-word",
    fontWeight: 100,
    color: "#595959",
    fontFamily: "auto",
    width: "93%",
    letterSpacing: "0.03em",
  },
}));

const What = (props) => {
  const styleClass = useStyle();
  return (
    <div className={styleClass.container}>
      <div className={styleClass.wrapper}>
        <Container>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <h2 className={styleClass.title}>CRYPTOARBITRAGE</h2>
              <h4 className={styleClass.h4}>
                The best crypto to crypto arbitrage transactions.
                <br />
                <br />
                What is arbitrage all about?
                <br />
                Arbitrage is the process of simultaneous buying and selling of
                an asset from different platforms, exchanges or locations to
                cash in on the price difference (usually small in percentage
                terms).
                <br />
                Description: Suppose an asset, gold, is quoted at Rs 27,000 per
                10 gm in the Delhi bullion market and at Rs 27,500 in the Mumbai
                bullion market. A trader may buy 10 gm of gold in Delhi and sell
                it in Mumbai, making a profit of Rs 500 (Rs 27,500 - Rs 27,000).
                However, this trade will be profitable only if the cost of
                transactions is less than Rs 500 per 10 gm of gold.
                <br />
                <br />
                <h2 className={styleClass.h3} style={{ textAlign: "center" }}>
                  Profit Table
                </h2>
                <br />
                <br />
                <table>
                  <caption>USDT - TRON</caption>
                  <tr>
                    <th>PAY (USDT)</th>
                    <th>RECIEVE (TRON)</th>
                  </tr>
                  <tr>
                    <th>$100</th>
                    <th>$108.28</th>
                  </tr>
                </table>
                <br />
                <br />
                <table>
                  <caption>USDT - BNB(SMART-CHAIN)</caption>
                  <tr>
                    <th>PAY (USDT)</th>
                    <th>RECIEVE (TRON)</th>
                  </tr>
                  <tr>
                    <th>$100</th>
                    <th>$109.03</th>
                  </tr>
                </table>
                <br />
                <br />
                NOTE: This can only be done five (5) times per day. More than
                five (5) transactions per day will lead to disabling of an
                account.
                <br />
                Therefore CRYPTOARBITRAGE is a great option for investors
                looking for a way to make high-frequency trades with a very
                low-risk returns (USDT/TRON-USDT/BNB) doing so means making
                profits through a process that involves little or no risks. The
                other great thing about this strategy is you don't have to be a
                professional investor with an expensive set-up in order to begin
                CRYPTOARBITRAGE.
              </h4>
              <br />
              <br />
              <h3 className={styleClass.h3}>
                Frequently Asked Questions (FAQ)
                <br />
                How can I start Cryptoarbitrage?
              </h3>
              <h4 className={styleClass.h4}>
                To start Cryptoarbitrage you just have to register and login to
                your account and start your arbitrage process. Or go to buy
                crypto(start arbitrage) option and follow the instruction given
                below.
              </h4>
              <br />
              <br />
              <h3 className={styleClass.h3}>
                Who is the owner of Cryptoarbitrage?
              </h3>
              <h4 className={styleClass.h4}>
                Cryptoarbitrage isn't new in the global space. It was the secret
                to the early success of crypto Billionaire Sam Bankman-Fried.
                After his success with Arbitrage trading, he went on to build
                one of the largest and fastest-growing crypto to crypto
                arbitrage transactions in the world called Cryptoarbitrage.com
              </h4>
              <br />
              <br />
              <h3 className={styleClass.h3}>
                Risks Associated With Crypto Arbitrage Trading
              </h3>
              <h4 className={styleClass.h4}>
                The possibility of making a large profits quickly with
                Cryptoarbitrage is 87%, while losses can be as little 13%. Given
                how quickly money moves in and out of any particular arbitrage
                trade, that means there's significantly less risk involved.
              </h4>
              <br />
              <br />
              <h3 className={styleClass.h3}>
                How many dollars can I earn daily with Cryptoarbitrage?
              </h3>
              <h4 className={styleClass.h4}>
                On average, crypto arbitrage trades can earn profit margins{" "}
                <strong>between ($10 to $1000) daily.</strong> However, there
                are occasions where there are large differences in spreads,
                offering traders the opportunity to make decent profits, but
                this doesn't happen every day.
              </h4>

              <br />
              <br />
              <h3 className={styleClass.h3}>
                HOW DO WE ALSO GAIN FROM THIS CRYPTOARBITRAGE?
              </h3>
              <h4 className={styleClass.h4}>
                Good! We also make money just as you do on this platform. All we
                do is just to buy your USDT and pay you with TRON or BNB SMART
                CHAIN and sell your USDT back in Argentina market or Argentine
                peso (ARS) and maximize our profits.
              </h4>
            </GridItem>
          </GridContainer>
        </Container>
      </div>
    </div>
  );
};

export default withStyles(ProductStyle)(What);
