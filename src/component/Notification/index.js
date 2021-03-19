import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Notify({message}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert severity="success">{ message }</Alert>
    </div>
  );
}