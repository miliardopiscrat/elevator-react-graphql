import React from 'react';
import { cleanup, fireEvent, render, waitForElement } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { OperationMoveElevatorView } from './operation-move-elevator.view';

describe('OperationMoveElevatorView', () => {
  afterEach(cleanup);

  it('should render successfully', () => {
    const { baseElement } = render(
      <MockedProvider addTypename={false} mocks={[]} resolvers={{}}>
        <OperationMoveElevatorView currentFloor={0} isBusy={true} onChange={jest.fn()}/>
      </MockedProvider>);

    expect(baseElement).toBeTruthy();
  });

  it('should set selection to busy and disabled', () => {
    const { getByRole } = render(
      <MockedProvider addTypename={false} mocks={[]} resolvers={{}}>
        <OperationMoveElevatorView currentFloor={0} isBusy={true} onChange={jest.fn()}/>
      </MockedProvider>);

    const selectElement = getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
    expect(selectElement.parentElement.classList).toContain('ant-select-disabled');
    expect(selectElement.parentElement.classList).toContain('ant-select-loading');
  });

  it('should call onChange callback and disable select', async () => {
    const mockCallback = jest.fn().mockReturnValueOnce(Promise.resolve({}));
    const { getByText, container, getByRole } = render(
      <MockedProvider addTypename={false} mocks={[]} resolvers={{}}>
        <OperationMoveElevatorView currentFloor={0} isBusy={false} onChange={mockCallback}/>
      </MockedProvider>);

    const items = getByText('0');
    fireEvent.click(items);
    const option = await waitForElement(() => getByText('4'), { container });
    fireEvent.click(option);

    expect(mockCallback).toBeCalled();
    expect(getByRole('combobox').parentElement.classList).toContain('ant-select-disabled');
  });
});
