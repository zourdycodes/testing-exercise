import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@material-ui/core';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { theme } from '../theme';

import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SwrWrapper } from '../components/swr/SwrWrapper';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // remove the server-side injected css.
    const jssStyles = document.querySelector('#jss-server-side');

    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Multi-Step Form</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <AppBar position="fixed">
          <Toolbar variant="dense">
            <Typography variant="h6">Multi-Step Form</Typography>
          </Toolbar>
        </AppBar>

        <CssBaseline />

        <Container>
          <SwrWrapper>
            <Box marginTop={10}>
              <Component {...pageProps} />;
            </Box>
          </SwrWrapper>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default MyApp;
