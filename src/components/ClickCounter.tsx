'use client';

import { useState } from 'react';

export function ClickCounter() {
  const [count, setCount] = useState(0);

  return (
    <button
      onClick={() => setCount(count + 1)}
      className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
    >
      Clicked {count} times
    </button>
  );
}
