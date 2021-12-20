import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';

export const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
];

export const rows = [
  { id: 1, lastName: 'XXXXXXWWWWW', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export interface DataGridProps {
  onMoney: (n: number) => void;
}

export const DataList: React.FC<DataGridProps> = ({ onMoney }) => {
  return (
    <div>
      <Button aria-label="give me money" onClick={() => onMoney(33)}>
        give me $33
      </Button>

      <div
        style={{
          height: 400,
          width: '100%',
        }}
      >
        <DataGrid
          columns={columns}
          rows={rows}
          pageSize={5}
          checkboxSelection
        />
      </div>
    </div>
  );
};
