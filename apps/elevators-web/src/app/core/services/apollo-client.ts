import { WebSocketLink } from 'apollo-link-ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { createHttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import ApolloClient from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { changeSelectedElevator } from '../resolvers/mutations/change-selected-elevator';
import { getElevatorBusy } from '../resolvers/queries/get-elevator-busy';

export const createClient = (): ApolloClient<NormalizedCacheObject> => {
  const wsLink = new WebSocketLink(new SubscriptionClient(`ws://${window.location.hostname}:9000/subscriptions`, {
    reconnect: true
  }));

  const httpLink = createHttpLink({ uri: `http://${window.location.hostname}:9000/graphql` });

  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    wsLink,
    httpLink
  );

  return new ApolloClient({
    link: link,
    cache: new InMemoryCache(),
    resolvers: {
      Mutation: {
        changeSelectedElevator
      },
      Query: {
        getElevatorBusy
      }
    }
  });
};
