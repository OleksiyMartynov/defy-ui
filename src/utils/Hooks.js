/* eslint-disable import/prefer-default-export */
/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect } from "react";

export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export function useLifecycle(onMount, onUnmount) {
  useEffect(() => {
    onMount();
    return onUnmount;
  }, []);
}
