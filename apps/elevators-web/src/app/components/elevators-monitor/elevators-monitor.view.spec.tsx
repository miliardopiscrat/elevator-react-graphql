import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/react-testing';
import { ElevatorsMonitorView } from './elevators-monitor.view';
import { ElevatorMonitorElement } from '../../core/types/elevator';
import { Direction, MonitorElevatorDocument } from '@elevators/elevators-api';

describe('ElevatorsMonitorView', () => {
  afterEach(cleanup);

  it('should render successfully', () => {
    const { baseElement } = render(
      <MockedProvider addTypename={false} mocks={[]} resolvers={{}}>
        <ElevatorsMonitorView elevators={[]} isLoading={false}/>
      </MockedProvider>);

    expect(baseElement).toBeTruthy();
  });

  it('should render loading page', () => {
    const { getByText } = render(
      <MockedProvider addTypename={false} mocks={[]} resolvers={{}}>
        <ElevatorsMonitorView elevators={[]} isLoading={true}/>
      </MockedProvider>);

    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('should render elevator', () => {
    const subscription: MockedResponse = {
      request: {
        query: MonitorElevatorDocument,
        variables: {id: 12}
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
      <MockedProvider addTypename={false} mocks={[subscription]} resolvers={{}}>
        <ElevatorsMonitorView elevators={[{id: 12} as ElevatorMonitorElement]} isLoading={false}/>
      </MockedProvider>);

    expect(getByTestId('elevator')).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { container } = render(<MockedProvider addTypename={false} mocks={[]} resolvers={{}}>
        <ElevatorsMonitorView elevators={[]} isLoading={false}/>
      </MockedProvider>);
    expect(container.innerHTML).toMatchSnapshot();
  });
});
