import React, { Component, Fragment } from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import classnames from "classnames";
import { login } from "../../actions/action_auth";
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
import { validationSchema } from "./ValidationSchema";
import VpnKey from "@material-ui/icons/VpnKey";
import Email from "@material-ui/icons/Email";
import CircularProgress from "@material-ui/core/CircularProgress";
import ForgotPasswordView from "./ForgotPasswordView";

const initialState = {
  loading: false,
  email: "",
  password: "",
  open: false,
  snackBarOpen: false,
  snackBarMessage: "",
  snackBarVariant: "error",
  recoverPassword: false,
  setNewPassword: false,
};
const transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

class Login extends Component {
  state = {
    ...initialState,
  };

  clearState = () => {
    this.setState({ ...initialState });
  };

  componentDidUpdate(prevProps) {
    const { userAuth } = this.props;
    if (userAuth.login !== prevProps.userAuth.login) {
      const { login } = userAuth;
      const { success } = login;
      if (success === false) {
        this.setState({
          snackBarOpen: true,
          snackBarVariant: "error",
          snackBarMessage: login.message || login.data,
          loading: false,
        });
        return false;
      }

      this.setState({
        snackBarOpen: true,
        snackBarVariant: "success",
        snackBarMessage: login.message,
        loading: false,
      });
      setTimeout(() => {
        window.location.href = `/dashboard/user`;
      }, 1000);
    }
  }

  onCloseHandler = () => {
    this.setState({
      snackBarOpen: false,
    });
  };

  render() {
    let {
      email,
      password,
      loading,
      snackBarMessage,
      snackBarOpen,
      snackBarVariant,
      recoverPassword,
      setNewPassword,
    } = this.state;
    const { classes, handleClickOpen, handleClickClose } = this.props;

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
        const { login } = this.props;
        login(values, "user");
        this.setState({
          open: true,
          loading: true,
        });
      };

      return (
        <div>
          <GridContainer justify="center">
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                style={{ fontWeight: "bold" }}
                disabled={!isValid}
              >
                Sign In
              </Button>
            </form>
          </GridContainer>
        </div>
      );
    };
    return (
      <Fragment>
        <Dialog
          className={classes.modal}
          style={{ textAlign: "center" }}
          TransitionComponent={transition}
          open={handleClickOpen}
          // onClose={this.handleClose}
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
                Crytoarbitrage
              </GridItem>
            </GridContainer>
          </DialogTitle>
          <DialogContent
            id="form-dialog-description"
            className={classes.modalBody}
            style={{ maxWidth: "600px" }}
          >
            {recoverPassword ? (
              <ForgotPasswordView setNewPassword={setNewPassword} />
            ) : (
              <Container component="main" maxWidth="xs">
                <div>
                  <Typography component="h1" variant="subtitle1">
                    Login With Email
                  </Typography>
                  <Formik
                    initialValues={values}
                    validationSchema={validationSchema}
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
            )}
          </DialogContent>
          <GridContainer justify="center">
            <GridItem xs={12} sm={8}>
              <p
                style={{ fontSize: 16, cursor: "pointer" }}
                onClick={() =>
                  this.setState({ recoverPassword: !recoverPassword })
                }
              >
                {recoverPassword ? "Login with Email" : "Forgot your password?"}
              </p>
            </GridItem>
          </GridContainer>
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
            <Button onClick={handleClickClose} variant="outlined">
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
  login: (data, user) => dispatch(login(data, user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(modalStyle)(Login));
