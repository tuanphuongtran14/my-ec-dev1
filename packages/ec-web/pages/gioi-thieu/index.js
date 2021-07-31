import React from 'react'
import Head from 'next/head';
import { Header, Footer, About } from "../../components";

export async function getStaticProps(ctx) {
    return {
        props: {},
    }
}

export default function About() {
    return (
        <>
            <Head>
                <title>Về Chúng Tôi</title>
                <link rel="stylesheet" href="./css/about.css"/>
            </Head>
            <Header/>
            <About/>
            <Footer/>        
        </>
    )
}