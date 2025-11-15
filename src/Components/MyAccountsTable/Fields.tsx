import React, { useState } from 'react';
import { TextField, Typography, Skeleton } from '@mui/material';

interface FieldProps {
  isLoading: boolean;
  data: string;
  setEditMode: (value: boolean) => void;
}

interface EditableFieldProps {
  isLoading: boolean;
  data: string;
}

export const Field: React.FC<FieldProps> = ({ isLoading, data, setEditMode }) => {
  return (
    <Typography
      onDoubleClick={() => {
        setEditMode(true);
      }}
      sx={{ cursor: 'pointer' }}
    >
      {isLoading ? <Skeleton /> : data}
    </Typography>
  );
};

export const EditableField: React.FC<EditableFieldProps> = ({ isLoading, data }) => {
  const [isEditMode, setEditMode] = useState(false);

  return (
    <>
      {isEditMode ? (
        <TextField value={data} disabled={isLoading} size="small" fullWidth />
      ) : (
        <Field setEditMode={setEditMode} data={data} isLoading={isLoading} />
      )}
    </>
  );
};

