import Head from 'next/head'
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Banner from '../../components/Banner/Banner';

export default function Index() {
    return (
        <>
            <Head>
                <title>Advanced Search</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" key="title" />
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous" />
                <link rel="stylesheet" href="./vendors/flickity.min.css" />
                <link rel="stylesheet" href="./css/style.css" />
                {/* <link rel="stylesheet" href="./css/advancedSearch.css" /> */}
                <script src="/js/advancedSearch.js"></script>
            </Head>
            <Header />
            <Banner />
            <div className="body_advanced container p-5" style={{ backgroundColor: '#FFFFFF' }}>
                {/* ================================ FILTER GENERAL (Tổng quát)=============================== */}
                <h3>Tổng quát</h3>
                <div className="body__advanced-box row no-gutters">
                    <div className="box__item col-6 pr-2">
                        <div className="form-group">
                            {/* <label for=""></label> */}
                            <select className="form-control" name id>
                                <option>Hãng...</option>
                                <option>Samsung</option>
                                <option>Apple</option>
                            </select>
                        </div>
                    </div>
                    <div className="box__item col-6 pr-2">
                        <div className="form-group">
                            <select className="form-control" name id>
                                <option selected>Giá...</option>
                                <option value="">Dưới 2 triệu</option>
                                <option value="">Từ 2 đến 4 triệu</option>
                                <option value="">Từ 4 đến 7 triệu</option>
                                <option value="">Từ 7 đến 13 triệu</option>
                                <option value="">Từ 13 đến 20 triệu</option>
                                <option value="">Trên 20 triệu</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* ================================ FILTER BODY (Kích thước)=============================== */}
                <h3>Kích thước</h3>
                <div className="body__advanced-box row no-gutters">
                    <div className="box__item col-6 pr-2">
                        <div className="form-group form-control d-flex">
                            <label htmlFor id="heightInput" className="col-4 pl-1 box__item-mat1">Dài... &nbsp;</label>
                            <input className="col-8 px-0 box__item-mat2" id="heightRange" type="range" min={0} max={9} step={1} style={{ width: '100%' }} onchange="updateHeightInput(this.value);" />
                        </div>
                    </div>
                    <div className="box__item col-6 pl-2">
                        <div className="form-group form-control d-flex">
                            <label htmlFor id="widthInput" className="col-4 pl-1 box__item-mat1">Ngang... &nbsp;</label>
                            <input className="col-8 px-0 box__item-mat2" id="widthRange" type="range" min={0} max={7} step={1} style={{ width: '100%' }} onchange="updateWidthInput(this.value);" />
                        </div>
                    </div>
                    <div className="box__item col-6 pr-2">
                        <div className="form-group form-control d-flex">
                            <label htmlFor id="thicknessInput" className="col-4 pl-1 box__item-mat1">Dày... &nbsp;</label>
                            <input className="col-8 px-0 box__item-mat2" id="thicknessRange" type="range" min={0} max={15} step={1} style={{ width: '100%' }} onchange="updateThicknessInput(this.value);" />
                        </div>
                    </div>
                    <div className="box__item col-6 pl-2">
                        <div className="form-group form-control d-flex">
                            <label htmlFor id="weightInput" className="col-4 pl-1 box__item-mat1">Khối lượng... &nbsp;</label>
                            <input className="col-8 px-0 box__item-mat2" id="weightRange" type="range" min={0} max={17} step={1} style={{ width: '100%' }} onchange="updateWeightInput(this.value);" />
                        </div>
                    </div>
                    <div className="box__item col-6 pr-2">
                        <div className="form-group">
                            <input className="form-control" type="text" placeholder="Color... " />
                        </div>
                    </div>
                </div>
                {/* ================================ FILTER PLATFORM (Nền tảng)=============================== */}
                <h3>Nền tảng</h3>
                <div className="body__advanced-box row no-gutters">
                    <div className="box__item col-6 pr-2">
                        <div className="form-group">
                            <select className="form-control" name id>
                                <option>OS</option>
                                <option value>Android</option>
                                <option value>iOS</option>
                            </select>
                        </div>
                    </div>
                </div>
                {/* ================================ FILTER MEMORY (Bộ nhớ)=============================== */}
                <h3>Bộ nhớ</h3>
                <div className="body__advanced-box row no-gutters">
                    <div className="box__item col-6 pr-2">
                        <div className="form-group form-control d-flex">
                            <label htmlFor id="ramInput" className="col-4 pl-1 box__item-mat1">RAM... &nbsp;</label>
                            <input className="col-8 px-0 box__item-mat2" id="ramRange" type="range" min={0} max={7} step={1} style={{ width: '100%' }} onchange="updateRamInput(this.value);" />
                        </div>
                    </div>
                    <div className="box__item col-6 pl-2">
                        <div className="form-group form-control d-flex">
                            <label htmlFor id="storageInput" className="col-4 pl-1 box__item-mat1">ROM... &nbsp;</label>
                            <input className="col-8 px-0 box__item-mat2" id="storageRange" type="range" min={0} max={13} step={1} style={{ width: '100%' }} onchange="updateStorageInput(this.value);" />
                        </div>
                    </div>
                </div>
                {/* ================================ FILTER DISPLAY (Hiển thị)=============================== */}
                <h3>Hiển thị</h3>
                <div className="body__advanced-box row no-gutters">
                    <div className="box__item col-6 pr-2">
                        <div className="form-group">
                            <select className="form-control" name id>
                                <option>Công nghệ màn hình...</option>
                                <option>IPS</option>
                                <option>OLED</option>
                            </select>
                        </div>
                    </div>
                    <div className="box__item col-6 pl-2">
                        <div className="form-group form-control d-flex">
                            <label htmlFor id="sizeInput" className="col-4 pl-1 box__item-mat1">Size... &nbsp;</label>
                            <input className="col-8 px-0 box__item-mat2" id="sizeRange" type="range" min={0} max={41} step={1} style={{ width: '100%' }} onchange="updateSizeInput(this.value);" />
                        </div>
                    </div>
                </div>

                {/* ================================ FILTER BATTERY (Pin)=============================== */}
                <h3>Pin</h3>
                <div className="body__advanced-box row no-gutters">
                    <div className="box__item col-6 pr-2">
                        <div className="form-group">
                            <select className="form-control" name id>
                                <option>Loại...</option>
                                <option>Lipo</option>
                                <option>Lilon</option>
                            </select>
                        </div>
                    </div>
                    <div className="box__item col-6 pl-2">
                        <div className="form-group">
                            <select className="form-control" name id>
                                <option>Dung lượng pin...</option>
                                <option>Non-removable</option>
                            </select>
                        </div>
                    </div>
                </div>

                <a name id className="btn btn-primary d-flex justify-content-center" href="#" role="button">Show all results</a>
                <div className="mt-3 text-danger">
                    <p>
                        *Giá được tính bằng giá niêm yết, không cộng dồn với thuế, trợ cấp, phí giao hàng. Chỉ những điện thoại đã
                        biết giá mới xuất hiện trong kết quả tìm kiếm.
                    </p>
                    <p>
                        *Thời gian chờ và đàm thoại của pin dựa trên thông số kỹ thuật chính thức của nhà sản xuất,
                        không dựa trên các bài kiểm tra thực tế.
                    </p>
                </div>
            </div>

            <Footer />
            <script src="/js/advancedSearch.js" ></script>
        </>
    );
}