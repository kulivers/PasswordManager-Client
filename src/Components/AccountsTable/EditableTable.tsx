import React, { useState, ChangeEvent } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  styled,
} from '@mui/material';

// Types
interface FieldOption {
  value: string;
  label: string;
}

interface Field {
  name: string;
  label: string;
  type?: string;
  selectMessage?: string;
  options?: FieldOption[];
  validation: (e: ChangeEvent<HTMLInputElement>, columnData?: string[]) => boolean;
  error: string;
}

interface RowData {
  [key: string]: string;
}

interface AllRowData {
  isEditing: boolean;
  rowData: RowData;
}

interface EditableTableProps {
  fieldsArr: Field[];
  tableName: string;
  addRowBtnText?: string;
  initWithoutHead?: boolean;
  defaultData?: RowData[];
  getData: (data: RowData[]) => void;
}

interface InputProps {
  name: string;
  error: string;
  validation: (e: ChangeEvent<HTMLInputElement>, columnData?: string[]) => boolean;
  childHasError: (hasError: boolean) => void;
  columnDataArr?: string[];
  value: string;
  tableName: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface SelectProps {
  name: string;
  value: string;
  selectMessage: string;
  options?: FieldOption[];
  tableName: string;
  onChange: (e: SelectChangeEvent<string>) => void;
}

interface EditableRowProps {
  fieldsArr: Field[];
  editData?: RowData;
  allRowsData?: AllRowData[];
  tableName: string;
  editingIndex?: number;
  isEditing?: boolean;
  handleSave: (row: RowData) => void;
  handleCancel: (index?: number) => void;
}

interface RowProps {
  data: RowData;
  handleEditRow: () => void;
  tableName: string;
  handleDeleteRow: () => void;
  isAdding: boolean;
  isEditing: boolean;
}

// Styled Components
const StyledInputWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const StyledInput = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const StyledError = styled('p')(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: '0.75rem',
  margin: theme.spacing(0.5, 0, 0, 0),
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: 120,
  marginBottom: theme.spacing(1),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0, 0.5),
}));

// Input Component
const Input: React.FC<InputProps> = ({
  name,
  error,
  validation,
  childHasError,
  columnDataArr = [],
  value,
  tableName,
  onChange,
}) => {
  const [hasError, setError] = useState(false);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isValid = validation(e, columnDataArr);
    if (!isValid) {
      childHasError(true);
      setError(true);
    } else {
      childHasError(false);
      setError(false);
    }
    onChange(e);
  };

  return (
    <StyledInputWrapper className={`inputWrapperDiv${tableName}`}>
      <StyledInput
        className={`input${tableName}`}
        name={name}
        value={value || ''}
        onChange={handleOnChange}
        size="small"
        variant="outlined"
        fullWidth
      />
      {hasError && (
        <StyledError className={`error${tableName}`}>{error}</StyledError>
      )}
    </StyledInputWrapper>
  );
};

// Select Component
const OurSelect: React.FC<SelectProps> = ({
  name,
  value,
  selectMessage,
  options = [],
  tableName,
  onChange,
}) => {
  return (
    <StyledFormControl
      className={`selectFormControl_${tableName}`}
      size="small"
      fullWidth
    >
      <InputLabel
        className={`selectInputLabel_${tableName}`}
        id={`${name}-label`}
      >
        {selectMessage}
      </InputLabel>
      <Select
        className={`select_${tableName}`}
        labelId={`${name}-label`}
        value={value || ''}
        onChange={onChange}
        label={selectMessage}
        inputProps={{ name, id: name }}
      >
        {options.map((item) => (
          <MenuItem
            className={`selectMenuItem_${tableName}`}
            key={item.value}
            value={item.value}
          >
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </StyledFormControl>
  );
};

// EditableRow Component
const EditableRow: React.FC<EditableRowProps> = ({
  fieldsArr,
  editData,
  allRowsData = [],
  tableName,
  editingIndex,
  isEditing,
  handleSave,
  handleCancel,
}) => {
  const initializeObj: RowData = {};
  fieldsArr.forEach((item) => {
    initializeObj[item.name] = '';
  });

  const [rowHasError, setRowHasError] = useState(false);
  const [rowData, setRowData] = useState<RowData>(
    editData ? { ...initializeObj, ...editData } : initializeObj
  );

  const handleSaveClick = () => {
    handleSave(rowData);
  };

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
  ) => {
    const updatedData = {
      ...rowData,
      [e.target.name]: e.target.value,
    };
    setRowData(updatedData);
  };

  const handleCancelClick = () => {
    if (isEditing && editingIndex !== undefined) {
      handleCancel(editingIndex);
    } else {
      handleCancel();
    }
  };

  return (
    <TableRow className={`tableBodyRow_${tableName}`}>
      {fieldsArr.map((item, i) => (
        <TableCell className={`tableBodyCell_${tableName}`} key={i}>
          {item.type === 'select' ? (
            <OurSelect
              tableName={tableName}
              name={item.name}
              onChange={handleOnChange as (e: SelectChangeEvent<string>) => void}
              options={item.options}
              value={rowData[item.name]}
              selectMessage={item.selectMessage || ''}
            />
          ) : (
            <Input
              columnDataArr={allRowsData.map((obj) => obj.rowData[item.name])}
              tableName={tableName}
              name={item.name}
              onChange={handleOnChange as (e: ChangeEvent<HTMLInputElement>) => void}
              value={rowData[item.name]}
              childHasError={(bool) => setRowHasError(bool)}
              error={item.error}
              validation={item.validation}
            />
          )}
        </TableCell>
      ))}
      <TableCell className={`tableBodyCell_${tableName}`}>
        <StyledButton
          className={`saveBtn${tableName}`}
          disabled={rowHasError}
          type="button"
          onClick={handleSaveClick}
          variant="contained"
          color="primary"
          size="small"
        >
          Save
        </StyledButton>
        <StyledButton
          className={`cancelBtn${tableName}`}
          onClick={handleCancelClick}
          variant="outlined"
          size="small"
        >
          Cancel
        </StyledButton>
      </TableCell>
    </TableRow>
  );
};

// Row Component
const Row: React.FC<RowProps> = ({
  data,
  handleEditRow,
  tableName,
  handleDeleteRow,
  isAdding,
  isEditing,
}) => {
  return (
    <TableRow className={`tableBodyRow_${tableName}`}>
      {Object.keys(data).map((key, index) => (
        <TableCell className={`tableBodyCell_${tableName}`} key={index}>
          {data[key]}
        </TableCell>
      ))}
      <TableCell className={`tableBodyCell_${tableName}`}>
        <StyledButton
          disabled={isAdding || isEditing}
          className={`editBtn_${tableName}`}
          onClick={handleEditRow}
          variant="outlined"
          color="primary"
          size="small"
        >
          Edit
        </StyledButton>
        <StyledButton
          disabled={isAdding || isEditing}
          className={`deleteBtn_${tableName}`}
          onClick={handleDeleteRow}
          variant="outlined"
          color="error"
          size="small"
        >
          Delete
        </StyledButton>
      </TableCell>
    </TableRow>
  );
};

// Main EditableTable Component
const EditableTable: React.FC<EditableTableProps> = ({
  fieldsArr,
  tableName,
  addRowBtnText,
  initWithoutHead,
  defaultData = [],
  getData,
}) => {
  const [allRowsData, setAllRowsData] = useState<AllRowData[]>(
    defaultData.map((item) => ({
      isEditing: false,
      rowData: item,
    }))
  );
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const setToParent = (data: AllRowData[]) => {
    const formattedData = data.map(({ rowData }) => rowData);
    getData(formattedData);
  };

  const handleSave = (row: RowData) => {
    if (isEditing && editingIndex !== null) {
      const arr = allRowsData.map((item, i) => {
        if (i === editingIndex) {
          return { isEditing: false, rowData: row };
        }
        return item;
      });
      setAllRowsData(arr);
      setEditingIndex(null);
      setIsEditing(false);
      setToParent(arr);
    } else {
      const newData = [...allRowsData, { isEditing: false, rowData: row }];
      setAllRowsData(newData);
      setIsAdding(false);
      setToParent(newData);
    }
  };

  const handleCancel = (index?: number) => {
    if (isEditing && index !== undefined) {
      const arr = allRowsData.map((item, i) => {
        if (i === index) {
          return { isEditing: false, rowData: item.rowData };
        }
        return item;
      });
      setAllRowsData(arr);
      setEditingIndex(null);
      setIsEditing(false);
    } else {
      setIsAdding(false);
    }
  };

  const handleDeleteRow = (index: number) => {
    const arr = allRowsData.filter((_item, i) => i !== index);
    setAllRowsData(arr);
    setToParent(arr);
  };

  const handleEditRow = (index: number) => {
    const arr = allRowsData.map((item, i) => {
      if (i === index) {
        return { isEditing: true, rowData: item.rowData };
      }
      return item;
    });
    setAllRowsData(arr);
    setEditingIndex(index);
    setIsEditing(true);
  };

  const headRow = [
    ...fieldsArr.map((item) => ({ label: item.label, name: item.name })),
    { label: 'Actions', name: 'actions' },
  ];

  const showHeader = !(initWithoutHead && !allRowsData.length && !isAdding);

  return (
    <>
      <Table className={`table_${tableName}`}>
        {showHeader && (
          <TableHead>
            <TableRow className={`tableHeadRow_${tableName}`}>
              {headRow.map(({ label, name }, i) => (
                <TableCell
                  className={`tableHeadCell_${tableName} tableHeadCell_${name}`}
                  key={i}
                >
                  {label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        )}
        <TableBody className={`tableBody_${tableName}`}>
          {allRowsData.length > 0 &&
            allRowsData.map(({ isEditing: rowIsEditing, rowData }, i) => {
              return rowIsEditing ? (
                <EditableRow
                  key={i}
                  tableName={tableName}
                  isEditing={rowIsEditing}
                  editingIndex={editingIndex || undefined}
                  allRowsData={allRowsData}
                  editData={rowData}
                  handleSave={handleSave}
                  handleCancel={handleCancel}
                  fieldsArr={fieldsArr}
                />
              ) : (
                <Row
                  key={i}
                  tableName={tableName}
                  isAdding={isAdding}
                  isEditing={isEditing}
                  handleEditRow={() => handleEditRow(i)}
                  handleDeleteRow={() => handleDeleteRow(i)}
                  data={rowData}
                />
              );
            })}
          {isAdding && (
            <EditableRow
              tableName={tableName}
              allRowsData={allRowsData}
              handleSave={handleSave}
              handleCancel={handleCancel}
              fieldsArr={fieldsArr}
            />
          )}
        </TableBody>
      </Table>
      <div>
        <StyledButton
          className={`addBtn_${tableName}`}
          disabled={isAdding || isEditing}
          onClick={() => setIsAdding(true)}
          variant="contained"
          color="primary"
        >
          {addRowBtnText || 'Add Row'}
        </StyledButton>
      </div>
    </>
  );
};

export default EditableTable;

