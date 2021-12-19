import React from 'react';
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { Counter } from './Counter';
import user from '@testing-library/user-event';

describe('counter component testing', () => {
  describe('initialized with defaultCount=10 and description="My Counter', () => {
    beforeEach(() => {
      render(<Counter defaultCount={10} description="My Counter" />);
    });

    it('render "current count: 10"', () => {
      expect(screen.getByText('current count: 10')).toBeInTheDocument();
    });

    it('render title as "My Counter"', () => {
      expect(screen.getByText(/my counter/i)).toBeInTheDocument();
    });

    describe('when the incrementor changes to 5 and "+" button is clicked', () => {
      beforeEach(async () => {
        user.type(screen.getByLabelText(/incrementor/), '{selectall}5');
        user.click(screen.getByRole('button', { name: 'increment' }));
        await screen.findByText('current count: 15');
      });

      it('renders "Current Count: 15"', () => {
        expect(screen.getByText('current count: 15')).toBeInTheDocument();
      });

      // Documentation: https://testing-library.com/docs/guide-disappearance/#waiting-for-disappearance
      // eslint-disable-next-line jest/expect-expect
      it('"I am too small" disappears after 300ms', async () => {
        await waitForElementToBeRemoved(() =>
          screen.queryByText('i am too small')
        );
      });

      describe('when the incrementor changes to empty string and "+" button is clicked', () => {
        beforeEach(async () => {
          user.type(
            screen.getByLabelText(/incrementor/),
            '{selectall}{delete}'
          );
          user.click(screen.getByRole('button', { name: 'increment' }));
          await screen.findByText('current count: 15');
        });

        it('renders "Current Count: 15"', () => {
          expect(screen.getByText('current count: 15')).toBeInTheDocument();
        });
      });
    });

    describe('when the incrementor changes to 25 and "-" button is clicked', () => {
      beforeEach(() => {
        user.type(screen.getByLabelText(/incrementor/), '{selectall}25');
        user.click(screen.getByRole('button', { name: 'decrement' }));
      });

      it('renders "Current Count: -15"', () => {
        expect(screen.getByText('current count: -15')).toBeInTheDocument();
      });
    });
  });

  describe('initialized with defaultCount=0 and description="My Counter"', () => {
    beforeEach(() => {
      render(<Counter defaultCount={0} description="My Counter" />);
    });

    it('renders "Current Count: 0"', () => {
      expect(screen.getByText('current count: 0')).toBeInTheDocument();
    });

    it('renders title as "MyCounter"', () => {
      expect(screen.getByText(/my counter/i)).toBeInTheDocument();
    });

    describe('when - is clicked', () => {
      beforeEach(() => {
        user.click(screen.getByRole('button', { name: 'decrement' }));
      });

      it('renders "current count: 1"', () => {
        expect(screen.getByText('current count: -1')).toBeInTheDocument();
      });
    });

    describe('when + is clicked', () => {
      beforeEach(() => {
        user.click(screen.getByRole('button', { name: 'increment' }));
      });

      // eslint-disable-next-line jest/expect-expect
      it('renders "current count: 1"', async () => {
        await waitFor(() => {
          expect(screen.getByText('current count: 1')).toBeInTheDocument();
        });
      });
    });
  });
});
