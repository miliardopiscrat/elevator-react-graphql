import React, { FC } from 'react';
import { ElevatorContainer } from '../elevator/elevator.container';
import { ElevatorMonitorElement } from '../../core/types/elevator';
import './elevators.view.less';
interface PropsType {
  elevators: ElevatorMonitorElement[];
}

export const ElevatorsView: FC<PropsType> = ({ elevators }) => {
  return <div className='elevators-container'>
    {elevators.map((elevator) =>
      <ElevatorContainer
        key={elevator.id}
        elevator={elevator}
      />)}
  </div>;
};

