import { gql } from 'apollo-boost';

export const changeSelectedElevatorGQL = gql`
  mutation ChangeSelection($id: Int!) {
      changeSelectedElevator(id: $id) @client
  }
`;

export type ChangeSelectionQueryVariables = {
  id: number;
}
