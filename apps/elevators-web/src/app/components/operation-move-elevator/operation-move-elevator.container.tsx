import React, { FC, useCallback, useEffect } from 'react';
import { OperationMoveElevatorView } from './operation-move-elevator.view';
import Spin from 'antd/lib/spin';
import { useMutation, useQuery } from '@apollo/react-hooks';
import {
  getElevatorBusy,
  GetElevatorBusyType,
  GetElevatorBusyVariables
} from '../../core/graph-tags/get-elevator-busy.client';
import {
  MoveElevatorToFloorDocument,
  MoveElevatorToFloorMutation,
  MoveElevatorToFloorMutationVariables
} from '@elevators/elevators-api';
import { showFloorChangeErrorNotification } from '../../core/notifications/show-floor-change-error.notification';

interface PropsType {
  elevatorId: number;
}

export const OperationMoveElevatorContainer: FC<PropsType> = ({ elevatorId }) => {
  const { data, loading, error } =
    useQuery<GetElevatorBusyType, GetElevatorBusyVariables>(getElevatorBusy, {
      variables: { id: elevatorId },
      pollInterval: 100
    });
  const [moveElevator, response] =
    useMutation<MoveElevatorToFloorMutation, MoveElevatorToFloorMutationVariables>(MoveElevatorToFloorDocument);

  const onChange = useCallback( async (value: number) => {

    return await moveElevator({ variables: { floor: value, id: elevatorId } });
  }, [elevatorId, moveElevator]);

  useEffect(() => {
    if(!!response.data && !response.data.moveElevator) {
      showFloorChangeErrorNotification();
    }

  }, [response.data, data]);

  if (error) return <div>{error.message}</div>;
  if (!data || loading) return <Spin tip="Loading..."/>;
  const { getElevatorBusy: { isBusy, currentFloor } } = data;

  return <OperationMoveElevatorView isBusy={isBusy} currentFloor={currentFloor}
                                    onChange={onChange}/>;
};
