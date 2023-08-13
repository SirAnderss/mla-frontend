'use client';

import { useState, useEffect } from 'react';

/**
 *
 * @description This hook is used to get the current window size
 * @returns Object {width: number | undefined, height: number | undefined}
 */
export function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState<{
    width: number | undefined;
    height: number | undefined;
  }>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      const { width, height } = document.body.getBoundingClientRect();

      setWindowSize({
        width,
        height,
      });
    }

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => {
      return window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
}
