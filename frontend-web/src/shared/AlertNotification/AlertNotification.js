import { store } from "react-notifications-component";

const showNotification = (title, message, type, time) => {
  store.addNotification({
    title,
    message,
    type,
    insert: "bottom",
    container: "bottom-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
      duration: time,
      onScreen: true,
    },
  });
};

export const showAlertNotification = (
  title = null,
  message,
  type = "info",
  time = 3000
) => showNotification(title, message, type, time);
