package com.tingco.codechallenge.elevator.publishers;

import com.tingco.codechallenge.elevator.api.Elevator;
import com.tingco.codechallenge.elevator.data.ElevatorData;
import io.reactivex.BackpressureStrategy;
import io.reactivex.Flowable;
import io.reactivex.Observable;
import io.reactivex.observables.ConnectableObservable;
import org.springframework.stereotype.Component;

import java.util.Arrays;

/**
 * Created by milia on 25.09.2019.
 */
@Component
public class ElevatorPublisher {
  private final Flowable<Elevator> publisher;

  public ElevatorPublisher(ElevatorData elevatorData) {
    Observable<Elevator> ElevatorsUpdateObservable = Observable.merge(Arrays.asList(elevatorData.getElevatorChangeFloorObservables()));

    ConnectableObservable<Elevator> connectableObservable = ElevatorsUpdateObservable.share().publish();
    connectableObservable.connect();

    publisher = connectableObservable.toFlowable(BackpressureStrategy.LATEST);
  }

  public Flowable<Elevator> getElevatorPublisher(final int elevatorId) {
    return publisher.filter(elevator -> elevator.getId() == elevatorId);
  }
}
