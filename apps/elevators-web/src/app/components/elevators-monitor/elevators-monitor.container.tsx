import React, { FC } from 'react';
import { useGetElevatorsQuery } from '@elevators/elevators-api';
import { ElevatorsMonitorView } from './elevators-monitor.view';

export const ElevatorsMonitorContainer: FC = () => {
  const { loading, error, data } = useGetElevatorsQuery();

  if (error) return <p>{error.message}</p>;
  const elevators = data ? data.elevators : [];

  return <ElevatorsMonitorView isLoading={loading} elevators={elevators}/>;
};
