import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { ElevatorView } from './elevator.view';
import { ElevatorMonitorElement } from '../../core/types/elevator';
import { Direction } from '@elevators/elevators-api';

describe('ElevatorView', () => {
  afterEach(cleanup);

  it('should render successfully', () => {
    const { baseElement } = render(
      <MockedProvider addTypename={false} mocks={[]} resolvers={{}}>
        <ElevatorView onClick={() => null} isSelected={false} elevator={{} as ElevatorMonitorElement}/>
      </MockedProvider>);

    expect(baseElement).toBeTruthy();
  });

  it('should render with selected class', () => {
    const { getByTestId } = render(
      <MockedProvider addTypename={false} mocks={[]} resolvers={{}}>
        <ElevatorView onClick={() => null} isSelected={true} elevator={{} as ElevatorMonitorElement}/>
      </MockedProvider>);

    const elevatorNode = getByTestId('elevator');
    expect(elevatorNode.className).toContain('selected');
  });

  it('should call onClick', () => {
    const mockFunction = jest.fn();
    const { getByTestId } = render(
      <MockedProvider addTypename={false} mocks={[]} resolvers={{}}>
        <ElevatorView onClick={mockFunction} isSelected={true} elevator={{} as ElevatorMonitorElement}/>
      </MockedProvider>);

    const elevatorNode = getByTestId('elevator');
    elevatorNode.click();

    expect(mockFunction).toBeCalled();
  });

  it('should render elevator title', () => {
    const { getByText } = render(
        <ElevatorView onClick={() => null} isSelected={true} elevator={{id: 12} as ElevatorMonitorElement}/>
     );

    expect(getByText('Elevator no. 12')).toBeInTheDocument();
  });

  it('should render current floor', () => {
    const { getByText } = render(
      <MockedProvider addTypename={false} mocks={[]} resolvers={{}}>
        <ElevatorView onClick={() => null} isSelected={true} elevator={{currentFloor: 12} as ElevatorMonitorElement}/>
      </MockedProvider>);

    const elevatorStats = getByText('12');
    expect(elevatorStats.className).toContain('ant-statistic-content-value-int');
  });

  it('should render direction up', () => {
    const { container } = render(
      <MockedProvider addTypename={false} mocks={[]} resolvers={{}}>
        <ElevatorView onClick={() => null} isSelected={true} elevator={{direction: Direction.Up} as ElevatorMonitorElement}/>
      </MockedProvider>);

    const svgIcon = container.querySelector('[data-icon="arrow-up"]');

    expect(svgIcon).toBeTruthy();
    expect(svgIcon.tagName).toBe('svg');
  });

  it('should render direction down', () => {
    const { container } = render(
      <MockedProvider addTypename={false} mocks={[]} resolvers={{}}>
        <ElevatorView onClick={() => null} isSelected={true} elevator={{direction: Direction.Down} as ElevatorMonitorElement}/>
      </MockedProvider>);

    const svgIcon = container.querySelector('[data-icon="arrow-down"]');

    expect(svgIcon).toBeTruthy();
    expect(svgIcon.tagName).toBe('svg');
  });

  it('should render direction none', () => {
    const { container } = render(
      <MockedProvider addTypename={false} mocks={[]} resolvers={{}}>
        <ElevatorView onClick={() => null} isSelected={true} elevator={{direction: Direction.None} as ElevatorMonitorElement}/>
      </MockedProvider>);

    const svgIcon = container.querySelector('[data-icon="stop"]');

    expect(svgIcon).toBeTruthy();
    expect(svgIcon.tagName).toBe('svg');
  });
});
