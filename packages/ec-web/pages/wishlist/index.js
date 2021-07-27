import React from 'react'
import Head from 'next/head';
import { graphqlClient, gql } from "../../helpers/apollo-client";
import { useAuth } from "../../helpers/auth";
import Wishlist from '../../components/Wishlist/Wishlist'
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer'

export const getServerSideProps = useAuth(async ({ req, res, params }) => {
    const jwt = req.session.get("user") ? req.session.get("user").jwt : null;

    const client = graphqlClient(jwt);

    const { data } = await client.query({
        query: gql`
        query {
            wishLists:
            getWishLists {
              products {
                id,
                name,
                thumbnail{
                  url
                }
                finalPrice
                options{
                  quantityInStock
                }
                
              }
            }
          }
          
          `,
    });
    console.log(data)
    return {
        props: {
            wishLists: data.wishLists,
            // products: data.wishLists.products,
            isSignedIn: jwt ? true : false,
            jwt,
        
        },
    };
});
const index = ({wishLists}) => {
    console.log(wishLists);
    return (
        <div>
            <Head>
                <title>Giỏ hàng</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"/>
                <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
                <link rel="stylesheet" href="./css/wishlist.css"/>
                <link rel="stylesheet" href="./css/style.css"/>
                <link rel="stylesheet" href="./css/grid.css"/>
            </Head>
            <Header/>
            <Wishlist wishLists= {wishLists}/>
            <Footer/>         
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
        </div>
    )
}

export default index