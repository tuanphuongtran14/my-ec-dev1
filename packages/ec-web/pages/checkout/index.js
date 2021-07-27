import Head from 'next/head'
import Link from 'next/dist/client/link';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer'
import { GET_ALL_ITEMS_CART } from '../../components/Checkout/ItemList';
import { ApolloClient, InMemoryCache} from '@apollo/client';
import Queries from '../../components/Checkout/ItemList';


const payment = ({itemList, total})=>
{
    return (
        <div>
            <Head>
                <title>CellPhone Store</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" key="title"/>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
                {/* <!-- Bootstrap CSS --> */}
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous" />
                <link rel="stylesheet" href="./vendors/flickity.min.css" />
                {/* <!-- Optional CSS --> */}
                <link rel="stylesheet" href="./css/style.css" />
            </Head>
            <Header></Header>
            <nav class="breadcrumb breadcrumb--custom my-1">
            <div class="container px-0">
                <Link href="/">
                <a class="breadcrumb-item">Trang chủ</a>
                </Link>
                <span class="breadcrumb-item active">Thanh toán</span>
            </div>
            </nav>
            <div class="payment container row mx-auto px-0">
                <div class="payment__bill col-12 col-lg-8"> 
                    <div class="bg-white p-3"> 
                        <div class="form-group "> 
                            <h2 class="title">Thông tin giao hàng</h2>
                            <div class="formItem py-3">
                                <label for="">Họ và tên</label>
                                <input type="text" class="form-control" name="name" placeholder=""></input>
                            </div>
                            <div class="formItem py-3">
                                <label for="">Số điện thoại</label>
                                <input type="text" class="form-control" name="phone" placeholder=""></input>
                            </div>
                            <div class="formItem py-3">
                                <label for="">Email</label>
                                <input type="text" class="form-control" name="mail" placeholder=""></input>
                            </div>
                            <label for="">Tỉnh Thành</label>
                            <select class="form-control my-2" name="" id="">
                                <option>Chọn tỉnh / thành phố</option>
                                <option>An Giang</option>
                                <option>Bà Rịa - Vũng Tàu</option>
                                <option>Bạc Liêu</option>
                                <option>Bắc Kạn</option>
                                <option>Bắc Giang</option>
                                <option>Bắc Ninh</option>
                                <option>Bến Tre</option>
                                <option>Bình Dương</option>
                                <option>Bình Định</option>
                                <option>Bình Phước</option>
                                <option>Bình Thuận</option>
                                <option>Cà Mau</option>
                                <option>Cao Bằng</option>
                                <option>Cần Thơ</option>
                                <option>Đà Nẵng</option>
                                <option>Đắk Lắc</option>
                                <option>Đắk Nông</option>
                                <option>Điện Biên</option>
                                <option>Đồng Nai</option>
                                <option>Đồng Tháp</option>
                                <option>Gia Lai</option>
                                <option>Hà Giang</option>
                                <option>Hà Nam</option>
                                <option>Hà Nội</option>
                                <option>Hà Tây</option>
                                <option>Hà Tĩnh</option>
                                <option>Hải Dương</option>
                                <option>Hải Phòng</option>
                                <option>Hòa Bình</option>
                                <option>Hồ Chí Minh</option>
                                <option>Hậu Giang</option>
                                <option>Hưng Yên</option>
                                <option>Khánh Hòa</option>
                                <option>Kiên Giang</option>
                                <option>Kon Tum</option>
                                <option>Lai Châu</option>
                                <option>Lào Cai</option>
                                <option>Lạng Sơn</option>
                                <option>Lâm Đồng</option>
                                <option>Long An</option>
                                <option>Nam Định</option>
                                <option>Nghệ An</option>
                                <option>Ninh Bình</option>
                                <option>Ninh Thuận</option>
                                <option>Phú Thọ</option>
                                <option>Phú Yên</option>
                                <option>Quảng Bình</option>
                                <option>Quảng Nam</option>
                                <option>Quảng Ngãi</option>
                                <option>Quảng Ninh</option>
                                <option>Quảng Trị</option>
                                <option>Sóc Trăng</option>
                                <option>Sơn La</option>
                                <option>Tây Ninh</option>
                                <option>Thái Bình</option>
                                <option>Thái Nguyên</option>
                                <option>Thanh Hóa</option>
                                <option>Thừa Thiên Huế</option>
                                <option>Tiền Giang</option>
                                <option>Trà Vinh</option>
                                <option>Tuyên Quang</option>
                                <option>Vĩnh Long</option>
                                <option>Vĩnh Phúc</option>
                                <option>Yên Bái</option>
                            </select>
                            <div class="formItem py-3">
                                <label for="">Địa chỉ chi tiết</label>
                                <input type="text" class="form-control" name="address" placeholder=""></input>
                            </div>
                        </div>
                        <Link href="/payment">
                     
                    <button type="button" class="btn btn-success w-100 my-3">Tiến hành thanh toán</button>
                    </Link>
                    </div>
                </div>
                <div class="payment__product col-12 col-lg-4">
                    <div class=" bg-white p-3"> 
                        <h2 class="title">Chi tiết đơn hàng</h2>
                        <Queries></Queries>
                    </div>
                </div>
            </div>
            <Footer></Footer>
            
        </div>
    )
}

export default payment;