import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { OperationPanelContainer } from './operation-panel.container';

describe('OperationPanelContainer', () => {
  afterEach(cleanup);

  it('should render successfully', () => {
    const { baseElement } = render(
      <MockedProvider addTypename={false} mocks={[]} resolvers={{}}>
        <OperationPanelContainer/>
      </MockedProvider>);

    expect(baseElement).toBeTruthy();
  });

});
