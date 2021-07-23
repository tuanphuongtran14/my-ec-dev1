import Link from 'next/link'

const pro = ({ currentProducts, filter }) => {
    const productsFilter = () => {
        // filter brand
        if (filter.brand === "0" || filter.price === "0" || filter.ram === "0" || filter.rom === "0")
            currentProducts = (currentProducts)
        if (filter.brand != "0")
            currentProducts = (currentProducts.filter(product => product.brand.slug === filter.brand))
        // filter price
        if (filter.price === "duoi-5-trieu")
            currentProducts = (currentProducts.filter(product => product.finalPrice <= 5000000))
        else if (filter.price === "tu-5-den-10-trieu")
            currentProducts = (currentProducts.filter(product => product.finalPrice >= 5000000 && product.finalPrice <= 10000000))
        else if (filter.price === "tu-10-den-15-trieu")
            currentProducts = (currentProducts.filter(product => product.finalPrice >= 10000000 && product.finalPrice <= 15000000))
        else if (filter.price === "tren-15-trieu")
            currentProducts = (currentProducts.filter(product => product.finalPrice >= 15000000))
        // filter ram
        if (filter.ram === "duoi-4")
            currentProducts = (currentProducts.filter(product => product.ram <= 4))
        else if (filter.ram === "4-den-6")
            currentProducts = (currentProducts.filter(product => product.ram >= 4 && product.ram <= 6))
        else if (filter.ram === "tren-8")
            currentProducts = (currentProducts.filter(product => product.ram >= 8))
        // filter rom
        if (filter.rom === "duoi-32")
            currentProducts = (currentProducts.filter(product => product.rom <= 32))
        else if (filter.rom === "32-den-64")
            currentProducts = (currentProducts.filter(product => product.rom >= 32 && product.rom <= 64))
        else if (filter.rom === "128-den-256")
            currentProducts = (currentProducts.filter(product => product.rom >= 128 && product.rom <= 256))
        else if (filter.rom === "tren-512")
            currentProducts = (currentProducts.filter(product => product.rom >= 512))
        return currentProducts
    }

    const products = productsFilter()

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