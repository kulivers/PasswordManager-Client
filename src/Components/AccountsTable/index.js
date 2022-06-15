import React from "react";
import EditableTable from "./EditableTable";
import fieldsArr from "./fields";
import "./styles.css";

const defaultData = [
    {
        name: "Yash",
        age: "23",
        relationShip: "haqSeSingle"
    }
];
export default function AccountsTable() {
    const getData = row => {
        console.log(row, "rows data");
    };
    return (
        <div className="App">
            <h1>Accounts</h1>
            <EditableTable
                initWithoutHead
                defaultData={defaultData}
                getData={getData}
                fieldsArr={fieldsArr}
            />
        </div>
    );
}


