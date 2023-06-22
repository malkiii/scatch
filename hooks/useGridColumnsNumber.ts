import { useEffect, useRef, useState } from 'react';

export const useGridColumnsNumber = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [columnsNumber, setColumnsNumber] = useState<number>(0);

  function updateColumnsNumber() {
    const container = containerRef.current;
    if (container) {
      const containerStyle = window.getComputedStyle(container);
      const gridLayoutColumns = containerStyle.gridTemplateColumns.split(' ').length;
      setColumnsNumber(gridLayoutColumns > 3 ? 3 : gridLayoutColumns);
    }
  }

  useEffect(() => {
    updateColumnsNumber();
    window.addEventListener('resize', updateColumnsNumber);
    return () => {
      window.removeEventListener('resize', updateColumnsNumber);
    };
  }, []);

  return { containerRef, columnsNumber };
};
