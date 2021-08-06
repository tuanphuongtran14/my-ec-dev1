import Head from 'next/head'
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import client from '../../../components/Category/apolloClient'
import { gql } from "@apollo/client";

export const getServerSideProps = async ({ params }) => {
    const { data } = await client.query({
        query: gql`
            query($id: ID!){
                order (id : $id){
                    id
                    orderId
                    items{
                        product{
                            name
                            regularPrice
                            finalPrice
                            thumbnail{
                                url
                            }
                        }
                        qty
                    }
                    coupon{
                        discountAmount
                    }
                    isPaid
                    status
                    finalAmount
                }
            }
        `,
        variables: {
            id: params.id
        }
    })
    return {
        props: {
            order: data.order
        }
    }
}

export default function OrderDetail({ order }) {

    const item = order.items.map(item => {
        return (
            <tr>
                <td>
                    <div class="product-item">
                            <img src={process.env.NEXT_PUBLIC_API_URL + item.product.thumbnail.url}  style={{width: "20vh"}}/>
                        <span class="product-name">{item.product.name}</span>
                    </div>
                </td>
                <td class="price">{item.product.regularPrice.toLocaleString("DE-de")} ₫</td>
                <td>{order.status}</td>
                <td class="quantity">{item.qty}</td>
                <td class="discount-amount">{order.coupon === null ? 0 : order.coupon.discountAmount.toLocaleString("DE-de")} ₫</td>
                <td class="raw-total">{item.product.finalPrice.toLocaleString("DE-de")} ₫</td>
            </tr>
        )
    })

    const OrderDetail = () => (
        <div>
            <nav class="breadcrumb breadcrumb--custom my-1">
                <div class="container px-0">
                    <a class="breadcrumb-item" href="#">Trang chủ</a>
                    <span class="breadcrumb-item active">Quản lý đơn hàng</span>
                </div>
            </nav>

            <div class="container-fluid" style={{ backgroundColor: "#f0f0f0" }}>
                <div class="container py-4">
                    <div class="row">
                        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <div>
                                <h2 class="bill-detail__title">Chi tiết đơn hàng #{order.orderId}</h2>
                            </div>
                            <div class="shadow" style={{ backgroundColor: "#fff", padding: '26px' }}>
                                <span class="button-link">
                                    <a href="">Đánh giá</a>
                                </span>
                                <span class="button-link">
                                    <a href="">Mua lại</a>
                                </span>
                                <table style={{ width: '100%' }} class="bill-detail">

                                    <thead>
                                        <tr>
                                            <th>Sản phẩm</th>
                                            <th>Giá</th>
                                            <th>Trạng thái</th>
                                            <th>Số lượng</th>
                                            <th>Giảm giá</th>
                                            <th>Tạm tính</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {item}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colspan="4"><span><b>Tạm tính:</b></span></td>
                                            <td>{order.finalAmount.toLocaleString("DE-de")} ₫</td>
                                        </tr>
                                        <tr>
                                            <td colspan="4"><span><b>Phí vận chuyển:</b></span></td>
                                            <td>0 ₫</td>
                                        </tr>
                                        <tr>
                                            <td colspan="4"><span><b>Tổng cộng:</b></span></td>
                                            <td><span class="sum">{order.finalAmount.toLocaleString("DE-de")} ₫</span></td>
                                        </tr>

                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <div id="root">
            <Head>
                <title>Chi tiết đơn hàng</title>
                <link rel="stylesheet" href="./css/customer-info.css" />
            </Head>
            <Header />
            <OrderDetail />
            <Footer />
        </div>
    )
}
