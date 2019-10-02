import { cleanup } from '@testing-library/react';
import notification from 'antd/lib/notification';
import { showFloorChangeSuccessNotification } from './show-floor-change-success.notification';

jest.mock('antd/lib/notification');
describe('showFloorChangeSuccessNotification', () => {
  afterEach(cleanup);

  it('should call notification service', () => {
    showFloorChangeSuccessNotification(12);

    expect(notification.open).toBeCalledWith({
      description: 'Operation elevator move finished for elevator: 12',
      message: 'Operation Elevator move'
    });
  });
});
