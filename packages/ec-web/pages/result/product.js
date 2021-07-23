import Link from 'next/link'

const pro = ({ currentProducts }) => {

    const products = currentProducts

    var product = products.map((product, index) => {
        const regularPrice = product.regularPrice.toLocaleString("DE-de");
        const finalPrice = product.finalPrice.toLocaleString("DE-de");

        return (
            <div className="product">
                <img src={process.env.NEXT_PUBLIC_API_URL + product.thumbnail.url} alt="" className="product__img mb-4" style={{ maxHeight: "204px", maxWidth: "204px" }} />
                <span className="product__title">
                    <Link href="/product/[slug]" as={`/product/${product.slug}`}>
                        {product.name}
                    </Link>
                </span>
                <div className="product__price">
                    {product.salesPercentage === 0 ?
                        null :
                        <span className="sales-price">
                            {finalPrice}₫
                        </span>
                    }

                    <span className="regular-price">{regularPrice}₫</span>
                </div>
                <div className="product__rating">
                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                    <i className="fa product__rating-icon fa-star" aria-hidden="true"></i>
                    <i className="fa product__rating-icon  fa-star-half" aria-hidden="true"></i>
                    <span>(442 đánh giá)</span>
                </div>
                {product.salesPercentage === 0 ?
                    "" :
                    <div className="product__box-sticker">
                        <p className="sticker-percent">
                            -{product.salesPercentage}%
                        </p>
                    </div>
                }
            </div>
        )
    })
    return (
        <>
            {product}
        </>
    );
}

export default pro