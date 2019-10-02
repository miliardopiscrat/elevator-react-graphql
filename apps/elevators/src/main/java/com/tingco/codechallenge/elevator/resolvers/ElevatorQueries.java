package com.tingco.codechallenge.elevator.resolvers;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import com.tingco.codechallenge.elevator.api.Elevator;
import com.tingco.codechallenge.elevator.repository.ElevatorMockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by milia on 25.09.2019.
 */
@Component
public class ElevatorQueries implements GraphQLQueryResolver {
  @Autowired
  ElevatorMockRepository elevatorMockRepository;

  public List<Elevator> elevators() {

    return elevatorMockRepository.getElevators();
  }

  public Elevator elevator(int id) {

    return elevatorMockRepository.getElevator(id);
  }
}
