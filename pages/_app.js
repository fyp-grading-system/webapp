import * as React from "react";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Guard from "../components/Guard";

function MyApp({ Component, pageProps, session }) {
  return (
    <SessionProvider session={session}>
      <Guard>
        <Component {...pageProps} />
      </Guard>
    </SessionProvider>
  );
}

export default MyApp;
