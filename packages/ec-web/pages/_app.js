import React, {useState} from 'react';
import Head from 'next/head';
import Router from 'next/router'
import $ from 'jquery';

export default function App({ Component, pageProps }) {
    const [loading, setLoading] = useState(false);

    Router.events.on("routeChangeStart", url => {
        setLoading(true);
    });
    Router.events.on("routeChangeComplete", url => {
        setLoading(false);
    });
    return (
        <>
            <Component {...pageProps} />
            {/* <!-- Page Preloder --> */}
            { loading ? (
                <div id="preloder">
                    <div className="loader"></div>
                </div>
            ) : ''}
        </>
    )
}
