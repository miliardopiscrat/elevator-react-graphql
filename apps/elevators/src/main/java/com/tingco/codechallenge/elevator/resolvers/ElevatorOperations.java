package com.tingco.codechallenge.elevator.resolvers;

import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import com.tingco.codechallenge.elevator.data.ElevatorData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * Created by milia on 29.09.2019.
 */
@Component
public class ElevatorOperations implements GraphQLMutationResolver {
  @Autowired
  private ElevatorData elevatorData;

  public boolean moveElevator(int elevatorId, int floor) {
    return elevatorData.moveElevator(elevatorId, floor);
  }
}
