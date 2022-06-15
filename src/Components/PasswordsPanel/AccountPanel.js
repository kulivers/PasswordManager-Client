import {Button, Container, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Skeleton} from "@mui/material";
import {useState} from "react";
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const useStyles = makeStyles((theme) => ({
    container: {
        flexGrow: 1, border: 'solid green 1px'
    },
    gridContainer: {
        flexGrow: 1, border: 'solid red 1px'
    },
    name: {
        flexGrow: 1, border: 'solid red 1px'
    },
    url: {
        flexGrow: 1, border: 'solid red 1px'
    },
    email: {
        flexGrow: 1, border: 'solid red 1px'
    },
    login: {
        flexGrow: 1, border: 'solid red 1px'
    },
    password: {
        flexGrow: 1, border: 'solid red 1px'
    },
    lastEditDate: {
        flexGrow: 1, border: 'solid red 1px'
    },
    edit: {
        flexGrow: 1, border: 'solid red 1px',
        width: 'auto'
    },
    delete: {
        flexGrow: 1, border: 'solid red 1px'
    },
    item: {
        flexGrow: 1, border: 'solid blue 1px'
    }
}));
const Refs = () => {
    return (<div>
        <div>https://mui.com/material-ui/react-floating-action-button/</div>
        <div>delete edit</div>
        <div>https://mui.com/material-ui/react-text-field/ - txt fields</div>
        <div>https://mui.com/material-ui/react-text-field/ - txt fields</div>
        <div>https://mui.com/material-ui/react-tooltip/ - подсказки</div>
        <div>https://mui.com/material-ui/react-alert/ - alerts</div>
        <div>
            https://mui.com/material-ui/react-snackbar/ - алерты(вроде такие проще
            делать){" "}
        </div>
        <div>
            https://mui.com/material-ui/react-backdrop/ - фул экран загрузки
        </div>
        <div>https://mui.com/material-ui/react-progress/ - кружочек загрузик</div>
        <div>
            https://mui.com/material-ui/react-dialog/ - диалоги подтверждения{" "}
        </div>
        <div>https://mui.com/material-ui/react-skeleton/ - скелетоны</div>
        <div>https://mui.com/material-ui/react-link/ - links</div>
        <div>https://mui.com/material-ui/react-stepper/ - stepper(?)</div>
        <div>https://mui.com/material-ui/react-tabs/ - tabs(?)</div>
    </div>);
}

const Field = ({isLoading, data}) => {
    return (<Typography>{isLoading ? <Skeleton/> : data}</Typography>)
}

const mock = {
    "name": 'Vk',
    'url': 'Vk.com',
    'login': 'kulivers',
    'email': 'kulivers@mail.ru',
    'password': 'somepasadqw132131e1e1',
    'lastEdit': new Date('2021-12-17T03:24:00'),
}
const mock2 = {
    "name": 'some very very very very long name',
    'url': 'some very very very very long url',
    'login': 'some very very very very long kulivers',
    'email': 'some very very very very long kulivers@mail.ru',
    'password': 'some very very very very long somepasadqw132131e1e1',
    'lastEdit': new Date('2021-12-17T03:24:00'),
}

export const AccountPanel = () => {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({});
    return (
        <div>
            <button onClick={() => {
                setIsLoading(!isLoading)
                setData(mock)
            }}>stop loading
            </button>
            <button onClick={() => {
                setData(mock2)
            }}>set sec mock
            </button>
            <Container className={classes.container}>
                <Field isLoading={isLoading} data={data.email}/>
                <Grid container className={classes.gridContainer}>
                    <Grid item className={classes.name}>
                        <Typography>{isLoading ? <Skeleton/> : data.name}</Typography>
                    </Grid>
                    <Grid item className={classes.url}>
                        <Typography>{isLoading ? <Skeleton/> : data.url}</Typography>
                    </Grid>
                    <Grid item className={classes.email}>
                        <Typography>{isLoading ? <Skeleton/> : data.email}</Typography>
                    </Grid>
                    <Grid item className={classes.login}>
                        <Typography>{isLoading ? <Skeleton/> : data.login}</Typography>
                    </Grid>
                    <Grid item className={classes.password}>
                        <Typography>{isLoading ? <Skeleton/> : data.password}</Typography>
                    </Grid>
                    <Grid item className={classes.lastEditDate}>
                        <Typography>{isLoading ? <Skeleton/> : data.lastEdit.toString()}</Typography>
                    </Grid>
                    <Grid item className={classes.edit}>
                        <Button variant="contained" color='primary' startIcon={<EditIcon fontSize="inherit"/>}>
                            Edit
                        </Button>
                    </Grid>
                    <Grid item className={classes.delete}>
                        <Button variant="outlined" color='secondary' startIcon={<DeleteIcon fontSize="inherit"/>}>
                            Delete
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </div>)
};
