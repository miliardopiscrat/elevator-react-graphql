import { changeSelectedElevator } from './change-selected-elevator';
import { DataProxy } from 'apollo-cache/src/types/DataProxy';

describe('changeSelectedElevator', () => {
  it('should write data to cache', () => {
    const mockCache = {
      writeData: jest.fn()
    } as Partial<DataProxy>;

    changeSelectedElevator({}, { id: 12 }, { cache: mockCache as DataProxy });

    expect(mockCache.writeData).toBeCalledWith({ data: { selectedElevatorId: 12 } });
  });
});
