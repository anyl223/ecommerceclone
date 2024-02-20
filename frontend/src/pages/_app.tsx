import "@/styles/globals.css";
import type { AppProps } from "next/app";
import '@mantine/core/styles.css';
import { MantineProvider, createTheme } from "@mantine/core";
import 'bootstrap/dist/css/bootstrap.min.css';
import dynamic from "next/dynamic";

const Layout = dynamic(() => import("./../Layouts/layout"), {
  ssr: false,
});

const theme = createTheme({
});

export default function App({ Component, pageProps }: AppProps) {
  return (
  <MantineProvider theme={theme}>
    <Layout>
  <Component {...pageProps} />;
    </Layout>
  </MantineProvider>
  )
}
