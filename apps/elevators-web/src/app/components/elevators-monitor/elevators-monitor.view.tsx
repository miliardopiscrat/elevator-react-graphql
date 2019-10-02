import React, { FC } from 'react';
import Card from 'antd/lib/card';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Skeleton from 'antd/lib/skeleton';
import Spin from 'antd/lib/spin';
import { ElevatorsView } from '../elevators/elevators.view';
import { ElevatorMonitorElement } from '../../core/types/elevator';

interface PropsType {
  isLoading: boolean;
  elevators: ElevatorMonitorElement[];
}

const pleaseWaitMessage = <Row style={{ height: '100%' }}><Col span={24}><Spin tip="Loading..."><Skeleton
  active/></Spin>
</Col></Row>;

export const ElevatorsMonitorView: FC<PropsType> = ({ isLoading, elevators }) => {

  if (isLoading) return pleaseWaitMessage;

  return  <Card title="Elevators" style={{textAlign: 'left'}}>
    <ElevatorsView elevators={elevators}/>
  </Card>;
};
