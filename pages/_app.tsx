import React from 'react'
import '../styles/globals.css'

interface Props {
  Component: React.JSXElementConstructor<any>;
  pageProps: any;
}

function MyApp(props: Props) {
  const { Component, pageProps } = props
  return <Component {...pageProps} />
}

export default MyApp
