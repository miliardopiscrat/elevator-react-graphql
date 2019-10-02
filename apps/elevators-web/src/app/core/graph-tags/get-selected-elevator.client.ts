import { gql } from 'apollo-boost';

export const getSelectedElevatorGQL = gql`{
        selectedElevatorId @client
    }
`;

export type SelectedElevatorIdType = {
  selectedElevatorId: number;
}
