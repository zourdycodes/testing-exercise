import { Drawer as DrawerComponent } from './Drawer';
import { render, screen } from '@testing-library/react';

import user from '@testing-library/user-event';

jest.mock('@material-ui/core', () => ({
  ...jest.requireActual('@material-ui/core'),
  SwipeableDrawer: jest.fn(() => <div>HELLOOOOOO</div>),
}));

describe('Drawer Component', () => {
  it('should not render "hello youtube!"', () => {
    render(<DrawerComponent />);
    expect(screen.getByText(/HELLOOOOOO/i)).toBeInTheDocument();
  });

  it('should click on "open drawer" button and show the component', () => {
    render(<DrawerComponent />);
    user.click(screen.getByRole('button', { name: /open drawer/i }));

    user.keyboard('{escape}');
    expect(screen.getByText('HELLOOOOOO')).toBeInTheDocument();
  });
});
