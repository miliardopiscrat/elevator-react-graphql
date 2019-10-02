import React, { FC } from 'react';
import { OperationPanelView } from './operation-panel.view';
import { OperationMoveElevatorContainer } from '../operation-move-elevator/operation-move-elevator.container';

interface PropsType {
  selectedElevatorId: number;
}

export const OperationPanelSelected: FC<PropsType> = ({selectedElevatorId}) => {

  return  <OperationPanelView>
    <OperationMoveElevatorContainer elevatorId={selectedElevatorId}/>
  </OperationPanelView>;
};
