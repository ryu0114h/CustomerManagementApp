import React, { ReactNode } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Grid, { GridSize } from "@material-ui/core/Grid";

const styles = {
  grid: {
    padding: "0 15px !important",
  },
};

const useStyles = makeStyles(styles);

type Props = {
  children: ReactNode;
  xs?: GridSize | boolean;
  sm?: GridSize | boolean;
  md?: GridSize | boolean;
};

const GridItem: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { children, ...rest } = props;
  return (
    <Grid item {...rest} className={classes.grid}>
      {children}
    </Grid>
  );
};

export default GridItem;

GridItem.propTypes = {
  children: PropTypes.node,
};
