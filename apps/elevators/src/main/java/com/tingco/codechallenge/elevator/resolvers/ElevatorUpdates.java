package com.tingco.codechallenge.elevator.resolvers;

import com.coxautodev.graphql.tools.GraphQLSubscriptionResolver;
import com.tingco.codechallenge.elevator.api.Elevator;
import com.tingco.codechallenge.elevator.publishers.ElevatorPublisher;
import org.reactivestreams.Publisher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * Created by milia on 25.09.2019.
 */
@Component
class ElevatorUpdates implements GraphQLSubscriptionResolver {
  @Autowired
  private ElevatorPublisher elevatorPublisher;

  public Publisher<Elevator> elevator(int elevatorId) {
    return elevatorPublisher.getElevatorPublisher(elevatorId);
  }

}
