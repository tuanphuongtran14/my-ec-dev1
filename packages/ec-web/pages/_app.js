import React from 'react';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                {/* FontAwesome CSS */}
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
                {/* Bootstrap CSS */}
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous" />
                <link rel="stylesheet" href="/vendors/flickity.min.css" />
                {/* Optional CSS */}
                <link rel="stylesheet" href="/css/style.css" />
                

            </Head>
            <Component {...pageProps} />

        </>
    )
}
