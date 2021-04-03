import React, { ReactNode } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

// core components
import styles from "../../assets/jss/material-dashboard-react/components/cardHeaderStyle";

const useStyles = makeStyles(styles);

type Props = {
  children?: ReactNode;
  color?: string;
  plain?: boolean;
  stats?: boolean;
  icon?: boolean;
};

const CardHeader: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { children, color, plain, stats, icon, ...rest } = props;
  const cardHeaderClasses = classNames({
    [classes.cardHeader]: true,
    [classes[color + "CardHeader"]]: color,
    [classes.cardHeaderPlain]: plain,
    [classes.cardHeaderStats]: stats,
    [classes.cardHeaderIcon]: icon,
  });
  return (
    <div className={cardHeaderClasses} {...rest}>
      {children}
    </div>
  );
};

export default CardHeader;

CardHeader.propTypes = {
  color: PropTypes.oneOf(["warning", "success", "danger", "info", "primary", "rose"]),
  plain: PropTypes.bool,
  stats: PropTypes.bool,
  icon: PropTypes.bool,
  children: PropTypes.node,
};
