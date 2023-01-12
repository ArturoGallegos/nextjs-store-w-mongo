import { CssBaseline, ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';
import 'styles/global.sass';
import lightTheme from './../layout/themes/light-theme';
import SwrConfig from './../services/swrConfig';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SwrConfig>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </SwrConfig>
  );
}
