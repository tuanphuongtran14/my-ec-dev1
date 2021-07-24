import Head from 'next/head'
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer'
import { GET_ALL_ITEMS_CART } from '../../components/Checkout/queries';
import { ApolloClient, InMemoryCache} from '@apollo/client';

export const getStaticProps = async() =>
{
    const client = new ApolloClient({
        uri: `http://localhost:1337/graphql`,
        cache: new InMemoryCache(),
    });

    const {data } = await client.query({query: GET_ALL_ITEMS_CART});

    return {
        props: {
            itemList: data.getCart.items,
            total: data.getCart
        }
    }
}

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
                <a href="/" class="breadcrumb-item">Trang chủ</a>
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
                    <button type="button" class="btn btn-success w-100 my-3">Đặt hàng</button>
                    </div>
                </div>
                <div class="payment__product col-12 col-lg-4">
                    <div class=" bg-white p-3"> 
                        <h2 class="title">Chi tiết đơn hàng</h2>
                        {itemList.map((item) =>(
                                <div class="form-group w-100">
                                    <div class="card text-white bg-white text-dark my-3 p-3"> 
                                     <div class="row no-gutters"> 
                                        <div class="col-4 item-thumbnail"> 
                                            <img class="img-fluid"
                                            src={process.env.NEXT_PUBLIC_API_URL + item.product.thumbnail.url}
                                            alt=""></img>
                                        </div>
                                        <div class="col-8"> 
                                            <div class="card-body py-0 pr-0"> 
                                                <span class="card-text font-weight-bold">{item.product.name}</span>
                                                <div class="card-text my-2 payment__quantity">
                                                    Số lượng:
                                                    <input class="ml-2 quantity__input" disabled="true" value={item.qty} min="0"/>
                                                </div>
                                                Đơn giá:<span id="price1" class="card-text item-price"> {item.amount.toLocaleString("DE-de")} VND</span> 
                                            </div>
                                        </div>
                                     </div>
                                    </div>
                                </div>
                            ))
                        }
                        <div class="d-flex justify-content-around mt-5">
                            <span>Tổng tiền:</span>
                            <span class="total-price">{total.finalAmount.toLocaleString("DE-de")} VND   </span>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
            
        </div>
    )
}

export default payment;