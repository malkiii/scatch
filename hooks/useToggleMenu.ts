import { useEffect, useRef, useState } from 'react';

export const useToggleMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  function toggle() {
    setIsOpen(!isOpen);
  }

  const handleClickOutside = (event: MouseEvent) => {
    const menuContainer = menuRef.current;
    if (!menuContainer) return;

    const clickOnTheMenu = menuContainer.contains(event.target as Node);
    if (!clickOnTheMenu) setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return { isOpen, menuRef, toggle };
};
