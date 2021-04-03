import React, { ReactNode } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

// core components
import styles from "../../assets/jss/material-dashboard-react/components/cardStyle";

const useStyles = makeStyles(styles);

type Props = {
  children?: ReactNode;
  plain?: boolean;
  profile?: boolean;
  chart?: boolean;
};

const Card: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { children, plain, profile, chart, ...rest } = props;
  const cardClasses = classNames({
    [classes.card]: true,
    [classes.cardPlain]: plain,
    [classes.cardProfile]: profile,
    [classes.cardChart]: chart,
  });
  return (
    <div className={cardClasses} {...rest}>
      {children}
    </div>
  );
};

export default Card;

Card.propTypes = {
  plain: PropTypes.bool,
  profile: PropTypes.bool,
  chart: PropTypes.bool,
  children: PropTypes.node,
};
