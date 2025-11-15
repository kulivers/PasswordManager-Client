import EditableTable from './EditableTable';
import fieldsArr from './fields';
import './styles.css';
import { Box, Typography } from '@mui/material';

interface RowData {
  [key: string]: string;
}

const defaultData: RowData[] = [
  {
    name: 'Yash',
    age: '23',
    relationShip: 'haqSeSingle',
  },
];

export default function AccountsTable() {
  const getData = (row: RowData[]) => {
    console.log(row, 'rows data');
  };

  return (
    <Box 
      className="App"
      sx={{
        padding: 4,
        backgroundColor: 'background.paper',
        borderRadius: 4,
        boxShadow: 2,
        margin: 3,
      }}
    >
      <Typography 
        variant="h4" 
        component="h1"
        sx={{
          mb: 3,
          fontWeight: 700,
          color: 'text.primary',
        }}
      >
        Accounts
      </Typography>
      <EditableTable
        initWithoutHead
        defaultData={defaultData}
        getData={getData}
        fieldsArr={fieldsArr}
        tableName="accounts"
      />
    </Box>
  );
}

