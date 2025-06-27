import "../styles/globals.css";
import {
  CrowdFundingProvider,
  CrowdFundingContext,
} from "../Context/CroudFunding";
import React, { useContext } from "react";
import { Error, Success } from "../Components";
import Head from "next/head";
import BackToTop from "../Components/BackToTop";
import { ThemeProvider } from "../Context/ThemeContext";

export default function App({ Component, pageProps }) {
  // Use a variable to hold the context value inside the component that has the provider
  const contextValue = useContext(CrowdFundingContext);

  // A small helper component to render the main content, now it's inside the scope
  const MainContent = () => {
    const { 
      openError, 
      error, 
      setOpenError, 
      openSuccess, 
      success, 
      setOpenSuccess 
    } = useContext(CrowdFundingContext);

    return (
      <>
        <Head>
          <title>CauseFi</title>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;700;900&family=Space+Grotesk:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <div className="relative flex size-full min-h-screen flex-col bg-white text-black dark:bg-[#141018] dark:text-white group/design-root overflow-x-hidden" style={{fontFamily: '"Space Grotesk", "Noto Sans", sans-serif'}}>
          <Component {...pageProps} />
          <BackToTop />
        </div>
        {openError && <Error error={error} setOpenError={setOpenError} />}
        {openSuccess && <Success message={success} setOpenSuccess={setOpenSuccess} />}
      </>
    );
  };

  return (
    <CrowdFundingProvider>
      <ThemeProvider>
        <MainContent />
      </ThemeProvider>
    </CrowdFundingProvider>
  );
}
