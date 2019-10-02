import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/react-testing';
import { ElevatorsView } from './elevators.view';
import { ElevatorMonitorElement } from '../../core/types/elevator';
import { Direction, MonitorElevatorDocument } from '@elevators/elevators-api';

describe('ElevatorsView', () => {
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
  it('should render successfully', () => {
    const { baseElement } = render(
      <MockedProvider addTypename={false} mocks={[elevatorMock]} resolvers={{}}>
        <ElevatorsView elevators={[{id: 12}] as ElevatorMonitorElement[]}/>
      </MockedProvider>
    );

    expect(baseElement).toBeTruthy();
  });

  it('should have rendered elevator tile', () => {
    const { getByTestId } = render(
      <MockedProvider addTypename={false} mocks={[elevatorMock]} resolvers={{}}>
        <ElevatorsView elevators={[{ id: 12 }] as ElevatorMonitorElement[]}/>
      </MockedProvider>
    );
    expect(getByTestId('elevator')).toBeInTheDocument();
  });
});
