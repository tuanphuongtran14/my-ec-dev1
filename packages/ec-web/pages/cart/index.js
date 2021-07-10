import React from 'react'
import Head from 'next/head';

import Cart from '../../components/Cart/Cart'
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer'

const index = () => {
    return (
        <>
            <Head>
                <title>Giỏ hàng</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"/>
                <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
                <link rel="stylesheet" href="./css/cart.css"/>
                <link rel="stylesheet" href="./css/style.css"/>
                <link rel="stylesheet" href="./css/grid.css"/>
            </Head>
            <Header/>
            <Cart/>
            <Footer/>         
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
        </>
    )
}

export default index
