import { cleanup } from '@testing-library/react';
import notification from 'antd/lib/notification';
import { showFloorChangeErrorNotification } from './show-floor-change-error.notification';

jest.mock('antd/lib/notification');
describe('showFloorChangeErrorNotification', () => {
  afterEach(cleanup);

  it('should call notification service', () => {
    showFloorChangeErrorNotification();

    expect(notification.open).toBeCalled();
  });
});
