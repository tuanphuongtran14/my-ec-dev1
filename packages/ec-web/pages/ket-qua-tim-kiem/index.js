import Head from 'next/head'
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Banner from '../../components/Banner/Banner';
import { useState } from 'react';
import Pagination from '../../components/Category/pagination';
import Product from '../../components/Result/product';
import client from '../../components/Category/apolloClient'
import { gql } from '@apollo/client';
import { useRouter } from "next/router"

export async function getServerSideProps({query}) {
    query.minPrice = Number(query.minPrice);
    query.maxPrice = Number(query.maxPrice);
    query.minRam = Number(query.minRam);
    query.maxRam = Number(query.maxRam);
    query.minScreenSize = Number(query.minScreenSize);
    query.maxScreenSize = Number(query.maxScreenSize);
    query.minBatteryCapacity = Number(query.minBatteryCapacity);
    query.maxBatteryCapacity = Number(query.maxBatteryCapacity);


    const { data } = await client.query({
        query: gql`
            query($filter: ProductFilter!) {
                products: searchProducts(filter: $filter){
                    name,
                    salesPercentage,
                    slug,
                    regularPrice,
                    finalPrice,
                    id,
                    ram,
                    thumbnail{
                        url
                    },
                    brand{
                        name
                    }
                }
            }
        `,
        variables: {
            "filter": query
        }
    });

    console.log(data);

    return {
        props: {
            products: data.products,
            // products: [],
        },
    };
}

export default function Result({ products }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(25);

    const indexOfLastProduct = productsPerPage * currentPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = pageNumber => (setCurrentPage(pageNumber))
    
    return (
        <>
            <Head>
                <title>Kết quả tìm kiếm</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" key="title" />
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
                {/* <!-- Bootstrap CSS --> */}
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous" />
                <link rel="stylesheet" href="./vendors/flickity.min.css" />
                {/* <!-- Optional CSS --> */}
                <link rel="stylesheet" href="./css/style.css" />
            </Head>
            <Header></Header>
                <div id="root">
                    <Banner />
                    
                    <div className="container bg-white mb-5 filter py-3">
                        {/* <i><h1 className="text-center text-primary">Kết quả tìm kiếm</h1></i> */}
                        <div className="product-list product-list--non-slide border-0">
                            <Product currentProducts={currentProducts} />
                        </div>
                        <Pagination
                            productsPerPage={productsPerPage}
                            totalProducts={products.length}
                            paginate={paginate}
                            currentPage={currentPage}
                        />
                    </div>
                    <Footer />
                </div>
                {/* <form action="" className="search-bar" id="search-bar">
                    <input type="text" name="seach" id="seach" className="search-input" placeholder="Search" />
                    <button type="submit" className="btn btn--search">
                        <i className="fa fa-search " aria-hidden="true"></i>
                    </button>
                </form> */}

                {/* <div id="overlaybody"></div> */}
                {/* <!-- Optional JavaScript --> */}
                <script src="./vendors/flickity.pkgd.min.js"></script>
                <script src="./js/main.js"></script>
                {/* <script src=""></script> */}
                {/* <!-- jQuery first, then Popper.js, then Bootstrap JS --> */}
                <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossOrigin="anonymous"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossOrigin="anonymous"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossOrigin="anonymous"></script>
        </>
    );
}