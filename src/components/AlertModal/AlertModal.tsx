import { forwardRef } from "react";

/**
 * Imports Material UI components
 */
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";

/**
 * Imports the component styles
 */
import { useStyles } from "./AlertModal.styles";

/**
 * Defines the props interface
 */
export interface AlertModalProps {
  title: string;
  content: string;
  open: boolean;
  onClose: () => void;
  agree: () => void;
}

/**
 * Handles the modal's transition
 */
const Transition = forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/**
 * Displays the component
 */
const AlertModal: React.FC<AlertModalProps> = (props) => {
  const { title, content, open, onClose, agree } = props;

  /**
   * Gets the component styles
   */
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      className={classes.AlertModal}
    >
      <DialogTitle id="alert-dialog-slide-title" className={classes.text}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-slide-description"
          className={classes.text}
        >
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} className={classes.disagreeBtn}>
          Disagree
        </Button>
        <Button onClick={agree} className={classes.agreeBtn}>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertModal;
