import React, { Component, Fragment } from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import { forgotPassword } from "../../actions/action_auth";
import MysnackBar from "../SnackBar";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import { forgotPasswordValidationSchema } from "./ValidationSchema";
import Email from "@material-ui/icons/Email";

const initialState = {
  loading: false,
  email: "",
  open: false,
  snackBarOpen: false,
  snackBarMessage: "",
  snackBarVariant: "error",
};

class ForgotPasswordView extends Component {
  state = {
    ...initialState,
  };

  clearState = () => {
    this.setState({ ...initialState });
  };

  componentDidUpdate(prevProps) {
    const { userAuth } = this.props;
    if (userAuth.forgotPassword !== prevProps.userAuth.forgotPassword) {
      const { forgotPassword } = userAuth;
      const { success } = forgotPassword;
      if (success === false) {
        this.setState({
          snackBarOpen: true,
          snackBarVariant: "error",
          snackBarMessage: forgotPassword.message || forgotPassword.data,
          loading: false,
        });
        return false;
      }

      this.setState({
        snackBarOpen: true,
        snackBarVariant: "success",
        snackBarMessage: forgotPassword.message,
        loading: false,
      });
    }
  }

  onCloseHandler = () => {
    this.setState({
      snackBarOpen: false,
    });
  };

  getUsers = () => {};

  render() {
    let { email, loading, snackBarMessage, snackBarOpen, snackBarVariant } =
      this.state;

    email = email.trim();

    const values = { email };
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
        const { forgotPassword } = this.props;
        forgotPassword(values, "user");
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
                  disabled
                >
                  <i className="fas fa-spinner fa-spinner fa-spin">&nbsp;</i>
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
            <Button
              fullWidth
              color="secondary"
              variant="contained"
              type="submit"
              style={{ fontWeight: "bold" }}
              disabled={!isValid}
            >
              Recover Password
            </Button>
          </form>
        </div>
      );
    };

    return (
      <Fragment>
        <Container component="main" maxWidth="xs">
          <div>
            <Typography component="h1" variant="subtitle1">
              Recover Password
            </Typography>
            <Formik
              initialValues={values}
              validationSchema={forgotPasswordValidationSchema}
            >
              {(props) => <Form {...props} />}
            </Formik>
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
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  userAuth: state.userAuth,
});

const mapDispatchToProps = (dispatch) => ({
  forgotPassword: (data, user) => dispatch(forgotPassword(data, user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordView);
