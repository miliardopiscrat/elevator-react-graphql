import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getSelectedElevatorGQL, SelectedElevatorIdType } from '../../core/graph-tags/get-selected-elevator.client';
import { OperationPanelNoSelection } from './operation-panel-no-selection.view';
import { OperationPanelSelected } from './operation-panel-selected';

export const OperationPanelContainer = () => {
  const { data } = useQuery<SelectedElevatorIdType>(getSelectedElevatorGQL);

  if (!data || data.selectedElevatorId === null) return <OperationPanelNoSelection/>;

  return <OperationPanelSelected selectedElevatorId={data.selectedElevatorId}/>;
};
