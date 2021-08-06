import Head from "next/head";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import React from "react";
import { userApi } from "../../apis";
import { orderApi } from "../../apis";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from 'next/link'

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql,
} from "@apollo/client";

const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
    cache: new InMemoryCache(),
});

export default function Customer() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({});
  const [userOrder, setUserOrder] = useState([]);
  useEffect(async () => {
    const data = await userApi.me();
    const {orders} = await userApi.getUserOrders();
    //console.log(data)
    //console.log(orders);
    setUserInfo(data.me);
    setUserOrder(orders);
  }, []);

    const Address = (props) => (
        <div>
            <label for="address">{props.address}</label>
            <input
                className="input-address__radio"
                type="radio"
                id="address"
                name="address"
            />
            <span className="delete-address">
                <a href="">Xóa</a>
            </span>
            <br />
        </div>
    );

  const OrderProduct = (props) => (
    <tr className="control-show__order">
      <td>
        <a href="">{props.maDonHang}</a>
      </td>
      <td>{props.diaChiGiaoHang}</td>
      <td className="order-moble">{props.giaSanPham} ₫</td>
      <td className="order-moble">{props.trangThaiDonHang}</td>
    </tr>
  );

  const Order = () =>
  userOrder.map((order) => (
      <OrderProduct
        maDonHang={order.orderCode}
        diaChiGiaoHang={order.addressLine1}
        giaSanPham={order.finalAmount}
        trangThaiDonHang={order.status}
      />
    ));

    useEffect(() => {
        function customerToggle() {
            const account = document.getElementById("show-account");
            const order = document.getElementById("show-order");
            const changePasswordShow = document.getElementById(
                "change-password__show"
            );
            const changePassword = document.querySelector(
                "input[name=change-password]"
            );

            account.style.display = "block";
            order.style.display = "none";
            changePasswordShow.style.display = "none";

            document
                .getElementById("account-event")
                .addEventListener("click", function () {
                    account.style.display = "block";
                    order.style.display = "none";
                });
            document
                .getElementById("order-event")
                .addEventListener("click", function () {
                    account.style.display = "none";
                    order.style.display = "block";
                });
            changePassword.addEventListener("change", function () {
                if (this.checked) {
                    changePasswordShow.style.display = "flex";
                } else {
                    changePasswordShow.style.display = "none";
                }
            });
        }
        customerToggle();
    });

  const Customer = () => (
    <div>
      <div className="container-fluid" style={{ backgroundColor: "#f0f0f0" }}>
        <div className="container py-4">
          <div className="row manage-resposive">
            <div className="col-sm-3 col-md-3 col-lg-3 col-xl-3">
              <div
                className="row"
                style={{ paddingLeft: "15px", width: "300px" }}
              >
                <div className="account">
                  <img
                    className="account__img"
                    src="https://www.nicepng.com/png/full/136-1366211_group-of-10-guys-login-user-icon-png.png"                    alt=""
                  />
                  <div className="account__info">
                    Tài khoản của
                    <strong>{userInfo.username}</strong>
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <ul className="list-group">
                  <li
                    className="list-group-item list-group-item__edit"
                    id="account-event"
                  >
                    <a  className="account-list-info">
                      <i className="fas account-list-info__icon fa-user-circle"></i>
                      <span>Thông tin tài khoản</span>
                    </a>
                  </li>
                  <li
                    className="list-group-item list-group-item__edit"
                    id="order-event"
                  >
                    <a  className="account-list-info">
                      <i className="fas account-list-info__icon fa-th-list"></i>
                      <span>Quản lý đơn hàng</span>
                    </a>
                  </li>
                  <li className="list-group-item list-group-item__edit">
                    <a href="" className="account-list-info wish-list-event">
                      <i className="fas account-list-info__icon fa-sign-out-alt"></i>
                      <span>Đăng xuất</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div
              className="col-sm-9 col-md-9 col-lg-9 col-xl-9 account-detail"
              id="show-account"
            >
              <div className="">
                <h2 className="account-detail__title">Thông tin tài khoản</h2>
              </div>
              <div className="shadow">
                <form className="account-detail__form">
                  <div className="form-group row account-form-edit container">
                    <label for="name" className="col-sm-2 col-form-label">
                      Tên người dùng
                    </label>
                    <input
                        type="text"
                        className="form-control col-sm-10"
                        id="name"
                        value={userInfo.username}
                        disabled
                      />
                  </div>
                  <div className="form-group row account-form-edit container">
                    <label for="name" className="col-sm-2 col-form-label">
                      Họ tên
                    </label>
                    <input
                        type="text"
                        className="form-control col-sm-10"
                        id="name"
                        placeholder={userInfo.name}
                      />
                  </div>
                  <div className="form-group row account-form-edit container">
                    <label for="phone" className="col-sm-2 col-form-label">
                      Số điện thoại
                    </label>
                    <input
                        type="text"
                        className="form-control col-sm-10"
                        id="phone"
                        placeholder={userInfo.phone}
                      />
                  </div>
                  <div className="form-group row account-form-edit container">
                    <label for="email" className="col-sm-2  col-form-label">
                      Email
                    </label>
                     <input
                        type="email"
                        className="form-control col-sm-10"
                        id="email"
                        placeholder={userInfo.email}
                      />
                  </div>
                  {/*<div className="form-group account-form-edit row">
                                  <label for="address" className="col-sm-2 col-form-label">Địa chỉ của bạn</label>
                                  <div className="col-sm-10">
                                    <Address 
                                      address='Đội 8 thôn 3 xã Tiên Mỹ huyện Tiên Phước tỉnh Quảng Nam'
                                    />
                                    <Address 
                                      address='Đội 6 thôn 9 xã Tiên Mỹ huyện Tiên Phước tỉnh Quảng Nam'
                                    />
                                    <Address 
                                      address='Đội 4 thôn 7 xã Tiên Mỹ huyện Tiên Phước tỉnh Quảng Nam'
                                    />
                                    <br></br>
                                  </div>
                                </div>
                                <div className="form-group account-form-edit row">
                                    <label for="add-address" className="col-sm-2 col-form-label">Thêm địa chỉ</label>
                                    <input type="text" className="form-control" id="add-address" placeholder="Nhập vào chi tiết địa chỉ của bạn"/>
                                </div>*/}
                                    <div className="form-group row">
                                        <div className="col-sm-2"></div>
                                        <div className="col-sm-10">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="change-password"
                                                    name="change-password"
                                                />
                                                <label
                                                    className="form-check-label"
                                                    for="change-password"
                                                >
                                                    Thay đổi mật khẩu
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="form-group account-form-edit row"
                                        id="change-password__show"
                                    >
                                        <label
                                            for="old-password"
                                            className="col-sm-2 col-form-label"
                                        >
                                            Mật khẩu cũ
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="old-password"
                                            placeholder="Nhập mật khẩu cũ"
                                        />
                                        <label
                                            for="new-password"
                                            className="col-sm-2 col-form-label"
                                        >
                                            Mật khẩu mới
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="new-password"
                                            placeholder="Nhập mật khẩu mới"
                                        />
                                        <label
                                            for="confirm-password"
                                            className="col-sm-2 col-form-label"
                                        >
                                            Xác nhận mật khẩu mới
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="confirm-password"
                                            placeholder="Nhập lại mật khẩu mới"
                                        />
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-2"></div>
                                        <div className="col-sm-10">
                                            <button type="submit" className="btn btn-primary">
                                                Cập nhập
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div
                            className="col-sm-9 col-md-9 col-lg-9 col-xl-9 info-your-order"
                            id="show-order"
                            style={{ backgroundColor: "#f0f0f0" }}
                        >
                          Thay đổi mật khẩu
                        </label>
                      </div>
                    </div>
                  </div>
                  <div
                    className="form-group account-form-edit row container"
                    id="change-password__show"
                  >
                    <label
                      for="old-password"
                      className="col-sm-2 col-form-label"
                    >
                      Mật khẩu cũ
                    </label>
                    <input
                      type="text"
                      className="form-control col-sm-10"
                      id="old-password"
                      placeholder="Nhập mật khẩu cũ"
                    />
                    <label
                      for="new-password"
                      className="col-sm-2 col-form-label"
                    >
                      Mật khẩu mới
                    </label>
                    <input
                      type="text"
                      className="form-control col-sm-10"
                      id="new-password"
                      placeholder="Nhập mật khẩu mới"
                    />
                    <label
                      for="confirm-password"
                      className="col-sm-2 col-form-label"
                    >
                      Xác nhận mật khẩu mới
                    </label>
                    <input
                      type="text"
                      className="form-control col-sm-10"
                      id="confirm-password"
                      placeholder="Nhập lại mật khẩu mới"
                    />
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-10">
                      <button type="submit" className="btn btn-primary">
                        Cập nhập
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div
              className="col-sm-9 col-md-9 col-lg-9 col-xl-9 info-your-order"
              id="show-order"
              style={{ backgroundColor: "#f0f0f0" }}
            >
              <div className="">
                <h2 className="account-detail__title ">Đơn hàng của bạn</h2>
              </div>
              <div
                className="manage-order shadow"
                style={{ backgroundColor: "#fff", padding: "20px" }}
              >
                <table style={{width: "100%"}}>
                  <thead>
                    <tr className="control-show__order">
                      <th>Mã đơn hàng</th>
                      <th className="order-moble">Địa chỉ giao hàng</th>
                      <th className="order-moble">Tổng tiền</th>
                      <th className="order-moble">Trạng thái đơn hàng</th>
                    </tr>
                  </thead>
                  <tbody>
                    <Order />
                  </tbody>
                </table> 
              </div>
            </div>
        </div>
    );

    return (
        <div>
            <div id="root">
                <Head>
                    <title>Thông tin tài khoản</title>
                    <link rel="stylesheet" href="./css/customer-info.css" />
                </Head>
                <Header />
                <Customer />
                <Footer />
            </div>
            <script src="./js/customer-info.js"></script>
        </div>
    );
}
