import React, { memo } from 'react';
import Icon from 'antd/lib/icon';
import { OperationPanelView } from './operation-panel.view';
import './operation-panel-no-selection.less';

export const OperationPanelNoSelection = memo(() => {

  return <OperationPanelView>
    <div className='selection-message'>
      <Icon title="Information" type='info-circle' style={{ fontSize: '2em', color: '#3b79c0' }}/>
      <span>Please select Elevator!</span>
    </div>
  </OperationPanelView>;
});
