import React, { FC } from 'react';
import { ElevatorMonitorElement } from '../../core/types/elevator';
import Icon from 'antd/lib/icon';
import Statistic from 'antd/lib/statistic';

import { Direction } from '@elevators/elevators-api';
import './elevator.less';
import classNames from 'classnames';

interface PropsType {
  elevator: ElevatorMonitorElement;
  isSelected: boolean;
  onClick: () => void
}

const statisticStyle: Record<Direction, { type: string; color: string; }> = {
  [Direction.Down]: { type: 'arrow-down', color: '#cf1322' },
  [Direction.Up]: { type: 'arrow-up', color: '#cf1322' },
  [Direction.None]: { type: 'stop', color: '#72c11f' }
};

export const ElevatorView: FC<PropsType> = ({ elevator, isSelected, onClick }: PropsType) => {
  const { color, type } = statisticStyle[elevator.direction] || statisticStyle.NONE;

  return <div data-testid="elevator" className={classNames('elevator', { 'selected': isSelected })}
              onClick={onClick}>
    <div className='header'>
      <pre>Elevator no. {elevator.id}</pre>
    </div>
    <Statistic
      title="Floor"
      value={elevator.currentFloor}
      valueStyle={{ color }}
      prefix={<Icon type={type}/>}
      style={{ minWidth: '90px' }}
    />
  </div>;
};
