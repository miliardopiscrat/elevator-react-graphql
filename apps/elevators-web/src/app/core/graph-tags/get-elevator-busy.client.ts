import { gql } from 'apollo-boost';
import { Elevator } from '@elevators/elevators-api';

export const getElevatorBusy = gql`query GetElevatorBusy($id: Int!) {
    getElevatorBusy(id: $id) @client
}`;

export type GetElevatorBusyType = {
  getElevatorBusy: Pick<Elevator, 'currentFloor' | 'isBusy'>
}

export type GetElevatorBusyVariables = {
  id: number;
}
