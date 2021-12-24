import React from 'react';
import { MultiStepForm } from '../components/formik/Form';

function FormTestPage() {
  return (
    <div>
      <MultiStepForm
        onSubmit={(values) => {
          console.log('Form Submitted', values);
        }}
      />
    </div>
  );
}

export default FormTestPage;
