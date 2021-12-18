import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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
      expect(screen.getByText(/My Counter/i)).toBeInTheDocument();
    });

    describe('when the incrementor changes to 5 and "+" button is triggered', () => {
      beforeEach(() => {
        user.type(screen.getByLabelText(/incrementor/), '{selectall}5');
        user.click(screen.getByRole('button', { name: 'increment' }));
      });

      it('render "current count: 15"', () => {
        expect(screen.getByText('current count: 15')).toBeInTheDocument();
      });
    });

    describe('when the incrementor changes to 25 and "+" button is triggered', () => {
      beforeEach(() => {
        user.type(screen.getByLabelText(/incrementor/), '{selectall}25');
        user.click(screen.getByRole('button', { name: 'decrement' }));
      });

      it('render "current count: -15"', () => {
        expect(screen.getByText('current count: -15')).toBeInTheDocument();
      });
    });
  });

  describe('click counter functionality', () => {
    beforeEach(() => {
      render(<Counter defaultCount={0} description="My Counter" />);
    });

    describe('when "+" clicked', () => {
      beforeEach(() => {
        fireEvent.click(screen.getByRole('button', { name: 'increment' }));
      });

      it('render "current count = 1", clicked button (increase)', () => {
        expect(screen.getByText('current count: 1')).toBeInTheDocument();
      });
    });

    describe('when "-" clicked', () => {
      beforeEach(() => {
        fireEvent.click(screen.getByRole('button', { name: 'decrement' }));
      });

      it('render "current count = -1", clicked button (decrease)', () => {
        expect(screen.getByText('current count: -1')).toBeInTheDocument();
      });
    });
  });
});
