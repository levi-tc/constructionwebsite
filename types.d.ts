// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ReactNode } from 'react';  

declare module '@/components/ui/use-toast' {
  export const toast: (props: { title?: string; description?: string }) => void;
}