import Head from 'next/head'
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
//import '../_app'
//import '../_document'

export default function OrderDetail() {

  
  const OrderDetail = () => (
  <div>
      <nav class="breadcrumb breadcrumb--custom my-1">
            <div class="container px-0">
                <a class="breadcrumb-item" href="#">Trang chủ</a>
                <span class="breadcrumb-item active">Quản lý đơn hàng</span>
            </div>
        </nav>
        
        <div class="container-fluid" style={{backgroundColor: "#f0f0f0"}}>
          <div class="container py-4">
              <div class="row">
                  <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <div>
                          <h2 class="bill-detail__title">Chi tiết đơn hàng #353435343</h2>
                      </div>
                      <div class="shadow" style={{backgroundColor: "#fff",padding: '26px'}}>
                                <span class="button-link">
                                      <a href="">Đánh giá</a>
                                  </span>
                                  <span  class="button-link">
                                      <a href="">Mua lại</a>
                                  </span>
                          <table style={{width: '100%'}} class="bill-detail">
                                
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
                                  
                                  <tr>
                                      <td>
                                          <div class="product-item">
                                                  <span>
                                                      <img src="./img/products/thumb_IP12Pro_VN_1-300x300.jpg"/>
                                                  </span>
                                                  <p class="product-name">Bàn phím cơ DareU EK880 RGB Brown Switch - Hàng chính hãng</p>
                                          </div>
                                      </td>
                                      <td class="price">708.900 ₫</td>
                                      <td>Đã giao</td>
                                      <td class="quantity">1</td>
                                      <td class="discount-amount">0 ₫</td>
                                      <td class="raw-total">708.900 ₫</td>
                                  </tr>
                              </tbody>
                              <tfoot>
                                  <tr>
                                      <td colspan="4"><span><b>Tạm tính:</b></span></td>
                                      <td>708.900 ₫</td>
                                  </tr>
                                  <tr>
                                      <td colspan="4"><span><b>Phí vận chuyển:</b></span></td>
                                      <td>0 ₫</td>
                                  </tr>
                                  <tr>
                                      <td colspan="4"><span><b>Tổng cộng:</b></span></td>
                                      <td><span class="sum">708.900 ₫</span></td>
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
    <body id="body">
      <div id="root">
        <Head>
          <title>Chi tiết đơn hàng</title>
          <link rel="stylesheet" href="./css/customer-info.css"/>
        </Head>
        <Header />
        <OrderDetail />
        <Footer />
      </div>
    </body>
  )
}
