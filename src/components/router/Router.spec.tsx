import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMockRouter } from '../../utils/createMockRouter';
import { RouterContext } from 'next/dist/shared/lib/router-context';

import { BeautifulRouter } from './Router';

describe('router test: -> query, pathname, basePath', () => {
  it('render h1 --> Todo ID: 22', () => {
    render(
      <RouterContext.Provider value={createMockRouter({ query: { id: '22' } })}>
        <BeautifulRouter />
      </RouterContext.Provider>
    );

    expect(screen.getByText('Todo ID: 22')).toBeInTheDocument();
  });

  it('has an anchor taf with href=/contacts', () => {
    render(
      <RouterContext.Provider
        value={createMockRouter({ query: { id: '33' }, pathname: 'zourdy' })}
      >
        <BeautifulRouter />
      </RouterContext.Provider>
    );

    expect(screen.getByText(/contacts page/i)).toHaveAttribute(
      'href',
      '/contacts?id=33&from=zourdy'
    );
  });

  describe('when -some action- button is clicked', () => {
    it('calls router.push method with /contacts as its route link', () => {
      const router = createMockRouter({
        query: {
          id: '69',
        },
        pathname: 'zourdy',
        basePath: 'frosty',
      });

      render(
        <RouterContext.Provider value={router}>
          <BeautifulRouter />
        </RouterContext.Provider>
      );

      fireEvent.click(screen.getByRole('button', { name: /some action/i }));
      expect(router.push).toHaveBeenCalledWith(
        '/contacts?id=69&from=zourdy&something=frosty'
      );
    });
  });
});
