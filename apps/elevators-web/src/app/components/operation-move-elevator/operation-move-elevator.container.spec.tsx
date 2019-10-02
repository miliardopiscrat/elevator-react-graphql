import React from 'react';
import { cleanup, fireEvent, render, waitForElement } from '@testing-library/react';
import { MockedProvider, MockedResponse, wait } from '@apollo/react-testing';
import { OperationMoveElevatorContainer } from './operation-move-elevator.container';
import { MoveElevatorToFloorMutation, MoveElevatorToFloorMutationVariables } from '@elevators/elevators-api';
import {
  getElevatorBusy,
  GetElevatorBusyType,
  GetElevatorBusyVariables
} from '../../core/graph-tags/get-elevator-busy.client';
import { MutationTuple, useMutation, useQuery } from '@apollo/react-hooks';
import { QueryResult } from '@apollo/react-common';
import { ApolloError } from 'apollo-client';
import { showFloorChangeErrorNotification } from '../../core/notifications/show-floor-change-error.notification';
import Mock = jest.Mock;

jest.mock('@apollo/react-hooks');
jest.mock('../../core/notifications/show-floor-change-error.notification');
describe('OperationMoveElevatorContainer', () => {
  afterEach(cleanup);

  const getElevatorBusyQuery: MockedResponse = {
    request: {
      query: getElevatorBusy,
      variables: { id: 12 }
    },
    result: {
      data: {
        getElevatorBusy: {
          currentFloor: 0,
          isBusy: false
        }
      } as GetElevatorBusyType
    }
  };

  it('should render successfully', () => {
    const mockedQuery = useQuery as Mock<Partial<QueryResult<GetElevatorBusyType, GetElevatorBusyVariables>>, []>;
    const mockedUseMutation
      = useMutation as Mock<MutationTuple<MoveElevatorToFloorMutation, MoveElevatorToFloorMutationVariables>, []>;
    mockedUseMutation.mockImplementation(() => ([jest.fn(), { loading: false, called: true }]));
    mockedQuery.mockImplementation(() => ({}));

    const { baseElement } = render(
      <MockedProvider addTypename={false} mocks={[getElevatorBusyQuery]} resolvers={{}}>
        <OperationMoveElevatorContainer elevatorId={12}/>
      </MockedProvider>);

    expect(baseElement).toBeTruthy();
  });

  it('should render error message', () => {
    const mockedQuery = useQuery as Mock<Partial<QueryResult<GetElevatorBusyType, GetElevatorBusyVariables>>, []>;
    const mockedUseMutation
      = useMutation as  Mock<MutationTuple<MoveElevatorToFloorMutation, MoveElevatorToFloorMutationVariables>, []>;
    const mockMutationFunction = jest.fn();

    mockedUseMutation.mockImplementation(() => ([mockMutationFunction, { loading: false, called: true }]));
    mockedQuery.mockImplementation(() => ({
      error: new ApolloError({ errorMessage: 'Test error' })
    }));

    const { getByText } = render(
      <MockedProvider addTypename={false} mocks={[]} resolvers={{}}>
        <OperationMoveElevatorContainer elevatorId={12}/>
      </MockedProvider>);

    expect(getByText('Test error')).toBeInTheDocument();
  });

  it('should render loading message', () => {
    const mockedQuery = useQuery as Mock<Partial<QueryResult<GetElevatorBusyType, GetElevatorBusyVariables>>, []>;
    const mockedUseMutation
      = useMutation as Mock<MutationTuple<MoveElevatorToFloorMutation, MoveElevatorToFloorMutationVariables>, []>;
    const mockMutationFunction = jest.fn();

    mockedUseMutation.mockImplementation(() => ([mockMutationFunction, { loading: false, called: true }]));
    mockedQuery.mockImplementation(() => ({
      loading: true
    }));

    const { getByText } = render(
      <MockedProvider addTypename={false} mocks={[]} resolvers={{}}>
        <OperationMoveElevatorContainer elevatorId={12}/>
      </MockedProvider>);

    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('Should call mutation MoveElevatorToFloorDocument', async () => {
    const mockedQuery = useQuery as Mock<Partial<QueryResult<GetElevatorBusyType, GetElevatorBusyVariables>>, []>;
    const mockedUseMutation
      = useMutation as Mock<MutationTuple<MoveElevatorToFloorMutation, MoveElevatorToFloorMutationVariables>, []>;
    const mockMutationFunction = jest.fn();

    mockedQuery.mockImplementation(() => ({
      data: {
        getElevatorBusy: {
          isBusy: false,
          currentFloor: 0
        }
      }
    }));
    mockedUseMutation.mockImplementation(() => ([mockMutationFunction, { loading: false, called: true }]));

    const { getByText, container } = render(
      <MockedProvider addTypename={false} mocks={[]} resolvers={{}}>
        <OperationMoveElevatorContainer elevatorId={12}/>
      </MockedProvider>);

    await wait(0);
    const items = getByText('0');
    fireEvent.click(items);
    const option = await waitForElement(() => getByText('4'), { container });
    fireEvent.click(option);

    expect(mockMutationFunction).toBeCalledWith({
      variables: {
        id: 12,
        floor: 4
      } as MoveElevatorToFloorMutationVariables
    });
  });

  it('Should call error notification showFloorChangeErrorNotification', async () => {
    const mockedQuery = useQuery as Mock<Partial<QueryResult<GetElevatorBusyType, GetElevatorBusyVariables>>, []>;
    const mockedUseMutation
      = useMutation as Mock<MutationTuple<MoveElevatorToFloorMutation, MoveElevatorToFloorMutationVariables>, []>;
    const mockMutationFunction = jest.fn();
    mockedQuery.mockImplementation(() => ({
      data: {
        getElevatorBusy: {
          isBusy: false,
          currentFloor: 0
        }
      }
    }));
    mockedUseMutation.mockImplementation(() => ([mockMutationFunction, {
      loading: false,
      called: true,
      data: { moveElevator: false }
    }]));

    render(
      <MockedProvider addTypename={false} mocks={[]} resolvers={{}}>
        <OperationMoveElevatorContainer elevatorId={12}/>
      </MockedProvider>);

    expect(showFloorChangeErrorNotification).toBeCalled();
  });
});
