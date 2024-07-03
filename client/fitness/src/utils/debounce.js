import { useEffect, useState } from "react";

export const useDebouncedValue = (inputValue, delay) => {
    const [debouncedValue, setDebouncedValue] = useState('');
  
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(inputValue);
      }, delay);
  
      return () => {
        clearTimeout(handler);
      };
    }, [inputValue, delay]);
  
    return debouncedValue;
  };