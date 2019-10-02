import { DataProxy } from 'apollo-cache/src/types/DataProxy';
import { ChangeSelectionQueryVariables } from '../../graph-tags/change-selected-elevator.client';
import { SelectedElevatorIdType } from '../../graph-tags/get-selected-elevator.client';

export const changeSelectedElevator = (root, variables: ChangeSelectionQueryVariables, { cache }: { cache: DataProxy }): void => {
  cache.writeData({ data: { selectedElevatorId: variables.id } as SelectedElevatorIdType });
};
