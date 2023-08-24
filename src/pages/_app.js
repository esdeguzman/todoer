import "@/styles/globals.css";
import React from "react";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Todoer - Making little accomplishments count</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
