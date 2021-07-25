import React from "react";
import Header from "../../components/Header/Header";
import Banner from "../../components/Banner/Banner";
import Footer from "../../components/Footer/Footer";
import Head from "next/head";

export default function Login() {

    return (
        <>
            <Head>
                <title>Thanh toán</title>
            </Head>
            <Header></Header>
            <Banner></Banner>

            <div className="payment container row mx-auto px-0">
                <div className="payment__bill col-12 col-lg-8">
                    <div className="bg-white p-3">
                        <div className="form-group w-100">
                            <b>
                                <h2 className="title">Phương thức thanh toán</h2>
                            </b>
                            <div className="row m-3">
                                <div className="col-12 accordion" id="thanhtoan">
                                    <div className="card text-dark">
                                        <div className="card-header" id="headingDirect">
                                            <button className="btn btn-link btn-block text-left" data-toggle="collapse" data-target="#collapseDirect" aria-expanded="false" aria-controls="collapseDirect">
                                                <label>
                                                    <input type="radio" name="phuongThuc" id defaultValue className="mr-3" checked />
                                                    Thanh toán khi nhận hàng (COD)
                                                </label>
                                            </button>
                                        </div>
                                        <div id="collapseDirect" class="collapse show" aria-labelledby="headingDirect" data-parent="#thanhtoan">
                                            <div className="card-body mx-auto">
                                                <h5 className="text-danger">Cửa hàng thực hiện chương trình miễn phí vận chuyển cho đơn hàng trên 5 triệu đồng!</h5>
                                                <p>Với phương thức thanh toán này, quý khách trả tiền mặt cho nhân viên giao hàng ngay khi nhận được đơn hàng của mình. Chúng tôi chấp nhận hình thức thanh toán khi nhận hàng (COD) cho hầu hết đơn hàng trên toàn quốc.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card text-dark border">
                                        <div className="card-header" id="headingVnpay">
                                            <button className="btn btn-link btn-block text-left" data-toggle="collapse" data-target="#collapseVnpay" aria-expanded="false" aria-controls="collapseVnpay">
                                                <label>
                                                    <input type="radio" name="phuongThuc" id className="mr-3" />
                                                    <span>Ví điện tử VNPAY</span>
                                                </label>
                                            </button>
                                        </div>
                                        <div id="collapseVnpay" class="collapse" aria-labelledby="headingVnpay" data-parent="#thanhtoan">
                                            <div className="card-body mx-auto">
                                                <h4 className="text-center text-success">Hướng dẫn thanh toán bằng VNPAY</h4>
                                                <ol className="container">
                                                    <li className="my-2">Đăng nhập vào ứng dụng Mobile Banking mà bạn muốn thanh toán</li>
                                                    <li className="my-2">
                                                        <p>Chọn mục <b>Quét mã QR / Scan QR Code</b></p>
                                                        <img src="./img/QRCode.png" className="" alt="qr-code" style={{ maxWidth: "230px" }} />
                                                    </li>
                                                    <li className="my-2"><p>Scan mã QR phía trên để thanh toán.</p></li>
                                                </ol>
                                                <h4 className="text-center text-success mt-5">Ứng dụng Mobile Banking hỗ trợ VNPAY</h4>
                                                <div className="col-3 d-inline-block" id="colors">
                                                    <img style={{ maxWidth: "8rem" }}
                                                        src="https://www.vnpayqr.vn/wp-content/uploads/2019/01/hd_03.png"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="col-3 d-inline-block" id="colors">
                                                    <img style={{ maxWidth: "8rem" }}
                                                        src="https://www.vnpayqr.vn/wp-content/uploads/2019/01/hd_05.png"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="col-3 d-inline-block" id="colors">
                                                    <img style={{ maxWidth: "8rem" }}
                                                        src="https://www.vnpayqr.vn/wp-content/uploads/2019/01/hd_07.png"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="col-3 d-inline-block" id="colors">
                                                    <img style={{ maxWidth: "8rem" }}
                                                        src="https://www.vnpayqr.vn/wp-content/uploads/2019/01/hd_09.png"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="col-3 d-inline-block" id="colors">
                                                    <img style={{ maxWidth: "8rem" }}
                                                        src="https://www.vnpayqr.vn/wp-content/uploads/2019/06/Screenshot_39.png"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="col-3 d-inline-block" id="colors">
                                                    <img style={{ maxWidth: "8rem" }}
                                                        src="https://www.vnpayqr.vn/wp-content/uploads/2019/06/IVB.png"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="col-3 d-inline-block" id="colors">
                                                    <img style={{ maxWidth: "8rem" }}
                                                        src="https://www.vnpayqr.vn/wp-content/uploads/2019/01/hd_25.png"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="col-3 d-inline-block" id="colors">
                                                    <img style={{ maxWidth: "8rem" }}
                                                        src="https://www.vnpayqr.vn/wp-content/uploads/2019/01/hd_26.png"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="col-3 d-inline-block" id="colors">
                                                    <img style={{ maxWidth: "8rem" }}
                                                        src="https://www.vnpayqr.vn/wp-content/uploads/2019/04/HDBANK.jpg"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="col-3 d-inline-block" id="colors">
                                                    <img style={{ maxWidth: "8rem" }}
                                                        src="https://www.vnpayqr.vn/wp-content/uploads/2019/06/sacom-01.png"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="col-3 d-inline-block" id="colors">
                                                    <img style={{ maxWidth: "8rem" }}
                                                        src="https://www.vnpayqr.vn/wp-content/uploads/2019/06/6.-Nam-%C3%81-01.jpg"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="col-3 d-inline-block" id="colors">
                                                    <img style={{ maxWidth: "8rem" }}
                                                        src="https://www.vnpayqr.vn/wp-content/uploads/2019/07/vietbank-200x140.jpg"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="col-3 d-inline-block" id="colors">
                                                    <img style={{ maxWidth: "8rem" }}
                                                        src="https://www.vnpayqr.vn/wp-content/uploads/2019/08/Logo.png"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="col-3 d-inline-block" id="colors">
                                                    <img style={{ maxWidth: "8rem" }}
                                                        src="https://www.vnpayqr.vn/wp-content/uploads/2020/04/kienbanhlogo.png"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="col-3 d-inline-block" id="colors">
                                                    <img style={{ maxWidth: "8rem" }}
                                                        src="https://www.vnpayqr.vn/wp-content/uploads/2019/01/hd_37.png"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="col-3 d-inline-block" id="colors">
                                                    <img style={{ maxWidth: "8rem" }}
                                                        src="https://www.vnpayqr.vn/wp-content/uploads/2019/06/logo_mbbank.jpg"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="col-3 d-inline-block" id="colors">
                                                    <img style={{ maxWidth: "8rem" }}
                                                        src="https://www.vnpayqr.vn/wp-content/uploads/2019/01/hd_33.png"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="col-3 d-inline-block" id="colors">
                                                    <img style={{ maxWidth: "8rem" }}
                                                        src="https://www.vnpayqr.vn/wp-content/uploads/2020/01/ocean-test-1.png"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="col-3 d-inline-block" id="colors">
                                                    <img style={{ maxWidth: "8rem" }}
                                                        src="https://vnpayqr.vn/wp-content/uploads/2019/01/hd_13.png"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="col-3 d-inline-block" id="colors">
                                                    <img style={{ maxWidth: "8rem" }}
                                                        src="https://vnpayqr.vn/wp-content/uploads/2019/06/MSB-1.jpg"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="col-3 d-inline-block" id="colors">
                                                    <img style={{ maxWidth: "8rem" }}
                                                        src="https://vnpayqr.vn/wp-content/uploads/2019/01/hd_35.png"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="col-3 d-inline-block" id="colors">
                                                    <img style={{ maxWidth: "8rem" }}
                                                        src="https://vnpayqr.vn/wp-content/uploads/2019/11/viet-a-bank.png"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="col-3 d-inline-block" id="colors">
                                                    <img style={{ maxWidth: "8rem" }}
                                                        src="https://vnpayqr.vn/wp-content/uploads/2019/08/shinhan-logo-1.jpg"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="col-3 d-inline-block" id="colors">
                                                    <img style={{ maxWidth: "8rem" }}
                                                        src="https://vnpayqr.vn/wp-content/uploads/2019/07/logo-viviet-1.png"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="col-3 d-inline-block" id="colors">
                                                    <img style={{ maxWidth: "8rem" }}
                                                        src="https://vnpayqr.vn/wp-content/uploads/2019/10/pvcombank.png"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="col-3 d-inline-block" id="colors">
                                                    <img style={{ maxWidth: "8rem" }}
                                                        src="https://vnpayqr.vn/wp-content/uploads/2019/01/hd_22.png"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="col-3 d-inline-block" id="colors">
                                                    <img style={{ maxWidth: "8rem" }}
                                                        src="https://vnpayqr.vn/wp-content/uploads/2019/06/nhdpocb.png"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="col-3 d-inline-block" id="colors">
                                                    <img style={{ maxWidth: "8rem" }}
                                                        src="https://vnpayqr.vn/wp-content/uploads/2019/04/ACB_Logo-1.png"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="col-3 d-inline-block" id="colors">
                                                    <img style={{ maxWidth: "8rem" }}
                                                        src="https://vnpayqr.vn/wp-content/uploads/2019/06/466x330.jpg"
                                                        alt=""
                                                    />
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="button" className="btn btn-success w-100 my-3">Xác nhận đơn hàng</button>
                    </div>
                </div>
                <div className="payment__product col-12 col-lg-4">
                    <div className=" bg-white p-3">
                        <h2 className="title">Chi tiết đơn hàng</h2>
                        <div className="form-group w-100">
                            <div className="card text-white bg-white text-dark my-3 p-3">
                                <div className="row no-gutters" style={{ height: '160px' }}>
                                    <div className="col-4 item-thumbnail">
                                        <img className="img-fluid" src="img/products/thumb_IP12Pro_VN_1-300x300.jpg" alt="" />
                                    </div>
                                    <div className="col-8">
                                        <div className="card-body py-0 pr-0">
                                            <span className="card-text font-weight-bold">Apple iPhone 12 Pro 128GB Chính hãng VN/A0</span>
                                            <div className="card-text my-2 payment__quantity">
                                                Số lượng:
                                                <input type="number" className="ml-2 quantity__input" defaultValue={1} min={0} />
                                            </div>
                                            Đơn giá:<span className="card-text item-price" id="giatien"> 0₫</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card text-white bg-white text-dark my-3 p-3">
                                <div className="row no-gutters" style={{ height: '160px' }}>
                                    <div className="col-4 item-thumbnail">
                                        <img className="img-fluid" src="img/products/thumb_11-ProMAX_2-300x300.jpg" alt="" />
                                    </div>
                                    <div className="col-8">
                                        <div className="card-body py-0 pr-0">
                                            <span className="card-text font-weight-bold">Apple iPhone 11 Pro MAX 64GB cũ 99%</span>
                                            <div className="card-text my-2 payment__quantity">
                                                Số lượng:
                                                <input type="number" className="ml-2 quantity__input" defaultValue={1} min={0} />
                                            </div>
                                            Đơn giá:<span id="price1" className="card-text item-price"> 8.990.000₫</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-around mt-5">
                                <span>Tổng tiền</span>
                                <span className="total-price">29.750.000 VND</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    );
}
