import React, { ReactNode } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, InputLabel, Input } from "@material-ui/core";
// @material-ui/icons
import { Clear, Check } from "@material-ui/icons";
// core components
import styles from "../../assets/jss/material-dashboard-react/components/customInputStyle";

const useStyles = makeStyles(styles);

type Props = {
  id?: string;
  labelText?: ReactNode;
  error?: boolean;
  errorMessage?: string;
  success?: boolean;
  formControlProps?;
  labelProps?;
  inputProps?;
};

const CustomInput: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { formControlProps, labelText, id, labelProps, inputProps, error, errorMessage, success } = props;

  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error,
  });
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true,
  });
  const marginTop = classNames({
    [classes.marginTop]: labelText === undefined,
  });
  return (
    <FormControl {...formControlProps} className={formControlProps.className + " " + classes.formControl}>
      {labelText !== undefined ? (
        <InputLabel className={classes.labelRoot + labelClasses} htmlFor={id} {...labelProps}>
          {labelText}
        </InputLabel>
      ) : null}
      <Input
        classes={{
          root: marginTop,
          disabled: classes.disabled,
          underline: underlineClasses,
        }}
        id={id}
        {...inputProps}
      />
      {error ? (
        <Clear className={classes.feedback + " " + classes.labelRootError} />
      ) : success ? (
        <Check className={classes.feedback + " " + classes.labelRootSuccess} />
      ) : null}
      {errorMessage && <p className={classes.errors}>{errorMessage}</p>}
    </FormControl>
  );
};

export default CustomInput;

CustomInput.propTypes = {
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  success: PropTypes.bool,
};
