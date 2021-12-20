import React from 'react';
import { DataList } from '../components/mock-testing/example2/DataGrid';

function dataPage() {
  return (
    <div>
      <h1>sup dawg</h1>

      <DataList
        onMoney={(money) => {
          alert(`we send you $${money}`);
        }}
      />
    </div>
  );
}

export default dataPage;
