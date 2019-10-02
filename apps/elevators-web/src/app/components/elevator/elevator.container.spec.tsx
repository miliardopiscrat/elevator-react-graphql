import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { MockedProvider, MockedResponse, wait } from '@apollo/react-testing';
import { ElevatorContainer } from './elevator.container';
import { ElevatorMonitorElement } from '../../core/types/elevator';
import { Direction, MonitorElevatorDocument } from '@elevators/elevators-api';
import { GraphQLError } from 'graphql';

describe('ElevatorContainer', () => {
  afterEach(cleanup);

  const elevatorMock: MockedResponse = {
    request: {
      query: MonitorElevatorDocument,
      variables: { id: 12 }
    },
    result: {
      data: {
        elevator: {
          id: 12,
          currentFloor: 10,
          direction: Direction.Up,
          isBusy: true,
          addressedFloor: 12
        } as ElevatorMonitorElement
      }
    }
  };

  it('should render', () => {
    const { baseElement } = render(
      <MockedProvider addTypename={false} mocks={[elevatorMock]} resolvers={{}}>
        <ElevatorContainer elevator={{ id: 12 } as ElevatorMonitorElement}/>
      </MockedProvider>);

    expect(baseElement).toBeTruthy();
  });

  it('should render elevator id', () => {
    const { getByText } = render(
      <MockedProvider addTypename={false} mocks={[elevatorMock]} resolvers={{}}>
        <ElevatorContainer elevator={{ id: 12 } as ElevatorMonitorElement}/>
      </MockedProvider>);

    const headerNode = getByText('Elevator no. 12');
    expect(headerNode).toBeInTheDocument();
  });

  it('should render error message', async  () => {
    const errorQuery : MockedResponse = {
      request: {
        query: MonitorElevatorDocument,
        variables: {id: 12}
      },
      error: new GraphQLError('test error')
    };

    const { getByText } = render(
      <MockedProvider addTypename={false} mocks={[errorQuery]} resolvers={{}}>
        <ElevatorContainer elevator={{ id: 12 } as ElevatorMonitorElement}/>
      </MockedProvider>);

    await wait(0);
    const headerNode = getByText('test error');
    expect(headerNode).toBeInTheDocument();
  });
});
