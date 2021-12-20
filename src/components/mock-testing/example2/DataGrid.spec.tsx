import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import { DataGrid } from '@material-ui/data-grid';

import { DataList, rows } from './DataGrid';

jest.mock('@material-ui/data-grid', () => ({
  ...jest.requireActual('@material-ui/data-grid'),
  DataGrid: jest.fn(() => <div>Table</div>),
}));

const mockedDataGrid = mocked(DataGrid);

describe('testing data table component', () => {
  beforeEach(() => {
    mockedDataGrid.mockClear();
  });

  it('render material-ui TableGrid with column and row', () => {
    const onMoney = jest.fn();

    render(<DataList onMoney={onMoney} />);
    fireEvent.click(screen.getByRole('button', { name: /give me money/i }));
    expect(onMoney).toHaveBeenCalledTimes(1);
    expect(onMoney).toHaveBeenCalledWith(33);
  });

  it('render table passing the expected props', () => {
    render(<DataList onMoney={jest.fn()} />);

    expect(mockedDataGrid).toHaveBeenCalledTimes(1);
    expect(mockedDataGrid).toHaveBeenCalledWith(
      {
        rows: rows,
        columns: [
          expect.objectContaining({ field: 'id' }),
          expect.objectContaining({ field: 'firstName' }),
          expect.objectContaining({ field: 'lastName' }),
          expect.objectContaining({ field: 'age' }),
        ],
        pageSize: 5,
        checkboxSelection: true,
      },
      {}
    );
  });
});
