import Head from 'next/head'
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer'
import { useState, useEffect } from 'react';
import Pagination from './pagination';
import Product from './product';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export async function getServerSideProps() {
    const client = new ApolloClient({
        uri: `http://localhost:1337/graphql`,
        cache: new InMemoryCache(),
    });

    const { data } = await client.query({
        query: gql`  
        query{
            products: searchProducts {
                name,
                slug,
                sales_percentage,
                regular_price,
                final_price,
                id,
                thumbnail{
                    url
                }
            }
        }
  `
    });

    return {
        props: {
            products: data.products,
        },
    };
}

export default function ({products}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(5)

    const indexOfLastProduct = productsPerPage * currentPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = pageNumber => (setCurrentPage(pageNumber))

    return (
        <>
            <Head>
                <title>Category</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" key="title" />
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
                {/* <!-- Bootstrap CSS --> */}
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous" />
                <link rel="stylesheet" href="./vendors/flickity.min.css" />
                {/* <!-- Optional CSS --> */}
                <link rel="stylesheet" href="./css/style.css" />
            </Head>
            <Header></Header>
            <body id="body">
                <div id="root">
                    <div className="container px-0 banner">
                        <div className="carousel row mx-0">
                            <div className="col-12 col-lg-8 px-0">
                                <div className="gallery js-flickity " data-flickity-options='{ "freeScroll": true, "wrapAround": true }'>
                                    <img className="gallery-cell" src="./img/banner/ROG_Phone_Sliding_desk.webp" alt="" />
                                    <img className="gallery-cell" src="./img/banner/690x300_Buds_.webp" alt="" />
                                    <img className="gallery-cell" src="./img/banner/mg-6690x300.webp" alt="" />
                                    <img className="gallery-cell" src="./img/banner/IMG_20210515_220924_947.webp" alt="" />
                                </div>
                            </div>
                            <div className="sub-banner col-12 col-lg-4 px-0">
                                <div className="col-12 mb-2 pr-0">
                                    <img src="./img/banner/iPhone_12_690x300_copy_3_.webp" alt="" />
                                </div>
                                <div className="col-12 pr-0">
                                    <img src="./img/banner/Right_banner.jpg" alt="" />
                                </div>
                            </div>
                            <div className="col-12 bottom-banner px-0 mt-2">
                                <img src="./img/banner/bottom-banner.png" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="container bg-white mb-5 filter">
                        <div className="d-block py-3">
                            <select name="" id="" className="filter__option mr-2 my-2">
                                <option selected>Hãng...</option>
                                <option value="">Iphone</option>
                                <option value="">SamSung</option>
                                <option value="">Oppo</option>
                            </select>

                            <select name="" id="" className="filter__option mr-2 my-2">
                                <option selected>Giá...</option>
                                <option value="">Dưới 2 triệu</option>
                                <option value="">Từ 2 đến 4 triệu</option>
                                <option value="">Từ 4 đến 7 triệu</option>
                                <option value="">Từ 7 đến 13 triệu</option>
                                <option value="">Từ 13 đến 20 triệu</option>
                                <option value="">Trên 20 triệu</option>
                            </select>

                            <select name="" id="" className="filter__option mr-2 my-2">
                                <option selected>Hiệu năng & Pin...</option>
                                <option value="">Chơi game / Cấu hình cao</option>
                                <option value="">Pin khủng trên 5000 mAh</option>
                                <option value="">Sạc pin nhanh</option>

                            </select>
                            <select name="" id="" className="filter__option mr-2 my-2">
                                <option selected>Ram...</option>
                                <option value="">Dưới 4 GB</option>
                                <option value="">4 - 6 GB</option>
                                <option value="">8 GB trở lên</option>

                            </select>
                            <select name="" id="" className="filter__option mr-2 my-2">
                                <option selected>Bộ nhớ trong...</option>
                                <option value="">Dưới 32 GB</option>
                                <option value="">32 - 64 GB</option>
                                <option value="">128 - 256 GB</option>
                                <option value="">512 GB trở lên</option>
                            </select>

                            <select name="" id="" className="filter__option mr-2 my-2">
                                <option selected>Tính năng đặc biệt...</option>
                                <option value="">Hỗ trợ 5G</option>
                                <option value="">Bảo mật khuôn mặt</option>
                                <option value="">Bảo mật vân tay</option>
                                <option value="">Sạc không dây</option>
                                <option value="">Chống nước, bụi</option>
                            </select>
                        </div>
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
                <form action="" className="search-bar" id="search-bar">
                    <input type="text" name="seach" id="seach" className="search-input" placeholder="Search" />
                    <button type="submit" className="btn btn--search">
                        <i className="fa fa-search " aria-hidden="true"></i>
                    </button>
                </form>

                <div id="overlaybody"></div>
                {/* <!-- Optional JavaScript --> */}
                <script src="./vendors/flickity.pkgd.min.js"></script>
                <script src="./js/main.js"></script>
                {/* <script src=""></script> */}
                {/* <!-- jQuery first, then Popper.js, then Bootstrap JS --> */}
                <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossOrigin="anonymous"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossOrigin="anonymous"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossOrigin="anonymous"></script>
            </body>
        </>
    );
}