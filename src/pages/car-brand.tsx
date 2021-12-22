import React, { useState } from 'react';
import { CarBrand } from '../components/swr/CarBrand';

function CarBrandPage() {
  const [country, setCountry] = useState<'Germany' | 'France' | 'Italy'>(
    'Germany'
  );

  return (
    <>
      <h1>Car App</h1>
      <button onClick={() => setCountry('Germany')}>Germany</button>
      <button onClick={() => setCountry('France')}>France</button>
      <button onClick={() => setCountry('Italy')}>Italy</button>

      <CarBrand country={country} />
    </>
  );
}

export default CarBrandPage;
