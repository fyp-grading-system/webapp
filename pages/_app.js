import cookie from "cookie";
import * as React from "react";
import { SSRKeycloakProvider, SSRCookies } from "@react-keycloak/ssr";
import "../styles/globals.css"

const keycloakCfg = {
  realm: "",
  url: "",
  clientId: "",
};

function MyApp({ Component, pageProps, cookies }) {
  return (
    // <SSRKeycloakProvider
    //   keycloakConfig={keycloakCfg}
    //   persistor={SSRCookies(cookies)}
    // >
      <Component {...pageProps} />
    // </SSRKeycloakProvider>
  );
}

function parseCookies(req) {
  if (!req || !req.headers) {
    return {};
  }
  return cookie.parse(req.headers.cookie || "");
}

MyApp.getInitialProps = async (context) => {
  return {
    cookies: parseCookies(context?.ctx?.req),
  };
};

export default MyApp;
