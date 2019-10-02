import notification from 'antd/lib/notification';

export const showFloorChangeSuccessNotification = (elevatorId: number): void => {
  notification.open({
    message: 'Operation Elevator move',
    description:
      `Operation elevator move finished for elevator: ${elevatorId}`,
  });
};
