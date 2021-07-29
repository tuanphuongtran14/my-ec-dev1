import React from 'react'
import Head from 'next/head';
import { graphqlClient, gql } from "../../helpers/apollo-client";
import { useAuth } from "../../helpers/auth";
import Wishlist from '../../components/Wishlist/Wishlist'
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer'
import Pagination from '../../components/Wishlist/pagination'
import { useState } from 'react';

export const getServerSideProps = useAuth(async ({ req, res, params }) => {
    const jwt = req.session.get("user") ? req.session.get("user").jwt : null;

    const client = graphqlClient(jwt);
    
    const {data} = await client.query({
        query: gql`
        query {
            wishLists:
            getWishLists {
              products {
                id,
                slug,
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
    return {
        props: {
            wishLists: data.wishLists,
            products: data.wishLists.products,
            isSignedIn: jwt ? true : false,
            jwt,
        },
    };
});

const index = ({products,isSignedIn,jwt}) => {
    if(isSignedIn){
    
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(5);

    const indexOfLastProduct = productsPerPage * currentPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    console.log(products);
   //const temp = {}

    const paginate = pageNumber => (setCurrentPage(pageNumber))
    return (
        <div>
            <Head>
                <title>Sản phẩm yêu thích</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"/>
                <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
                <link rel="stylesheet" href="./css/wishlist.css"/>
                <link rel="stylesheet" href="./css/style.css"/>
                <link rel="stylesheet" href="./css/grid.css"/>
            </Head>
            <Header/>
            <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0 bg-white">
                <div className="grid wide d-flex">
                     <li className="breadcrumb-item">
                        <h6 ><a href="/"className = "text-danger">Home</a></h6>
                     </li>
                <li className="breadcrumb-item">
                    <h6>Wishlist</h6>
                </li>
              </div>
        </ol>
      </nav>
            </div>
            <div>
      <div className="container bg-white rounded pd-5 mt-4 pb-3">
        <div className=" container wishlist-row grid wide pr-3">
            <div className="shadow-sm p-3 mb-3 bg-white rounded row text-center">
                <div className="col l-4 md-6 c-6">
                    <h5>Tên sản phẩm</h5>
                </div>
                <div className="col l-2 md-3 c-0">
                    <h5>Giá</h5>
                </div>
                <div className="col l-2 md-3 c-0">
                    <h5>Trạng thái</h5>
                </div>
                <div className="col l-4 md-0 c-0">
                    <h5>Chỉnh Sửa</h5>
                </div>
            </div>
            <Wishlist currentProducts ={currentProducts} jwt ={jwt}/>
            <Pagination productsPerPage={productsPerPage}
                        totalProducts={products.length}
                        paginate={paginate}
                        currentPage={currentPage}>
            </Pagination>
        </div>
    </div>
    </div>
           
            <Footer/>         
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
        </div>
    )
}

else {
    return <div>
        quay ve dang nhap

    </div>
}
}
export default index