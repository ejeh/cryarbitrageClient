import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Formik } from "formik";
import { connect } from "react-redux";
import { refSignup } from "../../actions/action_auth";
import MysnackBar from "../SnackBar";
import Snackbar from "@material-ui/core/Snackbar";
import VpnKey from "@material-ui/icons/VpnKey";
import Email from "@material-ui/icons/Email";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { registrationValidationSchema } from "./ValidationSchema";
import { withStyles } from "@material-ui/core";
import modalStyle from "../../assets/jss/material-kit-react/components/modalStyle";
import Header from "../Header/Header";
import About from "../../views/LandingPage/Section/About";
import Footer from "../Footer/Footer";
import CircularProgress from "@material-ui/core/CircularProgress";

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
class RefReg extends React.Component {
  state = {
    ...initialState,
  };
  clearState = () => {
    this.setState({ ...initialState });
  };

  async componentDidMount() {
    console.log(this.props.location);
    const { search } = this.props.location;
    this.setState({
      refLink: search,
    });
  }
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
  render() {
    let {
      email,
      password,
      refLink,
      loading,
      snackBarMessage,
      snackBarOpen,
      snackBarVariant,
    } = this.state;
    const { classes } = this.props;
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
        refSignup(values, "user", refLink);
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
                    textAlign: "center",
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
              variant="outlined"
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
              variant="outlined"
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
              variant="outlined"
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
              variant="outlined"
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
              variant="outlined"
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
              style={{ backgroundColor: "#044277", color: "white" }}
              disabled={!isValid}
            >
              Signup
            </Button>
          </form>
        </div>
      );
    };
    return (
      <div>
        <Header color="customblue" />
        <Container
          component="main"
          maxWidth="md"
          style={{ marginBottom: "20px", marginTop: "104px" }}
        >
          <div className="button">
            <Typography>Register</Typography>
            <br />
            <Typography>Signup With Email</Typography>
          </div>

          <div className={classes.paper}>
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
        <About />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userAuth: state.userAuth,
});

const mapDispatchToProps = (dispatch) => ({
  refSignup: (data, user, refLink) => dispatch(refSignup(data, user, refLink)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(modalStyle)(RefReg));
