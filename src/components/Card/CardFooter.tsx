import React, { ReactNode } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

// core components
import styles from "../../assets/jss/material-dashboard-react/components/cardFooterStyle";

const useStyles = makeStyles(styles);

type Props = {
  children?: ReactNode;
  plain?: boolean;
  profile?: boolean;
  stats?: boolean;
  chart?: boolean;
};

const CardFooter: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { children, plain, profile, stats, chart, ...rest } = props;
  const cardFooterClasses = classNames({
    [classes.cardFooter]: true,
    [classes.cardFooterPlain]: plain,
    [classes.cardFooterProfile]: profile,
    [classes.cardFooterStats]: stats,
    [classes.cardFooterChart]: chart,
  });
  return (
    <div className={cardFooterClasses} {...rest}>
      {children}
    </div>
  );
};

export default CardFooter;

CardFooter.propTypes = {
  plain: PropTypes.bool,
  profile: PropTypes.bool,
  stats: PropTypes.bool,
  chart: PropTypes.bool,
  children: PropTypes.node,
};
