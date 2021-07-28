import Head from 'next/head'
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

export default function Customer() {

  const Address = (props) => (
    <div>
      <label for="address" >{props.address}</label>
      <input className="input-address__radio" type="radio" id="address" name="address"/>
      <span className="delete-address"><a href="">Xóa</a></span><br/>
  </div>
  )

  const OrderProduct = (props) => (
    <tr className="control-show__order">
      <td>
          <a href="">{props.maDonHang}</a>
      </td>
      <td>{props.tenSanPham}</td>
      <td className="order-moble">{props.giaSanPham} ₫</td>
      <td className="order-moble">{props.trangThaiDonHang}</td>
    </tr>
  )

  const Customer = () => (
  <div onload="customerToggle()">
      <div className="container-fluid"style={{backgroundColor: '#f0f0f0'}}>
            <div className="container py-4">
                <div className="row manage-resposive">
                    <div className="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                        {/*<div className="row"  style={{paddingLeft: '0.9375em',width: '18.75em'}}>*/}
                        <div className="row"  style={{paddingLeft: '15px',width: '300px'}}>
                            <div className="account">
                                <img className="account__img"src="https://lh4.googleusercontent.com/-HBXyAHCrURI/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucl3I6rOPCyi3anNHc8C8CKj9ItxMA/s96-c-rg-br100/photo.jpg" alt=""/>
                                <div className="account__info">
                                    Tài khoản của
                                    <strong>Minh Tâm</strong>
                                </div>
                            </div>
                        </div>
                        <div className="mt-2">
                            <ul className="list-group">
                                <li className="list-group-item list-group-item__edit" id="account-event">
                                    <a href="" className="account-list-info">
                                        <i className="fas account-list-info__icon fa-user-circle"></i>
                                        <span>Thông tin tài khoản</span>
                                    </a>
                                </li>
                                <li className="list-group-item list-group-item__edit" id="order-event">
                                    <a href="" className="account-list-info">
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
                    <div className="col-sm-9 col-md-9 col-lg-9 col-xl-9 account-detail" id="show-account">
                        <div className="">
                            <h2 className="account-detail__title">Thông tin tài khoản</h2>
                        </div>
                        <div className="shadow">
                            <form className="account-detail__form">
                                <div className="form-group row account-form-edit">
                                    <label for="name" className="col-sm-2 col-form-label">Tên tài khoản</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="name" placeholder="Tên đăng nhập" value="Minh Tâm" disabled/>
                                    </div>
                                </div>
                                <div className="form-group row account-form-edit">
                                    <label for="name" className="col-sm-2 col-form-label">Họ tên</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="name" placeholder="Đỗ Văn Sa"/>
                                    </div>
                                </div>
                                <div className="form-group row account-form-edit">
                                    <label for="phone" className="col-sm-2 col-form-label">Số điện thoại</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="phone" placeholder="123456789" />
                                    </div>
                                </div>
                                <div className="form-group row account-form-edit">
                                    <label for="email" className="col-sm-2  col-form-label">Email</label>
                                    <div className="col-sm-10">
                                        <input type="email" className="form-control" id="email" placeholder="xxxxx@gmail.com"/>
                                    </div>
                                </div>
                                <div className="form-group account-form-edit row">
                                  <label className="input-label col-sm-2" for="gender">Giới tính</label>
                                  <div className="col-sm-10">
                                      <div className="custom-control custom-radio custom-control-inline">
                                          <input type="radio" id="male" name="gender" className="custom-control-input"/>
                                          <label  for="male" className="custom-control-label">Nam</label>
                                      </div>
                                      <div className="custom-control custom-radio custom-control-inline">
                                          <input type="radio" id="female"  name="gender" className="custom-control-input"/>
                                          <label for="female" className="custom-control-label">Nữ</label>
                                      </div>
                                  </div>
                                </div>
                                <div className="form-group account-form-edit row">
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
                                </div>
                                <div className="form-group row">
                                  <div className="col-sm-2"></div>
                                  <div className="col-sm-10">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="change-password" name="change-password"/>
                                        <label className="form-check-label" for="change-password">
                                            Thay đổi mật khẩu
                                        </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="form-group account-form-edit row" id="change-password__show">
                                    <label for="old-password" className="col-sm-2 col-form-label">Mật khẩu cũ</label>
                                    <input type="text" className="form-control" id="old-password" placeholder="Nhập mật khẩu cũ"/>
                                    <label for="new-password" className="col-sm-2 col-form-label">Mật khẩu mới</label>
                                    <input type="text" className="form-control" id="new-password" placeholder="Nhập mật khẩu mới"/>
                                    <label for="confirm-password" className="col-sm-2 col-form-label">Xác nhận mật khẩu mới</label>
                                    <input type="text" className="form-control" id="confirm-password" placeholder="Nhập lại mật khẩu mới"/>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-2"></div>
                                    <div className="col-sm-10">
                                        <button type="submit" className="btn btn-primary">Cập nhập</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-sm-9 col-md-9 col-lg-9 col-xl-9 info-your-order" id="show-order" style={{backgroundColor: '#f0f0f0'}}>
                        <div className="">
                          <h2 className="account-detail__title ">Đơn hàng của bạn</h2>
                        </div>
                        <div className="manage-order shadow"  style={{backgroundColor: "#fff",padding: "20px"}}>
                        <table> 
                            <thead>
                            <tr className="control-show__order">
                                <th>Mã đơn hàng</th>
                                <th column4>Sản phẩm</th>
                                <th className="order-moble">Tổng tiền</th>
                                <th className="order-moble">Trạng thái đơn hàng</th>
                            </tr>
                            </thead>
                            <tbody>
                              <OrderProduct 
                                maDonHang='424724283'
                                tenSanPham='Bàn phím cơ DareU EK880 RGB Brown Switch - Hàng chính hãng'
                                giaSanPham='708.900'
                                trangThaiDonHang='Giao hàng thành công'
                              />
                              <OrderProduct 
                                maDonHang='424724283'
                                tenSanPham='Bàn phím cơ DareU EK880 RGB Brown Switch - Hàng chính hãng'
                                giaSanPham='708.900'
                                trangThaiDonHang='Giao hàng thành công'
                              />
                              <OrderProduct 
                                maDonHang='424724283'
                                tenSanPham='Bàn phím cơ DareU EK880 RGB Brown Switch - Hàng chính hãng'
                                giaSanPham='708.900'
                                trangThaiDonHang='Giao hàng thành công'
                              />
                              <OrderProduct 
                                maDonHang='424724283'
                                tenSanPham='Bàn phím cơ DareU EK880 RGB Brown Switch - Hàng chính hãng'
                                giaSanPham='708.900'
                                trangThaiDonHang='Giao hàng thành công'
                              />
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    {/*<script src="./js/customer-info.js"/>*/}
  </div>
  ) 
    
  return (
    <div>
        <body id="body">
        <div id="root">
          <Head>
            <title>Thông tin tài khoản</title>
            <link rel="stylesheet" href="./css/customer-info.css"/>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous"/>
          </Head>
          <Header />
          <Customer />
          <Footer />
        </div>
      </body>
      <script src="./js/customer-info.js"></script>
    </div>
  )
}
