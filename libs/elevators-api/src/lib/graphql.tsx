import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  None = 'NONE'
}

export type Elevator = {
   __typename?: 'Elevator',
  id: Scalars['Int'],
  direction: Direction,
  isBusy: Scalars['Boolean'],
  currentFloor: Scalars['Int'],
  addressedFloor: Scalars['Int'],
};

export type Mutation = {
   __typename?: 'Mutation',
  moveElevator?: Maybe<Scalars['Boolean']>,
};


export type MutationMoveElevatorArgs = {
  id: Scalars['Int'],
  floor: Scalars['Int']
};

export type Query = {
   __typename?: 'Query',
  elevators: Array<Elevator>,
  elevator: Elevator,
};


export type QueryElevatorArgs = {
  id: Scalars['Int']
};

export type Subscription = {
   __typename?: 'Subscription',
  elevator: Elevator,
};


export type SubscriptionElevatorArgs = {
  id: Scalars['Int']
};
export type GetElevatorsQueryVariables = {};


export type GetElevatorsQuery = (
  { __typename?: 'Query' }
  & { elevators: Array<(
    { __typename?: 'Elevator' }
    & Pick<Elevator, 'id' | 'direction' | 'currentFloor' | 'addressedFloor' | 'isBusy'>
  )> }
);

export type MonitorElevatorSubscriptionVariables = {
  id: Scalars['Int']
};


export type MonitorElevatorSubscription = (
  { __typename?: 'Subscription' }
  & { elevator: (
    { __typename?: 'Elevator' }
    & Pick<Elevator, 'direction' | 'currentFloor' | 'addressedFloor' | 'isBusy' | 'id'>
  ) }
);

export type MoveElevatorToFloorMutationVariables = {
  id: Scalars['Int'],
  floor: Scalars['Int']
};


export type MoveElevatorToFloorMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'moveElevator'>
);

export const GetElevatorsDocument = gql`
    query GetElevators {
  elevators {
    id
    direction
    currentFloor
    addressedFloor
    isBusy
  }
}
    `;

    export function useGetElevatorsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetElevatorsQuery, GetElevatorsQueryVariables>) {
      return ApolloReactHooks.useQuery<GetElevatorsQuery, GetElevatorsQueryVariables>(GetElevatorsDocument, baseOptions);
    }
      export function useGetElevatorsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetElevatorsQuery, GetElevatorsQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<GetElevatorsQuery, GetElevatorsQueryVariables>(GetElevatorsDocument, baseOptions);
      }
      
export type GetElevatorsQueryHookResult = ReturnType<typeof useGetElevatorsQuery>;
export type GetElevatorsQueryResult = ApolloReactCommon.QueryResult<GetElevatorsQuery, GetElevatorsQueryVariables>;
export const MonitorElevatorDocument = gql`
    subscription MonitorElevator($id: Int!) {
  elevator(id: $id) {
    direction
    currentFloor
    addressedFloor
    isBusy
    id
  }
}
    `;

    export function useMonitorElevatorSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<MonitorElevatorSubscription, MonitorElevatorSubscriptionVariables>) {
      return ApolloReactHooks.useSubscription<MonitorElevatorSubscription, MonitorElevatorSubscriptionVariables>(MonitorElevatorDocument, baseOptions);
    }
export type MonitorElevatorSubscriptionHookResult = ReturnType<typeof useMonitorElevatorSubscription>;
export type MonitorElevatorSubscriptionResult = ApolloReactCommon.SubscriptionResult<MonitorElevatorSubscription>;
export const MoveElevatorToFloorDocument = gql`
    mutation MoveElevatorToFloor($id: Int!, $floor: Int!) {
  moveElevator(id: $id, floor: $floor)
}
    `;
export type MoveElevatorToFloorMutationFn = ApolloReactCommon.MutationFunction<MoveElevatorToFloorMutation, MoveElevatorToFloorMutationVariables>;

    export function useMoveElevatorToFloorMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MoveElevatorToFloorMutation, MoveElevatorToFloorMutationVariables>) {
      return ApolloReactHooks.useMutation<MoveElevatorToFloorMutation, MoveElevatorToFloorMutationVariables>(MoveElevatorToFloorDocument, baseOptions);
    }
export type MoveElevatorToFloorMutationHookResult = ReturnType<typeof useMoveElevatorToFloorMutation>;
export type MoveElevatorToFloorMutationResult = ApolloReactCommon.MutationResult<MoveElevatorToFloorMutation>;
export type MoveElevatorToFloorMutationOptions = ApolloReactCommon.BaseMutationOptions<MoveElevatorToFloorMutation, MoveElevatorToFloorMutationVariables>;