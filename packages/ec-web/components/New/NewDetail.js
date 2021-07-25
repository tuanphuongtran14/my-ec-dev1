import React from 'react'

const NewDetail = () => {
    return (
        <>
            <nav className="breadcrumb breadcrumb--custom my-1">
            <div className="container px-0 d-flex">
                <a className="breadcrumb-item" href="#">Trang chủ</a>
                <span className="breadcrumb-item active">Tin tức</span>
            </div>
        </nav>
        <div className="container mt-4 pt-28 px-0 mb-4" style={{"background-color": "#fff"}}>
            <div className="list-category">
                <span className="category"><a href="">Tin hot</a></span>
                <span className="category"><a href="">Tin trong ngày</a></span>
                <span className="category"><a href="">Tin tức</a></span>
                <span className="category"><a href="">Tin công nghệ</a></span>
               
            </div>
            <h1 className="entry-title">Xuất hiện lỗ hổng bảo mật trên iMessage, liệu iPhone có thực sự an toàn như Apple vẫn nói?</h1>
            <span className="date-header-news-detail">18 Tháng Bảy, 2021</span>
        </div>
        <div className="container mt-4  px-0 mb-4 news">
            <div className="col-lg-8 news-detail">
                <div className="news-detail__image">
                    <img src="../../img/News/690x300_Buds_.webp"/>
                </div>
                <div className="news-detail__text">
                    <p>Theo báo cáo từ Tổ chức Ân xá Quốc tế, iPhone không hề an toàn như những gì Apple quảng cáo. Tin tặc có thể truy cập và sao chép dữ liệu trên iPhone từ xa thông qua lỗ hổng bảo mật của iMessage.</p>
                </div>
                <div className="news-detail__title">
                    <h2>Xuất hiện lỗ hổng bảo mật trên iPhone</h2>
                </div>
                <div className="news-detail__text">
                    <p>Tổ chức Ân xá Quốc tế vừa tiết lộ một thông tin quan trọng liên quan đến vấn đề bảo mật của iPhone. Đó là tin tặc có thể truy cập và sao chép dữ liệu từ xa thông qua phần mềm Pegasus do NSO Group tạo ra. Phần mềm này hoạt động bằng cách lợi dụng lỗ hổng bảo mật trên iMessage của iPhone. Cụ thể, tin tặc sẽ dùng phần mềm Pegasus tiếp cận iPhone mà không cần chủ sở hữu tương tác với tin nhắn văn bản gửi đến. Sau đó, ăn cắp dữ liệu từ xa.</p>
                </div>
                <div className="news-detail__text">
                    <p></p>
                </div>
                <div className="news-detail__image">
                    <img src="../../img/News/690x300_Buds_.webp"/>
                </div>
                <div className="news-detail__title">
                    <h2>Xuất hiện lỗ hổng bảo mật trên iPhone</h2>
                </div>
                <div className="news-detail__text">
                    <p>Sau khi báo cáo trên xuất hiện, Apple đã lên tiếng ngay lập tức. Ivan Krstić – kỹ sư trưởng về bảo mật của Apple cho biết: “Các cuộc tấn công như thế này rất tinh vi, tốn kém đến hàng triệu USD, thường có thời gian ngắn hạn và nhắm vào các cá nhân cụ thể. Điều đó có nghĩa đây không phải là mối đe dọa đối với phần lớn khách hàng của Apple. Mặc dù vậy, chúng tôi vẫn sẽ làm việc không mệt mỏi để bảo vệ người dùng, bổ sung các biện pháp bảo vệ mới cho thiết bị và dữ liệu”.</p>
                </div>
                <div className="news-detail__text">
                    <p>Câu trả lời cho thấy Apple sẽ làm việc cật lực để bảo vệ những người dùng của mình. Họ sẽ liên tục đưa ra những biện pháp mới để ngăn chặn những cuộc tấn công của hacker. Đó là cam kết của Apple và chúng ta có thể tin tưởng. Tuy nhiên, về vấn đề bị xâm nhập bởi Pegasus, Apple chưa đưa ra thông tin khi nào sẽ khắc phục.</p>
                </div>
                <div className="news-detail__text">
                    <p>Thông tin trong bài đều được Hoàng Hà tổng hợp. Đừng quên theo dõi Hoàng Hà Mobile để cập nhật các tin tức công nghệ mới nhất nhé!</p>
                </div>
            </div>
            <div className="col-lg-4 list-news-hot">
                <h4 className="list-news-hot__title">
                    <span>Bài viết mới</span>
                </h4>
                <div className="list-news-new__item">
                    <div className="col-lg-12 list-news-new__item-img">
                        <img src="../../img/News/690x300_Buds_.webp"/>
                    </div>
                    <div className="col-lg-12 list-news-new__item-detail">
                        <h5>
                            <a href="">IPhone 12 Pro Max và iPhone 11 là 2 model giúp cổ phiếu Apple...</a>
                        </h5>
                        <span>18 Tháng Bảy, 2021</span>
                        <p>Rò rỉ thương hiệu phụ của Xiaomi là Redmi đang chuẩn bị giới thiệu mẫu Redmi K40 Ultra. Thông tin chi tiết về pin...</p>
                    </div>
                </div>
                <div className="list-news-hot__item">
                    <div className="col-lg-4 list-news-hot__item-img">
                        <img src="../../img/News/690x300_Buds_.webp"/>
                    </div>
                    <div className="col-lg-8 list-news-hot__item-detail">
                        <h5>
                            <a href="">iPhone 12 Pro Max và iPhone 11 là 2 model giúp cổ phiếu Apple...</a>
                        </h5>
                        <span className="category">Tin hot</span>
                        <span>18 Tháng Bảy, 2021</span>
                    </div>
                </div>
                <div className="list-news-hot__item">
                    <div className="col-lg-4 list-news-hot__item-img">
                        <img src="../../img/News/690x300_Buds_.webp"/>
                    </div>
                    <div className="col-lg-8 list-news-hot__item-detail">
                        <h5>
                            <a href="">iPhone 12 Pro Max và iPhone 11 là 2 model giúp cổ phiếu Apple...</a>
                        </h5>
                        <span className="category">Tin hot</span>
                        <span>18 Tháng Bảy, 2021</span>
                    </div>
                </div>
                <div className="list-news-hot__item">
                    <div className="col-lg-4 list-news-hot__item-img">
                        <img src="../../img/News/690x300_Buds_.webp"/>
                    </div>
                    <div className="col-lg-8 list-news-hot__item-detail">
                        <h5>
                            <a href="">iPhone 12 Pro Max và iPhone 11 là 2 model giúp cổ phiếu Apple...</a>
                        </h5>
                        <span className="category">Tin hot</span>
                        <span>18 Tháng Bảy, 2021</span>
                    </div>
                </div>
                <div className="list-news-hot__item">
                    <div className="col-lg-4 list-news-hot__item-img">
                        <img src="../../img/News/690x300_Buds_.webp"/>
                    </div>
                    <div className="col-lg-8 list-news-hot__item-detail">
                        <h5>
                            <a href="">iPhone 12 Pro Max và iPhone 11 là 2 model giúp cổ phiếu Apple...</a>
                        </h5>
                        <span className="category">Tin hot</span>
                        <span>18 Tháng Bảy, 2021</span>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default NewDetail
