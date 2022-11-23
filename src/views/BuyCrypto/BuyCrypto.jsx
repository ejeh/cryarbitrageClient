import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import About from "../LandingPage/Section/About";
import Footer from "../../components/Footer/Footer";
import Grid from "@material-ui/core/Grid";
import Header from "../../components/Header/Header";
import { buyCryto } from "../../actions/action_buycryto";
import { connect } from "react-redux";
import MysnackBar from "../../components/SnackBar";
import Snackbar from "@material-ui/core/Snackbar";

const useStyles = (theme) => ({
  root2: {
    ...theme.mixins.gutters(),
    // padding: 0,
    // paddingTop: theme.spacing.unit * 2,
    // backgroundColor: "#030d0f",
  },
  img: {
    backgroundColor: "#fff",
    paddingBottom: "120px",
    paddingTop: "25px",
    // opacity: 0.9,
  },

  content: {
    // color: "#cbdffd",
    marginTop: 70,
    textAlign: "center",
    wordWrap: "break-word",
    fontFamily: "Arial, Helvetica, sans-serif",
  },
  input: {
    border: 0,
    borderBottom: "#cbdffd solid",
    outline: "none",
    backgroundColor: "transparent",
    color: "white",
  },
});

const initialState = {
  loading: false,
  tron: "",
  bnb: "",
  ts_hash: "",
  copybep20: "copy address",
  copytrc20: "copy address",
  open: false,
  snackBarOpen: false,
  snackBarMessage: "",
  snackBarVariant: "error",
};

class BuyCrypto extends Component {
  state = {
    ...initialState,
  };

  clearState = () => {
    this.setState({ ...initialState });
  };

  componentDidUpdate(prevProps) {
    const { buyCrypto } = this.props;
    if (buyCrypto.crypto !== prevProps.buyCrypto.crypto) {
      const { crypto } = buyCrypto;
      const { success } = crypto;
      if (success === false) {
        this.setState({
          snackBarOpen: true,
          snackBarVariant: "error",
          snackBarMessage: crypto.message || crypto.data,
          loading: false,
        });
        return false;
      }

      this.setState({
        snackBarOpen: true,
        snackBarVariant: "success",
        snackBarMessage: crypto.message,
        loading: false,
      });
    }
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit(e, values) {
    e.preventDefault();
    const { buyCryto } = this.props;
    buyCryto(values);
    this.clearState();
  }

  onCloseHandler = () => {
    this.setState({
      snackBarOpen: false,
    });
  };

  copybep20 = (text) => {
    this.setState({
      copybep20: "copied",
    });
    navigator.clipboard.writeText(text);
  };
  copytrc20 = (text) => {
    this.setState({
      copytrc20: "copied",
    });
    navigator.clipboard.writeText(text);
  };
  render() {
    document.title = "Buy Crypto - @cryptoarbitrage";
    const { classes } = this.props;
    let {
      tron,
      bnb,
      snackBarOpen,
      snackBarMessage,
      snackBarVariant,
      ts_hash,
      copybep20,
      copytrc20,
    } = this.state;

    const values = { tron, bnb, ts_hash };
    return (
      <>
        <Grid className={classes.img}>
          <Header color="customblue" />
          <div className={classes.content}>
            <form onSubmit={(e) => this.handleSubmit(e, values)}>
              <div>=BNB SMART CHAIN(bsc)</div>
              <input
                type="text"
                id="bnb"
                name="bnb"
                value={bnb}
                className={classes.input}
                onChange={this.handleChange}
              />

              <br />
              <br />
              <div>TRON(trx)</div>

              <input
                type="text"
                id="tron"
                name="tron"
                value={tron}
                className={classes.input}
                onChange={this.handleChange}
              />

              <br />

              <br />
              <div>
                <p>
                  Please transact usdt bep20 with the first address and transact
                  usdt trc20 with the second address.
                </p>
                <br />
                <div>
                  <p>Usdt Bep20 0x0Be6564Df836e2f0C28d712147c94bCa5B6482b7</p>

                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={() =>
                      this.copybep20(
                        // "0x1f2748f6c444dacffae794147bb29ad542647c00"
                        "0x0Be6564Df836e2f0C28d712147c94bCa5B6482b7"
                      )
                    }
                  >
                    {copybep20}
                  </Button>
                </div>

                <br />

                <div>
                  <p>Usdt Trc20 TKoKBGnhSRd9i8PTvhtdCjFd9nfUxJ8z8m</p>
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={() =>
                      this.copytrc20(
                        // "TQmoKNWKJ5sK5j8sPF771gmqHqnBQ56riE"
                        "TKoKBGnhSRd9i8PTvhtdCjFd9nfUxJ8z8m"
                      )
                    }
                  >
                    {copytrc20}
                  </Button>
                </div>

                <br />

                <p>Upload your transaction ID or transaction Hash below.</p>

                <br />
                <div>
                  <input
                    type="text"
                    id="ts_hash"
                    name="ts_hash"
                    value={ts_hash}
                    className={classes.input}
                    onChange={this.handleChange}
                  />
                </div>
                <br />

                <Button type="submit" variant="outlined" color="primary">
                  Complete purchase
                </Button>

                <br />

                <p>
                  Thanks for using Cryptoarbitrage your payment will arrive in
                  your account within 10 minutes .
                </p>
              </div>
            </form>
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={snackBarOpen}
              onClose={this.onCloseHandler}
            >
              <MysnackBar
                onClose={this.onCloseHandler}
                variant={snackBarVariant}
                message={snackBarMessage}
              />
            </Snackbar>
          </div>
        </Grid>
        <div className={classes.root2}>
          <About />
        </div>
        <div>
          <Footer />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  buyCrypto: state.buyCrypto,
});

const mapDispatchToProps = (dispatch) => ({
  buyCryto: (data) => dispatch(buyCryto(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(BuyCrypto));
