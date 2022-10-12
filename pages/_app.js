import "../styles/globals.css";
import "../styles/invoice.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Manipal Admin Panel</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
