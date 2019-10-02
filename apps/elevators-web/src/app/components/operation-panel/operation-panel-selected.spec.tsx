import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { OperationPanelSelected } from './operation-panel-selected';

describe('OperationPanelSelected', () => {
  afterEach(cleanup);

  it('should render successfully', () => {
    const { baseElement } = render(
      <MockedProvider addTypename={false} mocks={[]} resolvers={{}}>
        <OperationPanelSelected selectedElevatorId={12}/>
      </MockedProvider>);

    expect(baseElement).toBeTruthy();
  });
});
