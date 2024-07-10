import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

export default function AlertDialog({userId , name , username , handleDelete}) 
{
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <> 
             <Button 
               onClick={handleClickOpen}fullWidth color='error'  variant='contained'  size='large' style={{fontSize:'12px',borderRadius:'12px'}} 
               startIcon={<DeleteIcon />}
              >
                   Delete
              </Button> 

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{borderRadius:'10px'}}
      >
        <DialogTitle id="alert-dialog-title" sx={{fontSize:'20px'}}>
          Confirmation for user deletion 
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{fontSize:'20px'}}>
           <p>Do you want to delete {name} username <span style={{fontWeight:'bolder'}}>{username}</span> from portal ?`</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>

          <Button onClick={()=>handleDelete(userId)} autoFocus>
            Agree
          </Button>

        </DialogActions>
      </Dialog>
    </>
  );
}
