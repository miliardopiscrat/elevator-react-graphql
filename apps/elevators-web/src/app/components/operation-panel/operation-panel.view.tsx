import React, { FC, PropsWithChildren } from 'react';
import Card from 'antd/lib/card';

export const OperationPanelView: FC<PropsWithChildren<{}>> = ({ children }) => {
  return <Card title="Elevator operations">{children}</Card>;
};
