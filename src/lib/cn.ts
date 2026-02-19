// className 결합 유틸리티
// clsx로 조건부 클래스를 처리하고, tailwind-merge로 Tailwind 클래스 충돌을 해소한다.
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
