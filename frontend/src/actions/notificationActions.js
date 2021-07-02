const SET_NOTIFICATION = 'SET_NOTIFICATION'

export const notificationSet = (notification,time) => {
  return {
    type: SET_NOTIFICATION,
    data: notification
  }
};