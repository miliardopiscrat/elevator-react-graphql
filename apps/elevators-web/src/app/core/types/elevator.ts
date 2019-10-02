import { TypeOf } from './type-of';
import { GetElevatorsQuery } from '@elevators/elevators-api';
import { TypeFromArray } from './type-from-array';

export type ElevatorMonitorElement = TypeFromArray<TypeOf<GetElevatorsQuery, 'elevators'>>;
