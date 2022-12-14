import React, { Component } from "react";
import { connect } from "react-redux";
import { AppBar, Container, withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import UserHeader from "../components/Header/UserHeader";

// import Card from "@material-ui/core/Card";
import GridItem from "../components/Grid/GridItem";
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Avatar from "../assets/img/avatar-default.jpg";
import Mysnacbar from "../components/SnackBar";
import About from "./LandingPage/Section/About";
// import profileBg from "../assets/img/profileBg.jpg";
import { container } from "../assets/jss/material-kit-react";

import {
  fetchUserProfile,
  userProfileUpdate,
  fetchAllMyReferrals,
} from "../actions/action_user_profile";
import { getFromLocalStorage } from "../helpers/browserStorage";

import Footer from "../components/Footer/Footer";
import { API_KEY, BACKEND_URL } from "../actions/api";

const styles = (theme) => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    backgroundColor: "#030d0f",
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },

  input: {
    [theme.breakpoints.up("md")]: {
      width: "85%",
    },
    [theme.breakpoints.only("xs")]: {
      width: "93%",
    },
    [theme.breakpoints.only("sm")]: {
      width: "58%",
    },
    // color: "#2196f3",
    border: "1px solid rgba(33, 150, 243, 0.5)",
    borderRadius: "3px",
    padding: "7px",
    margin: "8px",
    cursor: "pointer",
  },
  customblue: {
    backgroundColor: "#044277",
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(20, 121, 251, 0.46)",
  },

  container: {
    ...container,
    minHeight: "50px",
    flex: "1",
    alignItems: "center",
    justifyContent: "space-between",
    display: "flex",
    flexWrap: "nowrap",
  },
  span: {
    color: "#844e15",
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
  border: {
    border: "1px solid",
    padding: "0 20px 10px 20px",
    borderRadius: "10px",
    fontFamily: "Arial, Helvetica, sans-serif",
    backgroundColor: "aliceblue",
  },

  count: {
    fontWeight: "bold",
    fontFamily: "Arial, Helvetica, sans-serif",
    lineHeight: 1.66,
    letterSpacing: "0.03333em",
  },
});

const initialstate = {
  firstName: "",
  email: "",
  lastName: "",
  address: "",
  pictures: [],
  snackBarMessage: "",
  snackBarOpen: false,
  snackBarVariant: "error",
  imgPreviewUrl: "",
  fallback: true,
  erroMessage: "",
  refLink: "",
  link: "copy link",
};

class UserProfile extends Component {
  state = {
    ...initialstate,
  };

  clearState = () => {
    this.setState({
      ...initialstate,
    });
  };

  async componentDidMount() {
    const { fetchUserProfile, fetchAllMyReferrals } = this.props;
    await fetchUserProfile(
      JSON.parse(getFromLocalStorage("crytoarbitrage-login:user")).profile.id
    );
    await fetchAllMyReferrals();
    // JSON.parse(getFromLocalStorage("crytoarbitrage-login:user")).profile.id
    await this.getLink();
  }

  componentWillReceiveProps(newProps) {
    const { fetchUser } = newProps.update;
    const { success } = fetchUser;
    if (success === false) {
      this.setState({
        snackBarOpen: true,
        snackBarVariant: "error",
        snackBarMessage: fetchUser.message || fetchUser.data,
        loading: false,
      });

      return false;
    }
    if (
      (newProps.update,
      "fetchUser" && typeof newProps.update.fetchUser === "object")
    ) {
      const { firstName, email, address, lastName } =
        newProps.update.fetchUser.data;
      this.setState({
        firstName,
        email,
        lastName,
        address,
      });
    }
    if (
      (newProps.update,
      "fetchAllMyReferrals" &&
        typeof newProps.update.fetchAllMyReferrals === "object")
    ) {
      const { data } = newProps.update.fetchAllMyReferrals;
      this.setState({
        count: data.length,
      });
    } else return null;
  }

  componentDidUpdate(prevProps) {
    const { update } = this.props;
    if (update.updateUser !== prevProps.update.updateUser) {
      const { updateUser } = update;
      const { success } = updateUser;
      if (success === false) {
        this.setState({
          snackBarOpen: true,
          snackBarVariant: "error",
          snackBarMessage: updateUser.message || updateUser.data,
        });
        return false;
      }

      this.setState({
        snackBarOpen: true,
        snackBarVariant: "success",
        snackBarMessage: updateUser.message,
      });
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  updateUserProfile = () => {
    const { email, firstName, address, lastName } = this.state;
    const { userProfileUpdate } = this.props;
    userProfileUpdate({ email, firstName, address, lastName });
  };

  onCloseHandler = () => {
    this.setState({
      snackBarOpen: false,
    });
  };

  onChangeHandler = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    if (!file.name.match(/\.(jpg|jpeg|png|svg+xml)$/)) {
      this.setState({
        erroMessage: "Only jpg, png, jpeg and svg+xml file formats allowed!",
      });

      return false;
    }
    if (file.size > 1000000) {
      this.setState({
        erroMessage: "File too large! Maximum filesize allowed is 1mb",
      });
      return false;
    }

    reader.onloadend = () => {
      this.setState({
        pictures: file,
        imgPreviewUrl: reader.result,
        erroMessage: "",
      });
    };
    reader.readAsDataURL(file);
  };

  getLink = () => {
    const FRONTEND_APP_URL =
      process.env.NODE_ENV === "production"
        ? process.env.REACT_APP_FRONTEND_APP_URL
        : "http://localhost:3000";
    try {
      fetch(`${BACKEND_URL}/reflink/?key=${API_KEY}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: `Bearer ${
            JSON.parse(getFromLocalStorage("crytoarbitrage-login:user"))
              .accessToken
          }`,
        },
        body: JSON.stringify(),
      })
        .then((res) => res.json())
        .then((response) => {
          this.setState({
            refLink: `${FRONTEND_APP_URL}/register?reflink=${response.data.referralLink}`,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };
  copyLink = (text) => {
    this.setState({
      link: "copied",
    });
    navigator.clipboard.writeText(text);
  };

  render() {
    document.title = "Profile - cryptoarbitrage";
    const { classes } = this.props;
    const {
      firstName,
      email,
      lastName,
      address,
      pictures,
      imgPreviewUrl,
      snackBarMessage,
      snackBarOpen,
      snackBarVariant,
      fallback,
      erroMessage,
      refLink,
      link,
      count,
    } = this.state;

    let $imagePreview = null;
    let images = (
      <img
        src={pictures.image_url}
        alt="..."
        style={{
          width: "200px",
          height: "180px",
          borderRadius: "50%",
        }}
      />
    );

    if (imgPreviewUrl) {
      $imagePreview = (
        <img
          src={imgPreviewUrl}
          alt="..."
          style={{
            width: "200px",
            height: "180px",
            borderRadius: "50%",
          }}
        />
      );
    } else {
      $imagePreview = (
        <div>
          {fallback ? (
            <img
              src={Avatar}
              alt="profile pic"
              style={{
                width: "200px",
                height: "180px",
                borderRadius: "50%",
              }}
            />
          ) : (
            <div>{images}</div>
          )}
        </div>
      );
    }

    return (
      <div>
        <CssBaseline />
        <AppBar
          position="relative"
          style={{ display: "flex" }}
          className={classes.customblue}
        >
          <div className={classes.container}>
            <Typography variant="h5" className={classes.typography}>
              Crypto<span className={classes.span}>Arbitrage</span>
            </Typography>

            <div>
              <UserHeader />
            </div>
          </div>
        </AppBar>
        <Container>
          <Grid
            container
            style={{ marginTop: "76px", backgroundColor: "color" }}
          >
            <GridItem xs={12} sm={12} md={6} style={{ textAlign: "center" }}>
              <div>
                <p style={{ color: "red" }}>{erroMessage}</p>
                {$imagePreview}
                <CardContent>
                  <h3>{firstName}</h3>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="raised-button-file"
                    multiple
                    type="file"
                    name="file"
                    onChange={this.onChangeHandler}
                  />
                  <label>
                    <Button
                      color="primary"
                      variant="outlined"
                      component="span"
                      onClick={this.onClickHandler}
                    >
                      Save image
                    </Button>
                  </label>
                </CardContent>
              </div>
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <div className={classes.border}>
                <br />
                <br />
                <div style={{ textAlign: "center" }}>
                  <Typography variant="h6">Referral Bonus</Typography>
                </div>
                <br />
                <br />
                <Typography>Your Referral Link</Typography>

                <TextField variant="outlined" fullWidth value={refLink} />
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={() => this.copyLink(`${refLink}`)}
                >
                  {link}
                </Button>
                <Typography variant="body2">
                  You can earn referral rewards up to 12% from three levels
                </Typography>
                <br />
                <br />
                <Grid container>
                  <GridItem xs={4} sm={4} md={4}>
                    <Typography className={classes.count}>Level 1</Typography>
                    <Typography className={classes.count}>
                      5% reward <br />
                      Total Referrals:{count}
                    </Typography>
                  </GridItem>
                  <GridItem xs={4} sm={4} md={4}>
                    <Typography className={classes.count}>Level 2</Typography>
                    <Typography className={classes.count}>
                      4% reward <br />
                      Total Referrals:0
                    </Typography>
                  </GridItem>
                  <GridItem xs={4} sm={4} md={4}>
                    <Typography className={classes.count}>Level 3 </Typography>
                    <Typography className={classes.count}>
                      3% reward <br />
                      Total Referrals:0
                    </Typography>
                  </GridItem>
                </Grid>
              </div>
            </GridItem>
          </Grid>
          <Grid container>
            <GridItem xs={12} sm={12} md={8}>
              <div>
                <CardHeader
                  color="primary"
                  title="Edit Profile"
                  subheader=" Complete your profile"
                >
                  <h4>Edit Profile</h4>
                  <p>Complete your profile</p>
                </CardHeader>
                <CardContent>
                  <Grid container>
                    <GridItem xs={12} sm={12} md={6}>
                      <TextField
                        id="firstName"
                        label="First Name"
                        className={classes.textField}
                        value={firstName}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                        name="firstName"
                        fullWidth
                        required
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <TextField
                        id="lastName"
                        label="Last Name"
                        className={classes.textField}
                        value={lastName}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                        name="lastName"
                        fullWidth
                        required
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <TextField
                        id="email"
                        label="Email Address"
                        className={classes.textField}
                        value={email}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                        name="email"
                        fullWidth
                        required
                      />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={6}>
                      <TextField
                        id="address"
                        label="Home Address"
                        className={classes.textField}
                        value={address}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                        name="address"
                        fullWidth
                        required
                      />
                    </GridItem>
                  </Grid>
                </CardContent>
                <CardActions>
                  <Button
                    color="primary"
                    onClick={this.updateUserProfile}
                    variant="outlined"
                  >
                    Update Profile
                  </Button>
                  <Button variant="outlined" color="primary" href="/buycrypto">
                    Buy Crypto
                  </Button>
                </CardActions>
              </div>
            </GridItem>
          </Grid>
        </Container>
        <br />
        <br />
        <div className={classes.root}>
          <Grid container>
            <About />
          </Grid>
        </div>
        <div>
          <Footer />
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={snackBarOpen}
          onClose={this.onCloseHandler}
        >
          <Mysnacbar
            onClose={this.onCloseHandler}
            variant={snackBarVariant}
            message={snackBarMessage}
          />
        </Snackbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  update: state.update,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserProfile: () => dispatch(fetchUserProfile()),
  fetchAllMyReferrals: () => dispatch(fetchAllMyReferrals()),
  userProfileUpdate: (data) => dispatch(userProfileUpdate(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UserProfile));
