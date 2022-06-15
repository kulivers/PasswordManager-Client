import {TextField, Typography} from "@material-ui/core";
import {Skeleton} from "@mui/material";
import {useState} from "react";

export const Field = ({isLoading, data, setEditMode}) => {
    return (<Typography onDoubleClick={() => {
        setEditMode(true)
    }}>{isLoading ? <Skeleton/> : data}</Typography>)
}

export const EditableField = ({isLoading, data}) => {
    const [isEditMode, setEditMode] = useState(false);
    return (<>{isEditMode ? <TextField data={data} isLoading={isLoading}/> :
        <Field setEditMode={setEditMode} data={data} isLoading={isLoading}/>}</>)
}