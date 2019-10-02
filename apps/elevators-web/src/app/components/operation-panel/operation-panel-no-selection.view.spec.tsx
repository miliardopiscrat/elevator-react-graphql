import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { OperationPanelNoSelection } from './operation-panel-no-selection.view';

describe('App', () => {
  afterEach(cleanup);

  it('should render successfully', () => {
    const { baseElement } = render(<OperationPanelNoSelection/>);

    expect(baseElement).toBeTruthy();
  });

  it('should render information message', () => {
    const { getByText } = render(<OperationPanelNoSelection/>);

    expect(getByText('Please select Elevator!')).toBeInTheDocument();
  });
});
