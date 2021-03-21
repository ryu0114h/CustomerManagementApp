import React, { ReactNode } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components

import styles from "../../assets/jss/material-dashboard-react/components/cardAvatarStyle";

const useStyles = makeStyles(styles);

type Props = {
  children?: ReactNode;
  plain?: boolean;
  profile?: boolean;
};

const CardAvatar: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { children, plain, profile, ...rest } = props;
  const cardAvatarClasses = classNames({
    [classes.cardAvatar]: true,
    [classes.cardAvatarProfile]: profile,
    [classes.cardAvatarPlain]: plain,
  });
  return (
    <div className={cardAvatarClasses} {...rest}>
      {children}
    </div>
  );
};

export default CardAvatar;

CardAvatar.propTypes = {
  children: PropTypes.node.isRequired,
  profile: PropTypes.bool,
  plain: PropTypes.bool,
};
