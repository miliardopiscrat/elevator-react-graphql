import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { OperationPanelView } from './operation-panel.view';

describe('OperationPanelView', () => {
  afterEach(cleanup);

  it('should render successfully', () => {
    const { baseElement } = render(<OperationPanelView/>);

    expect(baseElement).toBeTruthy();
  });

  it('should render Card with title', () => {
    const { getByText } = render(<OperationPanelView/>);

    expect(getByText('Elevator operations')).toBeInTheDocument();
  });

  it('should match content', () => {
    const { container } = render(<OperationPanelView>TEST_CONTENT</OperationPanelView>);

    expect(container.innerHTML).toMatchSnapshot();
  });
});
