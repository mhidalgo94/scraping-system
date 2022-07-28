import {Alert} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Slide, { SlideProps } from '@mui/material/Slide';

function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="up" />;
  }

function NotificationSnackBars({text,open,variant="filled",vertical="bottom",horizontal="center",...rest}) {
    return (
        <Snackbar TransitionComponent={SlideTransition} sx={{ width: '100%' }} spacing={2} open={open} autoHideDuration={6000} anchorOrigin={{vertical, horizontal}}>
          <Alert {...rest} variant={variant}>
            {text}
          </Alert>
        </Snackbar>
      );
}


export default NotificationSnackBars;