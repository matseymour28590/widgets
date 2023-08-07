import React from 'react';
import fetchMock from 'fetch-mock-jest';
import {render, screen, waitFor} from '@testing-library/react';
import App from './App';

import { TextEncoder, TextDecoder } from 'util'
global.TextEncoder = TextEncoder
// @ts-expect-error
global.TextDecoder = TextDecoder


test('Renders a list', async () => {

  fetchMock.mock('http://localhost:8000/api/v1/widgets', {
    'status': 200,
    'body': [
      {"id": 2, "name": "baz", "manufacturer": "qux", "stock": 123456},
      ]
  });

  render(<App />);


  await waitFor(() => screen.getByText('baz'));
  await waitFor(() => screen.getByText('qux'));
  await waitFor(() => screen.getByText('123456'));
});
