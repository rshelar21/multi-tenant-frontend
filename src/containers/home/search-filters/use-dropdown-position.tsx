import { RefObject } from 'react';

export const useDropdownPosition = (
  ref: RefObject<HTMLDivElement | null> | RefObject<HTMLDivElement>
) => {
  const getDropdownPosition = () => {
    if (!ref.current) return { top: 0, left: 0 };

    const react = ref.current.getBoundingClientRect();
    const dropdownWidth = 240;

    // calc initial position
    let left = react.left + window.scrollX;
    const top = react.bottom + window.scrollY;

    // check id dropdown would go off right edge of viewport
    if (left + dropdownWidth > window.innerWidth) {
      // align to right edge of button instead
      left = react.right + window.scrollX - dropdownWidth;

      // if still offscreen align to the right edge of viewport with some padding
      if (left < 0) {
        left = window.innerWidth - dropdownWidth - 16;
      }
    }

    // ensure dropdown doesnot go off left edge
    if (left < 0) {
      left = 16;
    }

    return { top, left };
  };

  return { getDropdownPosition };
};
