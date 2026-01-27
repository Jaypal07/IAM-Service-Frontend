import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Export utility modules
export * from './utils/error.utils';
export * from './utils/token.utils';
export * from './utils/validation.utils';
