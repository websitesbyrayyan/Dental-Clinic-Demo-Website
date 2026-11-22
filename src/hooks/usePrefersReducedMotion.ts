import { useReducedMotion } from "framer-motion";

export function usePrefersReducedMotion(): boolean {
  const prefersReducedMotion = useReducedMotion();

  return prefersReducedMotion === true;
}