import React, { useState } from 'react';

interface IProps {
  description: string;
  defaultCount: number;
}

export const Counter: React.FC<IProps> = ({ description, defaultCount }) => {
  const [count, setCount] = useState(defaultCount);
  const [incrementor, setIncrementor] = useState(1);
  return (
    <div>
      <h2>
        DESC: {description} -- DC: {defaultCount}
      </h2>
      <label htmlFor="input-number">
        incrementor:
        <input
          type="number "
          id="input-number"
          value={incrementor}
          onChange={({ target }) => setIncrementor(+target.value)}
        />
      </label>
      <button
        aria-label="decrement"
        onClick={() => setCount((count) => count - incrementor)}
      >
        -
      </button>
      current count: {count}
      <button
        aria-label="increment"
        onClick={() => setCount((count) => count + incrementor)}
      >
        +
      </button>
    </div>
  );
};
