import React from "react";
import {
  ApolloClient, HttpLink,ApolloProvider, ApolloLink, InMemoryCache, concat,useQuery,
  gql
} from "@apollo/client";

const httpLink = new HttpLink({ uri: 'http://localhost:1337/graphql' });

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTgxMmYyMzkzOGU5MzRiNGE5ZjBmZiIsImlhdCI6MTYyNTgyMjA0MiwiZXhwIjoxNjI4NDE0MDQyfQ.moLVkY18c8mAsybvXXLJju7gNIXP30mvbOuwLvAhWFA"||null,
    }
  }));

  return forward(operation);
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});


const EXCHANGE_RATES = gql`
  query {
    getCart {
      items {
        id
        product {
          name,
          price,
          thumbnail {
            url
          }
        },
        color,
        qty,
        price
      }
      user {
        username
      }
    }
  }
`;

function ProductItem() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.getCart.items.map((item) => (
    <div className="items" key={item.id}>
      <div className="check-item">
        <div className="check-item-left">
          <input type="checkbox" className="checkbox-wrap__input" />
          <img
            src="https://didongviet.vn/pub/media/catalog/product//i/p/iphone-12-didongviet_1.jpg"
            alt="iphone"
            className="check-item-left__img"
          />
          <span>{item.product.name}</span>
        </div>
        <div className="check-item-middle">
          <div className="btn-group middle-btn">
            <button type="button" className="btn btn-outline-secondary">
              -
            </button>
            <button type="button" className="btn btn-outline-dark">
              1
            </button>
            <button type="button" className="btn btn-outline-secondary">
              +
            </button>
          </div>
          <div className="middle-color">
            <label htmlFor="select-color">Màu:</label>
            <select name="color" id="select-color">
              <option value="den">Đen</option>
              <option value="hong">Hồng</option>
              <option value="trang">Trắng</option>
              <option value="xanh">Xanh</option>
            </select>
          </div>
        </div>
        <div className="check-item-right">
          <span>{item.price}đ</span>
          <div className="item-right-icon">
            <i className="far fa-heart"></i>
            <i className="far fa-trash-alt"></i>
          </div>
        </div>
      </div>
    </div>
  ));
}

const Cart = () => {
  return (
    <ApolloProvider client={client}>
      <div className="all">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <div className="grid wide d-flex">
              <li className="breadcrumb-item">
                <h6>Home</h6>
              </li>
              <li className="breadcrumb-item">
                <h6>Cart</h6>
              </li>
            </div>
          </ol>
        </nav>
        <div className="cart">
          <div className="grid wide">
            <div className="row">
              <div className="col l-8 md-8 c-12 overflow-auto ">
                <div className="select-all">
                  <div className="checkbox-wrap">
                    <input
                      type="checkbox"
                      className="checkbox-wrap__input"
                      id="checkbox__input"
                    />
                    <label htmlFor="checkbox__input" className="ml-2">
                      Chọn tất cả (1 sản phẩm)
                    </label>
                  </div>
                  <div className="delete-all">
                    <i className="far fa-trash-alt mr-2"></i>
                    <span>Xóa</span>
                  </div>
                </div>
                <ProductItem/>
              </div>
              <div className="col l-4 md-4 c-12 cart-checkout">
                <h4>Thông tin đơn hàng</h4>
                <div className="price">
                  <h6>Tạm Tính (1 SP)</h6>
                  <span>25.000.000đ</span>
                </div>
                <div className="delivery-fee">
                  <h6>Phí giao hàng</h6>
                  <span>15.000đ</span>
                </div>
                <div className="voucher">
                  <input
                    type="text"
                    placeholder="Mã giảm giá(mã chỉ áp dụng 1 lần)"
                    className="voucher__input"
                  />
                  <button
                    type="button "
                    className="btn btn-success voucher__btn"
                  >
                    Áp Dụng
                  </button>
                </div>
                <div className="total">
                  <h6 className="total__title">Tổng Cộng:</h6>
                  <span className="total__price">25.015.000đ</span>
                </div>
                <div className="checkout">
                  <button type="button" className="checkout__btn btn btn-info">
                    Thanh Toán Ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ApolloProvider>
  );
};

export default Cart;
