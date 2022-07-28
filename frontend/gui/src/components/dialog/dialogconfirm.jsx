import * as React from 'react';
import Button from '@mui/material/Button';
import CircularProgress from "@mui/material/CircularProgress";
import { blue } from "@mui/material/colors";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function DialogConfirm({open,setOpen,title,content,onAcept,loadingAcept,disabledAcept,setDisabledAcept,children,...rest}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = ()=>{
    setOpen(false)
    setDisabledAcept(false)
  }

  return (
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title" {...rest} >
        <DialogTitle id="responsive-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          {content || children}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button colir="info" size="medium" variant="contained" autoFocus onClick={onAcept} disabled={disabledAcept}>
            Acept
            {loadingAcept && (
                <CircularProgress
                  size={24}
                  sx={{
                    color: blue[500],
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
              )}
          </Button>
          <Button color="warning" size="medium" variant="contained" onClick={()=>setOpen(false)} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
  );
}
