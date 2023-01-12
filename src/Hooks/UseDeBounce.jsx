import { useEffect } from 'react';
import { useState } from 'react'

const UseDebounce = (value, delay) => {
  const [debouncedVal, seDebouncedVal] = useState();
  useEffect(() => {
    const handler = setTimeout(() => {
      seDebouncedVal(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return (
    debouncedVal
  )
}

export default UseDebounce