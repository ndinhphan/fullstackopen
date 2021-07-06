const SET_NOTIFICATION = "SET_NOTIFICATION";

export const notificationSet = (notification, time) => ({
  type: SET_NOTIFICATION,
  data: notification,
});
