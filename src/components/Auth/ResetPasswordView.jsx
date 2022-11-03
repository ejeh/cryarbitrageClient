import React, { Component, Fragment } from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import { resetPassword } from "../../actions/action_auth";
import MysnackBar from "../SnackBar";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import { resetPasswordValidationSchema } from "./ValidationSchema";
import { VpnKey, LockOutlined } from "@material-ui/icons";
import { withStyles, Avatar, Divider } from "@material-ui/core";
import ForgotPasswordView from "./ForgotPasswordView";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
});

const initialState = {
  loading: false,
  snackBarOpen: false,
  snackBarMessage: "",
  snackBarVariant: "error",
  newPassword: "",
  confirmPassword: "",
  recoverPassword: false,
  errorMessage: "",
};

class ResetPasswordView extends Component {
  state = {
    ...initialState,
  };

  clearState = () => {
    this.setState({ ...initialState });
  };

  componentDidUpdate(prevProps) {
    const { userAuth } = this.props;
    if (userAuth.resetPassword !== prevProps.userAuth.resetPassword) {
      const { resetPassword } = userAuth;
      const { success } = resetPassword;
      if (success === false) {
        this.setState({
          snackBarOpen: true,
          snackBarVariant: "error",
          snackBarMessage: resetPassword.message || resetPassword.data,
          loading: false,
        });
        return false;
      }

      this.setState({
        snackBarOpen: true,
        snackBarVariant: "success",
        snackBarMessage: resetPassword.message,
        loading: false,
      });
    }
  }

  onCloseHandler = () => {
    this.setState({
      snackBarOpen: false,
    });
  };

  render() {
    let {
      loading,
      snackBarMessage,
      snackBarOpen,
      snackBarVariant,
      newPassword,
      confirmPassword,
      recoverPassword,
      errorMessage,
    } = this.state;

    const { classes, resetToken } = this.props;

    newPassword = newPassword.trim();
    confirmPassword = confirmPassword.trim();

    const values = {
      newPassword,
      confirmPassword,
    };
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
        if (typeof resetToken !== "string") {
          this.setState({ errorMessage: "Invalid password reset token" });
          return;
        }
        if (values.confirmPassword !== values.newPassword) {
          this.setState({
            errorMessage:
              "The confirmation password has to match the new password",
          });
          return;
        }
        const { resetPassword } = this.props;
        let user;
        if (window.location.pathname === `/user/reset-password/${resetToken}`) {
          user = "user";
        } else {
          user = "admin";
        }
        resetPassword(
          { token: resetToken, password: values.newPassword },
          user
        );
        this.setState({
          loading: true,
          errorMessage: "",
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
            <Typography variant="body1" color="error">
              {errorMessage}
            </Typography>
            <TextField
              required
              helperText={touched.newPassword ? errors.newPassword : ""}
              error={touched.newPassword && Boolean(errors.newPassword)}
              variant="standard"
              margin="normal"
              id="password"
              label="Enter a new password"
              name="newPassword"
              value={values.newPassword}
              onChange={change.bind(null, "newPassword")}
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
              id="confirmPassword"
              label="Comfirm password"
              name="confirmPassword"
              value={values.confirmPassword}
              autoComplete="comfirmPassword"
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
              Reset Password
            </Button>
          </form>
        </div>
      );
    };

    return (
      <Fragment>
        <Container component="main" maxWidth="xs">
          <Typography variant="h5">Agent Near Me</Typography>
          <Divider />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlined />
            </Avatar>
            {recoverPassword ? (
              <ForgotPasswordView />
            ) : (
              <>
                <Typography component="h1" variant="subtitle1">
                  Reset Password
                </Typography>

                <Formik
                  initialValues={values}
                  validationSchema={resetPasswordValidationSchema}
                >
                  {(props) => <Form {...props} />}
                </Formik>
              </>
            )}

            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={snackBarOpen}
              onClose={this.onCloseHandler}
              style={{
                marginTop: "45px",
              }}
            >
              <MysnackBar
                onClose={this.onCloseHandler}
                variant={snackBarVariant}
                message={snackBarMessage}
              />
            </Snackbar>
          </div>
        </Container>
        <GridContainer justify="center">
          <GridItem xs={12} sm={8}>
            <p
              style={{ fontSize: 16, cursor: "pointer" }}
              onClick={() =>
                this.setState({ recoverPassword: !recoverPassword })
              }
            >
              {recoverPassword ? "Reset Password" : "Recover Password"}
            </p>
          </GridItem>
        </GridContainer>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  userAuth: state.userAuth,
});

const mapDispatchToProps = (dispatch) => ({
  resetPassword: (data, user) => dispatch(resetPassword(data, user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(ResetPasswordView));
