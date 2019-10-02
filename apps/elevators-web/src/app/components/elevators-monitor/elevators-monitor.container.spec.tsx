import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { MockedProvider, MockedResponse, wait } from '@apollo/react-testing';
import { ElevatorsMonitorContainer } from './elevators-monitor.container';
import { Direction, GetElevatorsDocument, MonitorElevatorDocument } from '@elevators/elevators-api';
import { GraphQLError } from 'graphql';
import { ElevatorMonitorElement } from '../../core/types/elevator';

describe('ElevatorsMonitorContainer', () => {
  afterEach(cleanup);

  it('should render successfully', () => {
    const { baseElement } = render(
      <MockedProvider addTypename={false} mocks={[]} resolvers={{}}>
        <ElevatorsMonitorContainer/>
      </MockedProvider>);

    expect(baseElement).toBeTruthy();
  });

  it('should render error', async () => {
    const errorQuery: MockedResponse = {
      request: {
        query: GetElevatorsDocument,
        variables: {}
      },
      error: new GraphQLError('test error')
    };

    const { getByText } = render(
      <MockedProvider addTypename={false} mocks={[errorQuery]} resolvers={{}}>
        <ElevatorsMonitorContainer/>
      </MockedProvider>);

    await wait(0);
    expect(getByText('Network error: test error')).toBeInTheDocument();
  });

  it('should render elevator', async () => {
    const query: MockedResponse = {
      request: {
        query: GetElevatorsDocument,
        variables: {}
      },
      result: {
        data: {
          elevators: [{
            id: 12,
            addressedFloor: 12,
            isBusy: false,
            direction: Direction.Up,
            currentFloor: 12
          } as ElevatorMonitorElement]
        }
      }
    };

    const subscription: MockedResponse = {
      request: {
        query: MonitorElevatorDocument,
        variables: { id: 12 }
      },
      result: {
        data: {
          elevator: {
            id: 12,
            addressedFloor: 12,
            isBusy: false,
            direction: Direction.Up,
            currentFloor: 12
          } as ElevatorMonitorElement
        }
      }
    };

    const { getByTestId } = render(
      <MockedProvider addTypename={false} mocks={[query, subscription]} resolvers={{}}>
        <ElevatorsMonitorContainer/>
      </MockedProvider>);

    await wait(0);
    expect(getByTestId('elevator')).toBeInTheDocument();
  });
});
