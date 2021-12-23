import React, { FC, ReactElement } from 'react';
import {
  render,
  RenderOptions,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { setupServer } from 'msw/node';
import { DefaultRequestBody, rest } from 'msw';
import { SwrWrapper } from './SwrWrapper';
import { CarBrand } from './CarBrand';

const server = setupServer(
  rest.get<DefaultRequestBody & string[]>(
    '/api/cars/france',
    (req, res, ctx) => {
      return res(
        ctx.delay(100),
        ctx.json([`Custom France B1`, `Custom France B2`])
      );
    }
  ),

  rest.get<DefaultRequestBody & string[]>(
    '/api/cars/germany',
    (req, res, ctx) => {
      return res(
        ctx.delay(100),
        ctx.json([`Custom Germany B1`, `Custom Germany B2`])
      );
    }
  ),

  rest.get<DefaultRequestBody, { message: string }>(
    '/api/cars/italy',
    (req, res, ctx) => {
      return res(
        ctx.delay(100),
        ctx.status(500),
        ctx.json({ message: 'Unit test message' })
      );
    }
  )

  // rest.get<DefaultRequestBody, string[]>(
  //   '/api/cars/:country',
  //   (req, res, ctx) => {
  //     return res(
  //       ctx.delay(100),
  //       ctx.json([`${req.params.country} xB1`, `${req.params.country} B2`])
  //     );
  //   }
  // )
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('Car Brands Component test', () => {
  describe('when "France" is selected', () => {
    beforeEach(async () => {
      customRender(<CarBrand country="France" />);

      await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));
    });

    it('renders "Car Brands from France"', () => {
      const element = screen.getByText('Car Brands from France');
      expect(element).toBeInTheDocument();
    });

    it('renders the expected brands', () => {
      expect(screen.getByText('Custom France B1')).toBeInTheDocument();
      expect(screen.getByText('Custom France B2')).toBeInTheDocument();
    });
  });

  describe('when "Germany" is selected', () => {
    beforeEach(async () => {
      customRender(<CarBrand country="Germany" />);
      await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));
    });

    it('renders "Car Brands from Germany"', () => {
      const element = screen.getByText('Car Brands from Germany');
      expect(element).toBeInTheDocument();
    });

    it('renders the expected brands', () => {
      expect(screen.getByText('Custom Germany B1')).toBeInTheDocument();
      expect(screen.getByText('Custom Germany B2')).toBeInTheDocument();
    });
  });

  describe('when italy is selected', () => {
    beforeEach(async () => {
      customRender(<CarBrand country="Italy" />);
      await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));
    });

    it('should render "Car rands from Italy" perfectly', () => {
      const element = screen.getByText('Car Brands from Italy');
      expect(element).toBeInTheDocument();
    });

    it('should expected error message', () => {
      expect(screen.getByText('Unit test message')).toBeInTheDocument();
    });
  });

  describe('when there is no value returned', () => {
    beforeEach(async () => {
      server.use(
        rest.get<DefaultRequestBody & string[]>(
          '/api/cars/france',
          (req, res, ctx) => {
            return res(ctx.delay(100), ctx.json([]));
          }
        )
      );

      customRender(<CarBrand country="France" />);
      await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));
    });

    it('show expected no data message', () => {
      expect(screen.getByText('No Data to Show')).toBeInTheDocument();
    });
  });
});

const AllTheProviders: FC = ({ children }) => {
  return (
    <SwrWrapper swrConfig={{ dedupingInterval: 0, provider: () => new Map() }}>
      {children}
    </SwrWrapper>
  );
};

function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  render(ui, { wrapper: AllTheProviders, ...options });
}
