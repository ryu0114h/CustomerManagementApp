import React, { ReactNode } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

// core components
import styles from "../../assets/jss/material-dashboard-react/components/cardBodyStyle";

const useStyles = makeStyles(styles);

type Props = {
  children?: ReactNode;
  plain?: boolean;
  profile?: boolean;
};

const CardBody: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { children, plain, profile, ...rest } = props;
  const cardBodyClasses = classNames({
    [classes.cardBody]: true,
    [classes.cardBodyPlain]: plain,
    [classes.cardBodyProfile]: profile,
  });
  return (
    <div className={cardBodyClasses} {...rest}>
      {children}
    </div>
  );
};

export default CardBody;

CardBody.propTypes = {
  plain: PropTypes.bool,
  profile: PropTypes.bool,
  children: PropTypes.node,
};
