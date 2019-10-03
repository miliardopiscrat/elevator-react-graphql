package com.tingco.codechallenge.elevator.data;

import com.tingco.codechallenge.elevator.api.Elevator;

/**
 * Created by milia on 30.09.2019.
 */
public class MoveToFloreOperation {
  private final int floor;
  private final Elevator elevator;

  public MoveToFloreOperation(int floor, Elevator elevator) {
    this.floor = floor;
    this.elevator = elevator;
  }

  public int getFloor() {
    return floor;
  }

  public Elevator getElevator() {
    return elevator;
  }
}
