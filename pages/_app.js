import "../styles/globals.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { Fragment, useEffect } from "react";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      offset: 50,
      delay: 100,
    });
  });
  return (
    <Fragment>
      <Head>
        <link rel="icon" href="/images/icon/fav.png" />
        <title>Sun Education</title>
      </Head>
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;
