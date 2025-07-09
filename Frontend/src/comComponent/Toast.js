import React from "react";
import Toast from "react-native-root-toast";

const ToastMessage = ({
  logRedirect,
  message,
  position,
  setMessage,
  setRedirLogin,
  backColor,
}) => {
  return (
    <Toast
      visible={message ? true : false}
      duration={Toast.durations.LONG}
      backgroundColor={backColor}
      position={position}
      shadow={true}
      animation={true}
      hideOnPress={true}
      onShown={() => {
        setTimeout(function () {
          setMessage(null);
          if (!logRedirect) {
            setRedirLogin(true);
          }
        }, 4000);
      }}
      onHidden={() => {
        setMessage(null);
        if (logRedirect) {
          setRedirLogin(true);
        }
      }}
    >
      {message}
    </Toast>
  );
};

export default ToastMessage;
