import { useEffect, useRef, useCallback } from "react";

type Timer = ReturnType<typeof setTimeout>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SomeFunction = (...args: any[]) => void;

/**
 * A debounce hook that delays the execution of a function until after a specified delay
 * after the last time it was invoked.
 *
 * @param callback The function to debounce.
 * @param delay The number of milliseconds to delay.
 * @returns The debounced function.
 */

export const useDebounce = <Func extends SomeFunction>(
  callback: Func,
  delay: number
) => {
  const timeoutRef = useRef<Timer>();

  useEffect(() => {
    // Cleanup the previous timeout on re-render
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const debouncedCallback = useCallback(
    (...args: Parameters<Func>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  return debouncedCallback;
};
