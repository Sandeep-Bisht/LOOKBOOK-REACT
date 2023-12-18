import { useEffect } from "react";
import { useToasts } from "react-toast-notifications";

const ToastNotification = ({ content, appearance, autoDismiss, placement }) => {
  const { addToast } = useToasts();

  useEffect(() => {
    addToast(content, {
      appearance: appearance || "success",
      autoDismiss: autoDismiss || true,
      placement: "bottom-right"
    });
  }, [addToast, content, appearance, autoDismiss, placement]);

  return null;
};

export default ToastNotification;
