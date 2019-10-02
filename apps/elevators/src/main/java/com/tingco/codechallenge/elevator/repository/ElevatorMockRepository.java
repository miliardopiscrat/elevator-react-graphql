package com.tingco.codechallenge.elevator.repository;

import com.tingco.codechallenge.elevator.api.Elevator;
import com.tingco.codechallenge.elevator.entities.ElevatorStatus;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

/**
 * Created by milia on 01.10.2019.
 */
@Repository
public class ElevatorMockRepository {

  @Value("${com.tingco.elevator.numberofelevators}")
  private int numberOfElevators;

  private Map<Integer, Elevator> elevators;

  @PostConstruct
  private void initMockData() {
    this.elevators = IntStream
      .range(0, this.numberOfElevators)
      .mapToObj(ElevatorStatus::new)
      .collect(Collectors.toMap(ElevatorStatus::getId, Function.identity()));
  }

  public List<Elevator> getElevators() {
    return new ArrayList<>(this.elevators.values());
  }

  public void upateElevator(Elevator elevator) {
    this.elevators.replace(elevator.getId(), elevator);
  }

  public int getNumberOfElevators() {
    return elevators.size();
  }

  public Elevator getElevator(int elevatorId) {
    return this.elevators.get(elevatorId);
  }
}
