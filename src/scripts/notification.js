export const receive_noti = "";
export const send_noti = "";

export const receive_notification = (text) => {
  return {
      type: receive_noti,
      text
  };
};

export const send_notification = (text) => {
  return {
      type: send_noti,
      text
  };
};
