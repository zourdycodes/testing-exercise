import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';

import { Drawer } from '../example3/Drawer';
import { MockDrawer } from './MockDrawer';

jest.mock('../example3/Drawer');
mocked(Drawer).mockImplementation(() => <div>mocked: drawer</div>);

describe('mocking drawer -> drawer component from example 3', () => {
  it('should render Drawer from example3', () => {
    render(<MockDrawer />);
    expect(
      screen.queryByText(/Hello Drawer Component/i)
    ).not.toBeInTheDocument();

    expect(screen.getByText('mocked: drawer')).toBeInTheDocument();
  });
});
