import React, { useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { EditableField } from './Fields';

interface DataType {
  name: string;
  url: string;
  login: string;
  email: string;
  password: string;
  lastEdit: Date;
}

const mock: DataType = {
  name: 'Vk',
  url: 'Vk.com',
  login: 'kulivers',
  email: 'kulivers@mail.ru',
  password: 'somepasadqw132131e1e1',
  lastEdit: new Date('2021-12-17T03:24:00'),
};

const mock2: DataType = {
  name: 'some very very very very long name',
  url: 'some very very very very long url',
  login: 'some very very very very long kulivers',
  email: 'some very very very very long kulivers@mail.ru',
  password: 'some very very very very long somepasadqw132131e1e1',
  lastEdit: new Date('2021-12-17T03:24:00'),
};

const MyTableHead: React.FC = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell key={1}>Name</TableCell>
        <TableCell key={2}>Url</TableCell>
        <TableCell key={3}>Login</TableCell>
        <TableCell key={4}>Password</TableCell>
        <TableCell key={5}>Email</TableCell>
        <TableCell key={6}> </TableCell>
      </TableRow>
    </TableHead>
  );
};

interface MyTableBodyProps {
  isLoading: boolean;
  data: Partial<DataType>;
}

const MyTableBody: React.FC<MyTableBodyProps> = ({ isLoading, data }) => {
  return (
    <TableBody>
      <TableRow>
        <TableCell>
          <EditableField isLoading={isLoading} data={data.name || ''} />
        </TableCell>
        <TableCell>
          <EditableField isLoading={isLoading} data={data.url || ''} />
        </TableCell>
        <TableCell>
          <EditableField isLoading={isLoading} data={data.login || ''} />
        </TableCell>
        <TableCell>
          <EditableField isLoading={isLoading} data={data.password || ''} />
        </TableCell>
        <TableCell>
          <EditableField isLoading={isLoading} data={data.email || ''} />
        </TableCell>
        <TableCell>
          <LoadingButton
            loading={isLoading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="outlined"
          >
            Save
          </LoadingButton>
          <Button>Delete</Button>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

const MyAccountsTable: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Partial<DataType>>({});

  return (
    <>
      <button
        onClick={() => {
          setData(mock);
          setIsLoading(!isLoading);
        }}
      >
        isLoading: {isLoading.toString()}
      </button>
      <button
        onClick={() => {
          setData(mock2);
        }}
      >
        set long names
      </button>

      <Table>
        <MyTableHead />
        <MyTableBody isLoading={isLoading} data={data} />
      </Table>
    </>
  );
};

export default MyAccountsTable;

