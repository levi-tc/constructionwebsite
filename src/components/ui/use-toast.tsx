import { toast as sonnerToast } from "sonner"

type ToastProps = {
  title?: string
  description?: string
}

export const showToast = ({ title, description }: ToastProps) => {
  return sonnerToast(title, {
    description,
  })
}

