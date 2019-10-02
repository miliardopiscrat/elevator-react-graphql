import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ElevatorMonitorElement } from '../../core/types/elevator';
import { useMonitorElevatorSubscription } from '@elevators/elevators-api';
import { ElevatorView } from './elevator.view';
import { showFloorChangeSuccessNotification } from '../../core/notifications/show-floor-change-success.notification';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { changeSelectedElevatorGQL } from '../../core/graph-tags/change-selected-elevator.client';
import { getSelectedElevatorGQL, SelectedElevatorIdType } from '../../core/graph-tags/get-selected-elevator.client';

type PropsType = {
  elevator: ElevatorMonitorElement;
};

export const ElevatorContainer = ({ elevator }: PropsType) => {
  const { data, error } =
    useMonitorElevatorSubscription({ variables: { id: elevator.id } });
  const [elevatorStatus, setStatus] = useState(elevator);
  const previousStatus = useRef<ElevatorMonitorElement>();
  const [changeSelection] = useMutation(changeSelectedElevatorGQL, { variables: { id: elevator.id } });
  const changeSelectionCallBack = useCallback(() => changeSelection(), [changeSelection]);
  const querySelection = useQuery<SelectedElevatorIdType, {}>(getSelectedElevatorGQL);

  useEffect(() => {
    previousStatus.current = elevatorStatus;
  }, [elevatorStatus]);
  useEffect(() => {
    if (data) setStatus(data.elevator); else setStatus(elevator);

    if (previousStatus.current && previousStatus.current.isBusy && !data.elevator.isBusy) {
      showFloorChangeSuccessNotification(elevator.id);
    }
  }, [data, elevator]);

  if (error) return <div>{error.message}</div>;

  return <ElevatorView elevator={elevatorStatus}
                       isSelected={querySelection.data && querySelection.data.selectedElevatorId === elevatorStatus.id}
                       onClick={changeSelectionCallBack}/>;
};
