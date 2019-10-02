import React, { FC, useCallback, useEffect, useState } from 'react';
import Select from 'antd/lib/select';
import './operation-move-elevator.less';
import { MoveElevatorToFloorMutation } from '@elevators/elevators-api';
import { ExecutionResult } from 'graphql';
const { Option } = Select;
const floors = 6;

interface PropsType {
  isBusy: boolean;
  currentFloor: number;
  onChange: (value: number) => Promise<ExecutionResult<MoveElevatorToFloorMutation>>
}

export const OperationMoveElevatorView: FC<PropsType> = ({ isBusy, currentFloor, onChange }) => {
  const [operationRunning, setOperationRunning] = useState(isBusy);
  const changeFloor = useCallback(async (floor: number) => {
    setOperationRunning(true);
    await onChange(floor);
  }, [onChange]);

  useEffect(() => {
    setOperationRunning(isBusy);
  }, [isBusy]);

  return <div className='select-group'>
    <span>Change floor</span>
    <Select defaultValue={currentFloor} style={{ width: 120 }} onChange={changeFloor} loading={isBusy} disabled={operationRunning}>
      {[...Array(floors).keys()]
        .map((floor) =>
          <Option value={floor} key={floor}>{floor}</Option>
        )}
    </Select>
  </div>;
};
