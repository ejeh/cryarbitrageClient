import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";

// import { Hidden } from "@material-ui/core";
import footerStyle from "../../assets/jss/material-kit-react/components/footerStyle";
// import MegaFooter from "./MegaFooter";

class Footer extends React.Component {
  state = {};

  render() {
    const {
      classes,
      whiteFont,
      // topFooter,
      // shop,
      // categories,
      // vendor,
      greyBg,
      transparent,
      // color,
      fontColor,
      position,
    } = this.props;

    const footerClasses = classNames({
      [classes.footer]: true,
      [classes.footerWhiteFont]: whiteFont,
      [classes.footerGreyFont]: greyBg,
    });
    const aClasses = classNames({
      [classes.a]: true,
      [classes.footerWhiteFont]: whiteFont,
    });

    // const megaFooter =
    //   topFooter && vendor ? (
    //     <MegaFooter
    //       shop={shop}
    //       categories={categories}
    //       vendor={vendor}
    //       color={color}
    //     />
    //   ) : (
    //     ""
    //   );
    return (
      <div
        style={{
          backgroundColor: "#022a4e",
          position: position || "relative",
          verticalAlign: "bottom",
          width: "100%",
          bottom: 0,
        }}
      >
        {/* <Hidden xsDown>{megaFooter}</Hidden> */}
        <footer
          className={footerClasses}
          style={!transparent ? { backgroundColor: this.props.color } : null}
        >
          <div className={classes.container}>
            <div className={classes.left}>
              <List className={classes.list}>
                <ListItem className={classes.inlineBlock}>
                  <Link to="/policy" style={{ textDecoration: "none" }}>
                    <Button
                      simple="true"
                      size="small"
                      style={{ color: fontColor || "white" }}
                    >
                      Privacy Policy
                    </Button>
                  </Link>
                </ListItem>
                <ListItem className={classes.inlineBlock}>
                  <Link to="/terms" style={{ textDecoration: "none" }}>
                    <Button
                      simple="true"
                      size="small"
                      style={{ color: fontColor || "white" }}
                    >
                      Terms & Conditions
                    </Button>
                  </Link>
                </ListItem>
              </List>
            </div>
            <div className={classes.right}>
              <span style={{ color: "#eee" }}>
                &copy; {1900 + new Date().getYear()}
              </span>
              <Link to="/" className={aClasses}>
                <Button
                  simple="true"
                  size="small"
                  style={{ color: fontColor || "white" }}
                >
                  Crytoarbitrage Network
                </Button>
              </Link>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default withStyles(footerStyle)(Footer);
