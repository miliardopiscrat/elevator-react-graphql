package com.tingco.codechallenge.elevator.data;

import com.tingco.codechallenge.elevator.api.Direction;
import com.tingco.codechallenge.elevator.api.Elevator;
import com.tingco.codechallenge.elevator.entities.ElevatorStatus;
import com.tingco.codechallenge.elevator.repository.ElevatorMockRepository;
import io.reactivex.Observable;
import io.reactivex.subjects.PublishSubject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.concurrent.TimeUnit;
import java.util.function.Function;

/**
 * Created by milia on 29.09.2019.
 */
@Service
public class ElevatorData {
  private ElevatorMockRepository elevatorMockRepository;
  private PublishSubject<MoveToFloreOperation> elevatorMoveToFloorSubject[];
  private Observable<Elevator> elevatorChangeFloorSubject[];

  public ElevatorData(@Autowired ElevatorMockRepository elevatorMockRepository) {
    this.elevatorMockRepository = elevatorMockRepository;

    elevatorMoveToFloorSubject = new PublishSubject[this.elevatorMockRepository.getNumberOfElevators()];
    elevatorChangeFloorSubject = new Observable[this.elevatorMockRepository.getNumberOfElevators()];
    Arrays.setAll(elevatorMoveToFloorSubject, i -> PublishSubject.create());
    Arrays.setAll(elevatorChangeFloorSubject, i -> createElevatorMoveObservable(elevatorMoveToFloorSubject[i]));
  }

  public Observable<Elevator>[] getElevatorChangeFloorObservables() {
    return elevatorChangeFloorSubject;
  }

  public boolean moveElevator(int elevatorId, int floor) {
    Elevator elevator = this.elevatorMockRepository.getElevator(elevatorId);
    if (elevator== null || elevator.isBusy()) return false;


    elevatorMoveToFloorSubject[elevatorId].onNext(new MoveToFloreOperation(floor, elevator));
    return true;
  }

  private Elevator createBusyElevator(int id, int currentFloor, int addressFloor, Direction direction) {
    ElevatorStatus elevator = new ElevatorStatus(id);
    elevator.setBusy(true);
    elevator.setCurrentFloor(currentFloor);
    elevator.setDirection(direction);
    elevator.moveElevator(addressFloor);

    return elevator;
  }

  private Observable<Elevator> createElevatorMoveObservable(Observable<MoveToFloreOperation> emitter) {
    return emitter
      .filter(moveToFloreOperation -> !moveToFloreOperation.getElevator().isBusy())
      .flatMap(moveData ->
        createMoveAction(
          moveData.getElevator().getId(),
          moveData.getFloor(),
          moveData.getElevator().currentFloor())
      );
  }


  private Observable<Elevator> createMoveAction(int elevatorId, int floor, int elevatorPosition) {
    final Direction direction = elevatorPosition < floor ? Direction.UP : Direction.DOWN;
    final Function<Integer, Integer> operation = direction == Direction.UP ? integer -> integer + 1 : integer -> integer - 1;
    int idleTick = 1;

    return expand(elevatorPosition, operation)
      .map(position -> createBusyElevator(elevatorId, position, floor, direction))
      .take(Math.abs(elevatorPosition - floor) + idleTick)
      .concatWith(Observable.just(createIdleElevator(elevatorId, floor)).delay(1000, TimeUnit.MILLISECONDS))
      .doOnEach(elevatorNotification -> {
        if (elevatorNotification.getValue() != null)
          this.elevatorMockRepository.upateElevator(elevatorNotification.getValue());
      });
  }

  private Elevator createIdleElevator(int id, int currentFloor) {
    ElevatorStatus elevator = new ElevatorStatus(id);
    elevator.setBusy(false);
    elevator.setCurrentFloor(currentFloor);
    elevator.setDirection(Direction.NONE);
    elevator.moveElevator(currentFloor);

    return elevator;
  }

  private static <T> Observable<T> expand(
    final T initialValue, final Function<T, T> expandFunc) {
    return Observable.just(initialValue)
      .delay(1000, TimeUnit.MILLISECONDS)
      .concatWith(Observable.defer(() -> expand(expandFunc.apply(initialValue), expandFunc)));
  }
}
