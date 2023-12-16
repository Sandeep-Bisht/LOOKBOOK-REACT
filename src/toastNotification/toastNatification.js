import { useEffect } from "react";
import { useToasts } from "react-toast-notifications";

const ToastNotification = ({ content, appearance, autoDismiss }) => {
  const { addToast } = useToasts();

  useEffect(() => {
    addToast(content, {
      appearance: appearance || "success",
      autoDismiss: autoDismiss || true,
      placement: "bottom-right"
    });
  }, []);

  return null;
};

export default ToastNotification;
