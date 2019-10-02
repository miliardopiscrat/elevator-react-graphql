package com.tingco.codechallenge.elevator.entities;

import com.tingco.codechallenge.elevator.api.Direction;
import com.tingco.codechallenge.elevator.api.Elevator;

/**
 * Created by milia on 25.09.2019.
 */
public class ElevatorStatus implements Elevator {
  private final int id;
  private Direction direction = Direction.NONE;
  private int currentFloor = 0;
  private int addressedFloor = 0;
  private boolean isBusy = false;

  public ElevatorStatus(int id) {
    this.id = id;
  }

  @Override
  public Direction getDirection() {
    return direction;
  }

  @Override
  public int getAddressedFloor() {
    return addressedFloor;
  }

  @Override
  public int getId() {
    return id;
  }

  @Override
  public void moveElevator(int toFloor) {
    addressedFloor = toFloor;
  }

  @Override
  public boolean isBusy() {
    return isBusy;
  }

  @Override
  public int currentFloor() {
    return currentFloor;
  }

  public void setDirection(Direction direction) {
    this.direction = direction;
  }

  public void setCurrentFloor(int currentFloor) {
    this.currentFloor = currentFloor;
  }

  public void setBusy(boolean busy) {
    isBusy = busy;
  }
}
