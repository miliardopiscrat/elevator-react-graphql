import { gql } from 'apollo-boost';
import { GetElevatorBusyType, GetElevatorBusyVariables } from '../../graph-tags/get-elevator-busy.client';

export const getElevatorBusy = (root, variables: GetElevatorBusyVariables, { cache, getCacheKey }): GetElevatorBusyType => {
  const id = getCacheKey({ __typename: 'Elevator', id: variables.id });
  const fragment = gql`fragment busyInfo on Elevator {
      isBusy
      currentFloor
  }`;

  return cache.readFragment({ fragment, id });
};
