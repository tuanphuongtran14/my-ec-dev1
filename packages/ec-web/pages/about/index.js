import React from 'react'
import Head from 'next/head';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer'
import About from '../../components/About/About';

const index = () => {
    return (
        <>
            <Head>
                <title>Về Chúng Tôi</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="stylesheet" href="./css/about.css"/>
            </Head>
            <Header/>
            <About/>
            <Footer/>        
        </>
    )
}

export default index