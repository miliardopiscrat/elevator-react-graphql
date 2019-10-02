import React from 'react';
import { render, cleanup } from '@testing-library/react';
import App from './app';
import { MockedProvider } from '@apollo/react-testing';

describe('App', () => {
  afterEach(cleanup);

  it('should render successfully', () => {
    const { baseElement } = render(
      <MockedProvider addTypename={false} mocks={[]} resolvers={{}}>
        <App/>
      </MockedProvider>);

    expect(baseElement).toBeTruthy();
  });

  it('should have a footer defined', () => {
    const { getByText } = render(
      <MockedProvider addTypename={false} mocks={[]} resolvers={{}}>
        <App/>
      </MockedProvider>
    );

    expect(getByText('Elevator monitor ©2019')).toBeTruthy();
  });
});
