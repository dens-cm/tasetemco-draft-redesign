import { toaster } from "../ui/toaster"

const Toast = () => {
  const showToast = ({ title, description, status }) => {
    toaster.create({
      title,
      description,
      type: status,
      duration: 3500
    })
  }

  return showToast
}

export default Toast