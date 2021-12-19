import React, { useEffect, useState } from 'react';

interface IProps {
  description: string;
  defaultCount: number;
}

export const Counter: React.FC<IProps> = ({ description, defaultCount }) => {
  const [count, setCount] = useState(defaultCount);
  const [incrementor, setIncrementor] = useState(1);
  const [bigEnough, setBigEnough] = useState(defaultCount >= 15);

  useEffect(() => {
    let id: NodeJS.Timeout;

    if (count >= 15) {
      id = setTimeout(() => setBigEnough(true), 300);
    }

    return function cleanup() {
      clearTimeout(id);
    };
  });

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
          onChange={({ target }) => setIncrementor(+target.value ?? 1)}
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
        onClick={() =>
          setTimeout(() => setCount((count) => count + incrementor), 300)
        }
      >
        +
      </button>
      {bigEnough ? null : <div>i am too small</div>}
    </div>
  );
};
