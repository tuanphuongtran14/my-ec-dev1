import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
// import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { graphqlClient, gql } from "../../../lib/apollo-client";
import { isSignIn, getJwt, useAuth } from "../../../lib/auth";
import Modal from "../../../components/Modal/Modal";
import Review from "../../../components/Review/Review";
import axios from 'axios';

export const getServerSideProps = useAuth(async ({ req, res, params }) => {
    const jwt = req.session.get("user") ? req.session.get("user").jwt : null;

    const client = graphqlClient(jwt);

    const { data } = await client.query({
        query: gql`
            query($filter: ProductFilter!, $slug: String!) {
                products: searchProducts {
                    name
                    slug
                    sales_percentage
                    regular_price
                    final_price
                    id
                    thumbnail {
                        url
                    }
                }
                product: searchProducts(filter: $filter) {
                    name
                    sales_percentage
                    slug
                    regular_price
                    final_price
                    id
                    ram
                    thumbnail {
                        url
                    }
                    full_desc
                    product_condition
                    warranty
                    inclusion_box
                    height
                    width
                    depth
                    platform_name
                    platform_version
                    screen_size
                    screen_panel
                    screen_resolution
                    cpu
                    gpu
                    options {
                        images {
                            url
                        }
                    }
                }
                reviewList: getReviewsByProductSlug(slug: $slug) {
                    reviews {
                        _id
                        user {
                            username
                        }
                        comment
                        stars
                        createdAt
                    }
                    userReview {
                        _id
                        user {
                            username
                        }
                        comment
                        stars
                        createdAt
                    }
                    overviews {
                        oneStar
                        twoStar
                        threeStar
                        fourStar
                        fiveStar
                        total,
                        average
                    }
                }
            }
        `,
        variables: {
            filter: {
                slug: `${params.slug}`,
            },
            slug: `${params.slug}`,
        },
    });

    return {
        props: {
            product: data.product[0],
            products: data.products,
            reviewList: data.reviewList,
            isSignedIn: jwt ? true : false,
            jwt,
            params,
        },
    };
});

export default function product({
    product,
    products,
    reviewList,
    isSignedIn,
    jwt,
    params,
}) {
    const [stars, setStars] = useState(5);
    const [userReview, setUserReview] = useState(reviewList.userReview);
    const [reviews, setReviews] = useState(reviewList.reviews);
    const [overviews, setOverviews] = useState(reviewList.overviews);
    const [isEditing, setIsEditing] = useState(false);
    const [displayNumber, setDisplayNumber] = useState(1);

    const regularPrice = product.regular_price.toLocaleString("DE-de");
    const finalPrice = product.final_price.toLocaleString("DE-de");

    // Sản phẩm liên quan
    const relatedProduct = products.slice(1, 5).map((product, index) => {
        const regularPrice = product.regular_price.toLocaleString("DE-de");
        const finalPrice = product.final_price.toLocaleString("DE-de");
        return (
            <div className="product col-6 col-md-3 col-lg-10 col-xl-9 my-3">
                <img
                    src={
                        process.env.NEXT_PUBLIC_API_URL + product.thumbnail.url
                    }
                    alt=""
                    className="product__img mb-4"
                />
                <Link
                    href="/product/[slugProduct]"
                    as={`/product/${product.slug}`}
                >
                    <span
                        className="product__title"
                        style={{ cursor: "pointer" }}
                    >
                        {product.name}
                    </span>
                </Link>
                <div className="product__price">
                    <span className="sales-price">{finalPrice}₫</span>
                    <span className="regular-price">{regularPrice}₫</span>
                </div>
                <div className="product__rating">
                    <i
                        className="fa product__rating-icon fa-star"
                        aria-hidden="true"
                    />
                    <i
                        className="fa product__rating-icon fa-star"
                        aria-hidden="true"
                    />
                    <i
                        className="fa product__rating-icon fa-star"
                        aria-hidden="true"
                    />
                    <i
                        className="fa product__rating-icon fa-star"
                        aria-hidden="true"
                    />
                    <i
                        className="fa product__rating-icon fa-star"
                        aria-hidden="true"
                    />
                    <span>(472 đánh giá)</span>
                </div>
                {product.salespercentage > 0 ? (
                    <div className="product__box-sticker">
                        <p className="sticker-percent">
                            -{product.salespercentage}%
                        </p>
                    </div>
                ) : (
                    ""
                )}
            </div>
        );
    });

    // Hình ảnh lớn của sản phẩm
    const color = () => {
        if (product.options) {
            return product.options.map((option, index) => {
                return option.images.map((image, index) => {
                    return (
                        <>
                            <img
                                className="product-image"
                                src={
                                    process.env.NEXT_PUBLIC_API_URL + image.url
                                }
                                alt=""
                            />
                        </>
                    );
                });
            });
        }
    };

    // Hình ảnh nhỏ của sản phẩm
    const thumbs = () => {
        if (product.options) {
            return product.options.map((option, index) => {
                return option.images.map((image, index) => (
                    <img
                        className={
                            index === 0 ? "thumbnail active" : "thumbnail"
                        }
                        src={process.env.NEXT_PUBLIC_API_URL + image.url}
                        alt={index}
                    />
                ));
            });
        }
    };

    // Các lựa chọn màu sắc
    const colorOption = () => {
        if (product.options) {
            return product.options.map((option, index) => {
                return (
                    <div className={index === 0 ? "version active" : "version"}>
                        {option.color}
                        <span className="version__price">
                            {index >= 2 ? regularPrice : finalPrice}
                        </span>
                    </div>
                );
            });
        }
    };

    // Display reviewing form
    const displayReviewingForm = () => {
        if (isSignedIn) {
            if (userReview) {
                if (!isEditing)
                    return (
                        <>
                            <p className="font-weight-bold my-2">
                                Đánh giá của bạn
                            </p>
                            <Review
                                username={userReview.user.username}
                                stars={userReview.stars}
                                comment={userReview.comment}
                                postedTime={userReview.createdAt}
                            />
                            <div className="d-flex justify-content-between mb-3">
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={() => {
                                        setStars(userReview.stars);
                                        setIsEditing(true);
                                    }}
                                >
                                    <i
                                        className="fa fa-pencil-square-o mr-2"
                                        aria-hidden="true"
                                    ></i>
                                    Chỉnh sửa
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => {
                                        $(`#deleteConfirm`).modal();
                                    }}
                                >
                                    <i
                                        className="fa fa-trash mr-2"
                                        aria-hidden="true"
                                    ></i>
                                    Xóa
                                </button>
                            </div>
                            <Modal
                                id="deleteConfirm"
                                title="Bạn có chắc muốn xóa bài đánh giá này?"
                                body="Bài đánh giá sau khi xóa sẽ không thể khôi phục được. Bạn có chắc muốn thực hiện điều này?"
                                yes="danger"
                                no="secondary"
                                callback={handleSubmitDeleteReview}
                            />
                        </>
                    );
                else {
                    return (
                        <form action className="px-0">
                            <p className="font-weight-bold my-2">
                                Chỉnh sửa đánh giá
                            </p>
                            <div className="form-group w-100">
                                <label htmlFor>Đánh giá của bạn: </label>
                                <span className="rating-result ml-3">
                                    {displayStars()}
                                </span>
                                <textarea
                                    className="form-control mb-3"
                                    name="comment"
                                    id="comment"
                                    rows={3}
                                    defaultValue={userReview.comment}
                                />
                                <button
                                    className="btn btn-success"
                                    id="editReviewBtn"
                                    onClick={handleSubmitEditReview}
                                >
                                    Chỉnh sửa
                                </button>
                            </div>
                        </form>
                    );
                }
            } else
                return (
                    <form action className="px-0">
                        <p className="font-weight-bold my-2">
                            Đánh giá sản phẩm này
                        </p>
                        <div className="form-group w-100">
                            <label htmlFor>Đánh giá của bạn: </label>
                            <span className="rating-result ml-3">
                                {displayStars()}
                            </span>
                            <textarea
                                className="form-control mb-3"
                                name="comment"
                                id="comment"
                                rows={3}
                                defaultValue={""}
                            />
                            <button
                                className="btn btn-success"
                                id="createReviewBtn"
                                onClick={handleSubmitCreateReview}
                            >
                                Gửi ngay
                            </button>
                        </div>
                    </form>
                );
        } else
            return (
                <div className="alert alert-warning my-3" role="alert">
                    Quý khách vui lòng <Link href="/login">đăng nhập</Link> để
                    có thể đánh giá sản phẩm
                </div>
            );
    };

    const displayReviews = () => {
        const reviewElements = reviews.slice(0, displayNumber).map(review => 
            <Review
                username={review.user.username}
                stars={review.stars}
                comment={review.comment}
                postedTime={review.createdAt}
            />
        )
        return (
            <>
                <div className="form-group form-inline">
                    <label className="mr-2">Xếp theo: </label>
                    <select className="form-control" name="sortBy" id="sortBy" onChange={handleSort}>
                        <option value="createdAt:desc">Mới nhất</option>
                        <option value="createdAt:asc">Cũ nhất</option>
                        <option value="stars:desc">Tích cực</option>
                        <option value="stars:asc">Tiêu cực</option>
                    </select>
                </div>
                { reviewElements }
                { (displayNumber < reviewList.reviews.length) ? (
                    <p className="text-center">
                        <button type="button" class="btn btn-success mt-3" onClick={loadMore}>Tải thêm...</button>
                    </p>) : null
                }
            </>
        )
    }

    const displayOverviews = () => {
        let oneStarPercentage, twoStarPercentage, threeStarPercentage, fourStarPercentage, fiveStarPercentage;
        oneStarPercentage = ((overviews.oneStar / overviews.total) * 100).toFixed(2);
        twoStarPercentage = ((overviews.twoStar / overviews.total) * 100).toFixed(2);
        threeStarPercentage = ((overviews.threeStar / overviews.total) * 100).toFixed(2);
        fourStarPercentage = ((overviews.fourStar / overviews.total) * 100).toFixed(2);
        fiveStarPercentage = ((overviews.fiveStar / overviews.total) * 100).toFixed(2);
        return (
            <div className="d-flex justify-content-between row mx-0 p-3 border">
                <div className="customer-reviews__overviews">
                    <span className="overviews__grade">
                        {overviews.average}/5
                    </span>
                    <span className="rating-result">
                        <i
                            className="fa fa-star checked"
                            aria-hidden="true"
                        />
                        <i
                            className="fa fa-star checked"
                            aria-hidden="true"
                        />
                        <i
                            className="fa fa-star checked"
                            aria-hidden="true"
                        />
                        <i
                            className="fa fa-star checked"
                            aria-hidden="true"
                        />
                        <i
                            className="fa fa-star-half-empty checked"
                            aria-hidden="true"
                        />
                    </span>
                    <span className="overviews__quantity-reviews mt-1">
                        {overviews.total} Đánh giá
                    </span>
                </div>
                <div className="customer-reviews__details">
                    <div className="rating-details">
                        <span className="rating-result">
                            5
                            <i
                                className="fa fa-star checked"
                                aria-hidden="true"
                            />
                        </span>
                        <div className="rate-status">
                            <div
                                className="rate-status__progress"
                                style={{ width: `${fiveStarPercentage}%` }}
                            />
                        </div>
                        <span className="rating__ratio">
                            {`${fiveStarPercentage}%`}
                        </span>
                    </div>
                    <div className="rating-details">
                        <span className="rating-result">
                            4
                            <i
                                className="fa fa-star checked"
                                aria-hidden="true"
                            />
                        </span>
                        <div className="rate-status">
                            <div
                                className="rate-status__progress"
                                style={{ width: `${fourStarPercentage}%` }}
                            />
                        </div>
                        <span className="rating__ratio">
                            {`${fourStarPercentage}%`}
                        </span>
                    </div>
                    <div className="rating-details">
                        <span className="rating-result">
                            3
                            <i
                                className="fa fa-star checked"
                                aria-hidden="true"
                            />
                        </span>
                        <div className="rate-status">
                            <div
                                className="rate-status__progress"
                                style={{ width: `${threeStarPercentage}%` }}
                            />
                        </div>
                        <span className="rating__ratio">
                            {`${threeStarPercentage}%`}
                        </span>
                    </div>
                    <div className="rating-details">
                        <span className="rating-result">
                            2
                            <i
                                className="fa fa-star checked"
                                aria-hidden="true"
                            />
                        </span>
                        <div className="rate-status">
                            <div
                                className="rate-status__progress"
                                style={{ width: `${twoStarPercentage}%` }}
                            />
                        </div>
                        <span className="rating__ratio">
                            {`${twoStarPercentage}%`}
                        </span>
                    </div>
                    <div className="rating-details">
                        <span className="rating-result">
                            1
                            <i
                                className="fa fa-star checked"
                                aria-hidden="true"
                            />
                        </span>
                        <div className="rate-status">
                            <div
                                className="rate-status__progress"
                                style={{ width: `${oneStarPercentage}%` }}
                            />
                        </div>
                        <span className="rating__ratio">
                            {`${oneStarPercentage}%`}
                        </span>
                    </div>
                </div>
            </div>
            );
    }

    const refeshReviews = async slug => {
        try {
            // Declare query & its variables
            const query = `
                query($slug: String!) {
                    reviewList: getReviewsByProductSlug(slug: $slug) {
                        reviews {
                            _id
                            user {
                                username
                            }
                            comment
                            stars
                            createdAt
                        }
                        userReview {
                            _id
                            user {
                                username
                            }
                            comment
                            stars
                            createdAt
                        }
                        overviews {
                            oneStar
                            twoStar
                            threeStar
                            fourStar
                            fiveStar
                            total
                            average
                        }
                    }
                }
            `;
    
            const variables = {
                filter: {
                    slug
                },
                slug
            };
    
            const { data } = await axios({
                method: 'POST',
                url: '/api/query',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    query,
                    variables
                },
            });
    
            setReviews(data.reviewList.reviews);
            setUserReview(data.reviewList.userReview);
            setOverviews(data.reviewList.overviews);
    
        } catch {

        }
    }

    const createReview = async (comment, stars) => {
        try {
            const mutation = `
                mutation($input: createProductReviewInput!) {
                    newReview: createReviewForProduct(
                        createReviewInput: $input
                    ) {
                        _id
                        user {
                            username
                        }
                        comment
                        stars
                        createdAt
                    }
                }
            `;

            const variables = {
                input: {
                    productSlug: `${params.slug}`,
                    comment,
                    stars,
                },
            };

            const { data } = await axios({
                method: 'POST',
                url: '/api/mutation',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    mutation,
                    variables
                },
            });

            return data.newReview;
        } catch {
            return undefined;
        }
    };

    const editReview = async (reviewId, comment, stars) => {
        const editReviewInput = {};

        if (comment) editReviewInput.comment = comment;

        if (stars) editReviewInput.stars = stars;

        const client = graphqlClient(jwt);

        const { data } = await client.mutate({
            mutation: gql`
                mutation($reviewId: ID!, $editReviewInput: editReviewInput!) {
                    review: editReviewById(
                        reviewId: $reviewId
                        editReviewInput: $editReviewInput
                    ) {
                        _id
                        user {
                            username
                        }
                        comment
                        stars
                        createdAt
                    }
                }
            `,
            variables: {
                reviewId: reviewId,
                editReviewInput: editReviewInput,
            },
        });

        return data.review;
    };

    const deleteReview = async (reviewId) => {
        const client = graphqlClient(jwt);

        const { data } = await client.mutate({
            mutation: gql`
                mutation($reviewId: ID!) {
                    deletedReview: deleteReviewById(reviewId: $reviewId) {
                        _id
                        user {
                            username
                        }
                        comment
                        stars
                        createdAt
                    }
                }
            `,
            variables: {
                reviewId: reviewId,
            },
        });

        return data.deletedReview;
    };

    const handleSubmitCreateReview = async (e) => {
        e.preventDefault();
        const comment = document.getElementById("comment").value;
        const btnEle = document.getElementById("createReviewBtn");

        if (!comment)
            return alert("Vui lòng nhập bình luận cho đánh giá của bạn");

        try {
            btnEle.setAttribute("disabled", true);
            btnEle.innerHTML = `
                <span className="spinner-border spinner-border-sm"></span>
                Đang gửi... 
            `;

            const newReview = await createReview(comment, stars);

            await refeshReviews(params.slug);

            btnEle.removeAttribute("disabled");
            btnEle.innerHTML = `
                Gửi ngay 
            `;

            if (!newReview) return alert("Có lỗi xảy ra, vui lòng thử lại sau");

        } catch (error) {
            btnEle.removeAttribute("disabled");
            btnEle.innerHTML = `
                Gửi ngay 
            `;
        }
    };

    const handleSubmitDeleteReview = async (e) => {
        e.preventDefault();
        const modal = document.getElementById("deleteConfirm");
        const yesBtn = modal.querySelector("#yesBtn");

        try {
            yesBtn.setAttribute("disabled", true);
            yesBtn.innerHTML = `
                <span className="spinner-border spinner-border-sm"></span>
                Đang xóa... 
            `;

            const deletedReview = await deleteReview(userReview._id);

            if (deletedReview) {
                $(`#deleteConfirm`).modal("hide");
                await refeshReviews(params.slug);
                setStars(5);
            }

            yesBtn.removeAttribute("disabled");
            yesBtn.innerHTML = "Đồng ý";
        } catch (error) {
            yesBtn.removeAttribute("disabled");
            yesBtn.innerHTML = `
                Đồng ý 
            `;
        }
    };

    const handleSubmitEditReview = async (e) => {
        e.preventDefault();
        const comment = document.getElementById("comment").value;
        const btnEle = document.getElementById("editReviewBtn");

        if (!comment)
            return alert("Vui lòng nhập bình luận cho đánh giá của bạn");

        try {
            btnEle.setAttribute("disabled", true);
            btnEle.innerHTML = `
                <span className="spinner-border spinner-border-sm"></span>
                Đang gửi... 
            `;

            const review = await editReview(userReview._id, comment, stars);
            
            await refeshReviews(params.slug);

            btnEle.removeAttribute("disabled");
            btnEle.innerHTML = `
                Chỉnh sửa 
            `;

            if (!review) return alert("Có lỗi xảy ra, vui lòng thử lại sau");

            setIsEditing(false);
        } catch (error) {
            console.log(error);
            btnEle.removeAttribute("disabled");
            btnEle.innerHTML = `
                Chỉnh sửa
            `;
        }
    };

    const handleSort = async e => {
        const value = e.target.value;

        try {
            const query = `
                query($slug: String!, $sort: [String]!) {
                    reviewList: getReviewsByProductSlug(slug: $slug, sort: $sort) {
                        reviews {
                            _id
                            user {
                                username
                            }
                            comment
                            stars
                            createdAt
                        }
                        userReview {
                            _id
                            user {
                                username
                            }
                            comment
                            stars
                            createdAt
                        }
                    }
                }
            `;

            const variables = {
                slug: `${params.slug}`,
                sort: [value],
            };

            const { data } = await axios({
                method: 'POST',
                url: '/api/query',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    query,
                    variables
                },
            });
            console.log(data);

            return setReviews(data.reviewList.reviews);
        } catch {
            return undefined;
        }
    }

    const loadMore = e => {
        e.preventDefault();
        setDisplayNumber(displayNumber + 10);
    }

    const handleSelectStars = (event, i) => {
        console.log(i);
        setStars(i);
    };

    const displayStars = () => {
        const result = [];

        for (let i = 1; i <= stars; i++)
            result.push(
                <i
                    className="fa fa-star checked"
                    aria-hidden="true"
                    onClick={(event) => handleSelectStars(event, i)}
                />
            );

        for (let i = Math.floor(stars) + 1; i <= 5; i++)
            result.push(
                <i
                    className="fa fa-star-o checked"
                    aria-hidden="true"
                    onClick={(event) => handleSelectStars(event, i)}
                />
            );

        return result;
    };

    return (
        <>
            <Head>
                {" "}
                <title>{product.name}</title>
                {/* <!-- CSS --> */}
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/flickity@2/dist/flickity.min.css"
                />
                {/* <!-- JavaScript --> */}
                <script src="https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js"></script>
            </Head>
            <Header />

            <div id="root">
                <nav className="breadcrumb breadcrumb--custom my-1">
                    <div className="container px-0">
                        <a className="breadcrumb-item" href="/">
                            Trang chủ
                        </a>
                        <a className="breadcrumb-item" href="/category">
                            Cửa hàng
                        </a>
                        <span className="breadcrumb-item active">
                            {product.name}
                        </span>
                    </div>
                </nav>
                <article className="container product-details bg-white">
                    <section className="row mx-0 py-2">
                        <h1 className="col-12 col-lg-6 product-details__name">
                            {product.name}
                        </h1>
                        <div className="col-12 col-lg-6 product-details__rating">
                            <span className="rating-result mr-3">
                                <i className="fa fa-star checked" />
                                <i className="fa fa-star checked" />
                                <i className="fa fa-star checked" />
                                <i className="fa fa-star checked" />
                                <i className="fa fa-star checked" />
                            </span>
                            <span>
                                4 Đánh giá | <a href>Nhận xét ngay</a>
                            </span>
                        </div>
                    </section>
                    <section className="row mx-0">
                        <div className="product-details__images px-0 px-md-2 col-12 col-lg-4 col-xl-4 mb-3 ">
                            <div
                                className="product-images__slide js-flickity mb-2"
                                data-flickity-options='{ "freeScroll": true, "wrapAround": true, "prevNextButtons": false, &apos;pageDots&apos;: false }'
                            >
                                {color()}
                            </div>

                            <div className="product-images__thumbnails px-4">
                                {thumbs()}
                            </div>
                        </div>
                        <div className="px-0 px-md-2 col-12 col-lg-4 col-xl-4 mb-3">
                            <div className="product-details__price">
                                {product.sales_percentage === 0 ? null : (
                                    <span className="sales-price">
                                        {finalPrice} ₫{" "}
                                    </span>
                                )}
                                <span className="regular-price">
                                    {regularPrice} ₫
                                </span>
                            </div>
                            <p className="my-2">
                                <b>Chọn phiên bản phù hợp</b>
                            </p>
                            <div
                                className="product-details__versions"
                                id="versions"
                            >
                                <div className="version active">
                                    {product.ram}G
                                    <span className="version__price">
                                        {finalPrice} ₫
                                    </span>
                                </div>
                            </div>
                            <p className="my-2">
                                <b>Chọn màu phù hợp</b>
                            </p>
                            <div
                                className="product-details__versions"
                                id="colors"
                            >
                                {colorOption}
                            </div>
                            <div className="row px-0 mx-0">
                                <button className="btn btn--buy-now col-12 px-0 mb-2">
                                    <i
                                        className="fa fa-cart-arrow-down fa--md"
                                        aria-hidden="true"
                                    />
                                    &nbsp; Mua ngay
                                </button>
                                <div className="col-6 pl-0 pr-1">
                                    <button className="btn btn-success w-100">
                                        <i
                                            className="fa fa-cart-plus"
                                            aria-hidden="true"
                                        />
                                        &nbsp; Thêm vào giỏ hàng
                                    </button>
                                </div>
                                <div className="col-6 pr-0 pl-1">
                                    <button className="btn btn-primary w-100">
                                        <i
                                            className="fa fa-heart"
                                            aria-hidden="true"
                                        />
                                        &nbsp; Thêm vào yêu thích
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="px-0 px-md-2 col-12 col-lg-4 col-xl-4 mb-3">
                            <b>Khuyến mãi: </b>
                            <ul className="product-details__bonus">
                                <li>Tặng voucher mua hàng trị giá 2000.000đ</li>
                                <li>Tặng voucher sửa chữa trị giá 500.000</li>
                                <li>
                                    Tặng sạc chính hãng 18W trị giá 550.000đ
                                </li>
                                <li>
                                    Tặng sim ghép Fix full lỗi trị giá 120.000đ
                                </li>
                                <li>Tặng nón bảo hiểm cao cấp</li>
                            </ul>
                            <div className="mt-2">
                                <b>Tình trạng</b>
                                <br />
                                {product.product_condition === null ? (
                                    <span className="text-justify">
                                        Máy mới 100%, nguyên hộp, đầy đủ phụ
                                        kiện từ nhà sản xuất.
                                    </span>
                                ) : (
                                    <div
                                        className="text-justify"
                                        dangerouslySetInnerHTML={{
                                            __html: product.product_condition,
                                        }}
                                    ></div>
                                )}
                            </div>
                            <div className="mt-2">
                                <b>Hộp bao gồm</b>
                                <br />
                                <ul
                                    className="text-justify list-unstyled"
                                    dangerouslySetInnerHTML={{
                                        __html: product.inclusion_box,
                                    }}
                                ></ul>
                            </div>
                            <div className="mt-2">
                                <b>Bảo hành</b>
                                <br />
                                <ul
                                    className="text-justify"
                                    dangerouslySetInnerHTML={{
                                        __html: product.warranty,
                                    }}
                                    style={{ listStyleType: "none" }}
                                ></ul>
                            </div>
                        </div>
                    </section>
                </article>
                <article className="container row mx-auto px-0">
                    <div className="col-12 col-lg-8 bg-white bd-top--fake-bg px-0 ">
                        <ul
                            className="nav--custom nav nav-pills my-2"
                            id="pills-tab"
                            role="tablist"
                        >
                            <li className="nav-item" role="presentation">
                                <a
                                    className="nav-link"
                                    id="pills-home-tab"
                                    data-toggle="pill"
                                    href="#pills-desc"
                                    role="tab"
                                    aria-controls="pills-desc"
                                    aria-selected="true"
                                >
                                    Mô tả
                                </a>
                            </li>
                            <li className="nav-item" role="presentation">
                                <a
                                    className="nav-link"
                                    id="pills-profile-tab"
                                    data-toggle="pill"
                                    href="#pills-specification"
                                    role="tab"
                                    aria-controls="pills-specification"
                                    aria-selected="false"
                                >
                                    Thông số
                                </a>
                            </li>
                            <li className="nav-item" role="presentation">
                                <a
                                    className="nav-link"
                                    id="pills-contact-tab"
                                    data-toggle="pill"
                                    href="#pills-reviews"
                                    role="tab"
                                    aria-controls="pills-reviews"
                                    aria-selected="false"
                                >
                                    Đánh giá
                                </a>
                            </li>
                        </ul>
                        <div
                            className="tab-content container"
                            id="pills-tabContent"
                        >
                            <div
                                className="tablist_content tab-pane fade show active"
                                id="pills-desc"
                                role="tabpanel"
                                aria-labelledby="pills-desc-tab"
                                dangerouslySetInnerHTML={{
                                    __html: product.full_desc,
                                }}
                            ></div>

                            <div
                                className="tablist_content tab-pane fade"
                                id="pills-specification"
                                role="tabpanel"
                                aria-labelledby="pills-specification-tab"
                            >
                                <h4>
                                    Thông số kỹ thuật chi tiết {product.name}
                                </h4>
                                <img
                                    src={
                                        process.env.NEXT_PUBLIC_API_URL +
                                        product.thumbnail.url
                                    }
                                    className="img_product img_product-specification"
                                    alt=""
                                />
                                <table className="table table-specification">
                                    <thead>
                                        <tr>
                                            <th colSpan={2}>Kích thước</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td scope="row">Chiều dài</td>
                                            <td>{product.height}mm</td>
                                        </tr>
                                        <tr>
                                            <td scope="row">Chiều rộng</td>
                                            <td>{product.width}mm</td>
                                        </tr>
                                        <tr>
                                            <td scope="row">Độ dày</td>
                                            <td>{product.depth}mm</td>
                                        </tr>
                                    </tbody>
                                    <thead>
                                        <tr>
                                            <th colSpan={2}>Màn hình</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td scope="row">
                                                Kích thước màn hình
                                            </td>
                                            <td>{product.screen_size}</td>
                                        </tr>
                                        <tr>
                                            <td scope="row">
                                                Công nghệ màn hình
                                            </td>
                                            <td>{product.screen_panel}</td>
                                        </tr>
                                        <tr>
                                            <td scope="row">Độ phân giải</td>
                                            <td>{product.screen_resolution}</td>
                                        </tr>
                                    </tbody>
                                    <thead>
                                        <tr>
                                            <th colSpan={2}>Nền tảng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td scope="row">Hệ điều hành</td>
                                            <td>{product.platform_name}</td>
                                        </tr>
                                        <tr>
                                            <td scope="row">Phiên bản</td>
                                            <td>{product.platform_version}</td>
                                        </tr>
                                    </tbody>
                                    <thead>
                                        <tr>
                                            <th colSpan={2}>Cấu hình</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td scope="row">CPU</td>
                                            <td>{product.cpu}</td>
                                        </tr>
                                        <tr>
                                            <td scope="row">GPU</td>
                                            <td>{product.gpu}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div
                                className="customer-reviews tablist_content tab-pane fade"
                                id="pills-reviews"
                                role="tabpanel"
                                aria-labelledby="pills-reviews-tab"
                            >
                                {displayOverviews()}
                               
                                {displayReviewingForm()}

                                { displayReviews() }
                                
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4 bg-white bd-top-left--fake-bg">
                        <h2 className="title text-center my-3">
                            Sản phẩm liên quan
                        </h2>
                        <div className="related-products row mx-0 pb-3">
                            {relatedProduct}
                        </div>
                    </div>
                </article>

                <form action className="search-bar" id="search-bar">
                    <input
                        type="text"
                        name="seach"
                        id="seach"
                        className="search-input"
                        placeholder="Search"
                    />
                    <button type="submit" className="btn btn--search">
                        <i className="fa fa-search " aria-hidden="true" />
                    </button>
                </form>
                <div id="overlaybody" />
            </div>
            <Footer />
            {/* <!-- Optional JavaScript --> */}
            <script src="/vendors/flickity.pkgd.min.js"></script>
            <script src="/js/main.js"></script>
            {/* <!-- jQuery first, then Popper.js, then Bootstrap JS --> */}
            <script
                src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
                integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
                crossorigin="anonymous"
            ></script>
            <script
                src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
                integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
                crossorigin="anonymous"
            ></script>
            <script
                src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
                integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
                crossorigin="anonymous"
            ></script>
        </>
    );
}

const refeshReviews = async slug => {
    try {
        // Declare query & its variables
        const query = `
            query($slug: String!) {
                reviewList: getReviewsByProductSlug(slug: $slug) {
                    reviews {
                        _id
                        user {
                            username
                        }
                        comment
                        stars
                        createdAt
                    }
                    userReview {
                        _id
                        user {
                            username
                        }
                        comment
                        stars
                        createdAt
                    }
                    overviews {
                        oneStar
                        twoStar
                        threeStar
                        fourStar
                        fiveStar
                        total
                    }
                }
            }
        `;

        const variables = {
            filter: {
                slug
            },
            slug
        };

        const { data } = await axios({
            method: 'POST',
            url: '/api/query',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                query,
                variables
            },
        });

        return data.reviewList;

    } catch {
        return null;
    }
}