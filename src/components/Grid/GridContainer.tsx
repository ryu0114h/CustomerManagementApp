import React, { ReactNode } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const styles = {
  grid: {
    margin: "0 -15px !important",
    width: "unset",
  },
};

const useStyles = makeStyles(styles);

type Props = {
  children: ReactNode;
};

const GridContainer: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { children, ...rest } = props;
  return (
    <Grid container {...rest} className={classes.grid}>
      {children}
    </Grid>
  );
};

export default GridContainer;

GridContainer.propTypes = {
  children: PropTypes.node,
};
