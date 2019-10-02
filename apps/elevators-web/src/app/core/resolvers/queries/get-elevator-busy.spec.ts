import { getElevatorBusy } from './get-elevator-busy';
import { DataProxy } from 'apollo-cache/src/types/DataProxy';

describe('App', () => {

  it('should read fragment from cache', () => {
    const expectedReturnValue = 'test return value';
    const mockCache = {
      readFragment: jest.fn().mockReturnValueOnce(expectedReturnValue)
    } as Partial<DataProxy>;
    const getCacheKey = jest.fn().mockReturnValueOnce('test:12');

    const returnValue = getElevatorBusy({}, { id: 12 }, { cache: mockCache, getCacheKey });

    expect(mockCache.readFragment).toBeCalledWith({ fragment: expect.any(Object), id: 'test:12' });
    expect(returnValue).toEqual(expectedReturnValue);
  });
});
