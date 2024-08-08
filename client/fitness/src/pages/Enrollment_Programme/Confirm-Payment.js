import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';

export default function ConfirmPayment({open , setOpen , paylink , user_email , set_email}) {

 
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgreefn =()=>{

    navigate(paylink)
   
  }

  return (
    <React.Fragment>
    

      <Dialog
        
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Do you want to continue with the purchase ?"}
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
          You are about to purchase this course. Clicking "Proceed" will redirect you to the secure Stripe payment page to complete the transaction.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Disagree
          </Button>

          
        <Button autoFocus onClick={handleAgreefn}>
          Agree
        </Button>
    

        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
