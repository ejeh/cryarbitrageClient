import React, { Component, Fragment } from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import classnames from "classnames";
import { refSignup } from "../../actions/action_auth";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import MysnackBar from "../SnackBar";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import modalStyle from "../../assets/jss/material-kit-react/components/modalStyle";
import { withStyles } from "@material-ui/core";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import { registrationValidationSchema } from "./ValidationSchema";
import VpnKey from "@material-ui/icons/VpnKey";
import Email from "@material-ui/icons/Email";
import CircularProgress from "@material-ui/core/CircularProgress";
import { API_KEY, BACKEND_URL } from "../../actions/api";

const initialState = {
  loading: false,
  email: "",
  password: "",
  open: false,
  snackBarOpen: false,
  snackBarMessage: "",
  snackBarVariant: "error",
  refLink: "",
};

const transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

class RefReg extends Component {
  state = {
    ...initialState,
  };

  clearState = () => {
    this.setState({ ...initialState });
  };

  componentDidUpdate(prevProps) {
    const { userAuth } = this.props;
    if (userAuth.refSignup !== prevProps.userAuth.refSignup) {
      const { refSignup } = userAuth;
      const { success } = refSignup;
      if (success === false) {
        this.setState({
          snackBarOpen: true,
          snackBarVariant: "error",
          snackBarMessage: refSignup.message || refSignup.data,
          loading: false,
        });
        return false;
      }

      this.setState({
        snackBarOpen: true,
        snackBarVariant: "success",
        snackBarMessage: refSignup.message,
        loading: false,
      });
    }
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  onCloseHandler = () => {
    this.setState({
      snackBarOpen: false,
    });
  };

  getLink = () => {
    try {
      fetch(`${BACKEND_URL}/reflink/?key=${API_KEY}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(),
      })
        .then((res) => res.json())
        .then((response) => {
          this.setState({
            // refLink: `/register?reflink=${response.data.referralLink}`,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    let {
      email,
      password,
      open,
      loading,
      snackBarMessage,
      snackBarOpen,
      snackBarVariant,
    } = this.state;
    const { classes, handleDrawerClose } = this.props;
    email = email.trim();
    password = password.trim();

    const values = { email, password };
    const Form = (props) => {
      const {
        handleChange,
        errors,
        touched,
        values,
        setFieldTouched,
        isValid,
      } = props;

      const change = (name, e) => {
        e.persist();
        handleChange(e);
        setFieldTouched(name, true, false);
      };

      const handleSubmit = (values, e) => {
        e.preventDefault();
        const { refSignup } = this.props;
        refSignup(values, "user");
        this.clearState();
        this.setState({
          open: true,
          loading: true,
        });
      };

      return (
        <div>
          <form onSubmit={handleSubmit.bind(null, values)}>
            {loading ? (
              <div>
                <Button
                  size="large"
                  style={{
                    fontWeight: "bold",
                    fontSize: "60px",
                  }}
                >
                  <CircularProgress color="secondary" />
                </Button>
                <Typography>Loading Please wait......</Typography>
              </div>
            ) : null}
            <TextField
              required
              helperText={touched.firstName ? errors.firstName : ""}
              error={touched.firstName && Boolean(errors.firstName)}
              variant="standard"
              margin="normal"
              id="firstName"
              label="First Name"
              name="firstName"
              value={values.firstName}
              autoComplete="firstName"
              onChange={change.bind(null, "firstName")}
              fullWidth
            />
            <TextField
              required
              helperText={touched.lastName ? errors.lastName : ""}
              error={touched.lastName && Boolean(errors.lastName)}
              variant="standard"
              margin="normal"
              id="lastName"
              label="Last Name"
              name="lastName"
              value={values.lastName}
              autoComplete="lastName"
              onChange={change.bind(null, "lastName")}
              fullWidth
            />

            <TextField
              required
              helperText={touched.email ? errors.email : ""}
              error={touched.email && Boolean(errors.email)}
              variant="standard"
              margin="normal"
              id="email"
              label="Email Address"
              name="email"
              value={values.email}
              autoComplete="email"
              onChange={change.bind(null, "email")}
              fullWidth
              InputProps={{
                endAdornment: <Email />,
                type: "email",
              }}
            />
            <TextField
              required
              helperText={touched.password ? errors.password : ""}
              error={touched.password && Boolean(errors.password)}
              variant="standard"
              margin="normal"
              name="password"
              label="Password"
              id="password"
              value={values.password}
              onChange={change.bind(null, "password")}
              fullWidth
              InputProps={{
                endAdornment: <VpnKey />,
                type: "password",
              }}
            />
            <TextField
              required
              helperText={touched.confirmPassword ? errors.confirmPassword : ""}
              error={touched.confirmPassword && Boolean(errors.confirmPassword)}
              variant="standard"
              margin="normal"
              name="confirmPassword"
              label="Confirm Password"
              id="confirmPassword"
              value={values.confirmPassword}
              onChange={change.bind(null, "confirmPassword")}
              fullWidth
              InputProps={{
                endAdornment: <VpnKey />,
                type: "password",
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              style={{ fontWeight: "bold" }}
              disabled={!isValid}
            >
              Signup
            </Button>
          </form>
        </div>
      );
    };

    return (
      <Fragment>
        <div onClick={handleDrawerClose}>
          <Typography
            onClick={this.handleClickOpen}
            style={{
              fontSize: "12px",
              lineHeight: "20px",
              fontWeight: "lighter",
              margin: "2px",
              position: "relative",
            }}
          >
            Register
          </Typography>
        </div>
        <Dialog
          className={classes.modal}
          style={{ textAlign: "center" }}
          TransitionComponent={transition}
          open={open}
          onClose={this.handleClose}
          keepMounted
          aria-labelledby="form-dialog-title"
          aria-describedby="form-dialog-description"
          disableBackdropClick
          disableEscapeKeyDown
        >
          <DialogTitle
            disableTypography
            className={classnames(classes.modalHeader, "auth-dialog-header")}
            style={{
              borderBottom: "1px solid lightgray",
              paddingBottom: "10px",
              fontSize: "1.5625rem",
              lineHeight: "1.4em",
            }}
            id="form-dialog-title"
          >
            <GridContainer>
              <GridItem md={12} sm={12}>
                Cryptoarbitrage
              </GridItem>
            </GridContainer>
          </DialogTitle>
          <DialogContent
            id="form-dialog-description"
            className={classes.modalBody}
            style={{ maxWidth: "600px" }}
          >
            <Container component="main" maxWidth="xs">
              <div className={classes.paper}>
                <Typography component="h1" variant="subtitle1">
                  Signup With Email
                </Typography>

                <Formik
                  initialValues={values}
                  validationSchema={registrationValidationSchema}
                >
                  {(props) => <Form {...props} />}
                </Formik>
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
            </Container>
          </DialogContent>{" "}
          <div>
            <hr
              style={{
                marginTop: "20px",
                marginBottom: "0px",
                borderStyle: "solid",
                borderColor: "lightgray",
              }}
            />
            <div
              style={{
                width: "40px",
                height: "40px",
                border: "2px solid lightgray",
                textAlign: "center",
                borderRadius: "40px",
                margin: "-20px auto 20px",
                lineHeight: "40px",
                backgroundColor: "white",
              }}
            >
              OR
            </div>
          </div>
          <DialogActions
            className={`${classes.modalFooter} ${classes.modalFooterCenter}`}
          >
            <Button onClick={this.handleClose} variant="outlined">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  userAuth: state.userAuth,
});

const mapDispatchToProps = (dispatch) => ({
  refSignup: (data, user) => dispatch(refSignup(data, user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(modalStyle)(RefReg));
