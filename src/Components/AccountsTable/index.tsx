import EditableTable from './EditableTable';
import fieldsArr from './fields';
import './styles.css';

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
    <div className="App">
      <h1>Accounts</h1>
      <EditableTable
        initWithoutHead
        defaultData={defaultData}
        getData={getData}
        fieldsArr={fieldsArr}
        tableName="accounts"
      />
    </div>
  );
}

