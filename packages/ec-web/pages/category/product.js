import Link from 'next/link'

export default ({currentProducts}) => {
    var product = currentProducts.map((product, index) => {
        const regularPrice = parseInt(product.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.').slice(0, -3);
        const salePrice = (product.price - (product.price * product.salespercentage / 100)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.').slice(0, -3);

        return (
            <div className="product">
                <img src={process.env.NEXT_PUBLIC_API_URL + product.thumbnail.url} alt="" className="product__img mb-4" />
                <span className="product__title">
                    <Link href="/product/[idProduct]" as={`/product/${product.id}`}>
                        {product.name}
                    </Link>
                </span>
                <div className="product__price">
                    {product.salespercentage == 0 ?
                        null :
                        <span className="sales-price">
                            {salePrice}₫
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
                    <span>({product.votes})</span>
                </div>
                {product.salespercentage == 0 ?
                    "" :
                    <div className="product__box-sticker">
                        <p className="sticker-percent">
                            -{product.salespercentage}%
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