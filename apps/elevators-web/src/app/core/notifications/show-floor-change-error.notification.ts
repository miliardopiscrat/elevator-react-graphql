import notification from 'antd/lib/notification';

export const showFloorChangeErrorNotification = (): void => {
  notification.open({
    message: 'Operation Elevator move',
    description:
      'Operation elevator move failed, probably elevator is busy.',
  });
};
