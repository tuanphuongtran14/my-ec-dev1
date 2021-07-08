import Head from 'next/head'
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import '../_app'
import '../_document'

export default function () {
    return (
        <> 
            <Head>
                <title>Advanced Search</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" key="title"/>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous" />
                <link rel="stylesheet" href="./vendors/flickity.min.css" />
                <link rel="stylesheet" href="./css/style.css" />
            </Head>
            <Header />
            <div className="container px-0 banner">
                <div className="carousel row mx-0">
                    <div className="box__item col-12 col-lg-8 px-0">
                        <div className="gallery js-flickity " data-flickity-options="{ &quot;freeScroll&quot;: true, &quot;wrapAround&quot;: true }">
                            <img className="gallery-cell" src="./img/banner/ROG_Phone_Sliding_desk.webp" alt="" />
                            <img className="gallery-cell" src="./img/banner/690x300_Buds_.webp" alt="" />
                            <img className="gallery-cell" src="./img/banner/mg-6690x300.webp" alt="" />
                            <img className="gallery-cell" src="./img/banner/IMG_20210515_220924_947.webp" alt="" />
                        </div>
                    </div>
                    <div className="sub-banner col-12 col-lg-4 px-0">
                        <div className="box__item col-12 mb-2 pr-0">
                            <img src="./img/banner/iPhone_12_690x300_copy_3_.webp" alt="" />
                        </div>
                        <div className="box__item col-12 pr-0">
                            <img src="./img//banner/Right_banner.jpg" alt="" />
                        </div>
                    </div>
                    <div className="box__item col-12 bottom-banner px-0 mt-2">
                        <img src="./img/banner/bottom-banner.png" alt="" />
                    </div>
                </div>
            </div>
            <div className="body_advanced container p-5" style={{ backgroundColor: '#FFFFFF' }}>
                {/* ================================ FILTER GENERAL =============================== */}
                <h3>General</h3>
                <div className="body__advanced-box row no-gutters">
                    <div className="box__item col-6 pr-2">
                        <div className="form-group">
                            {/* <label for=""></label> */}
                            <select className="form-control" name id>
                                <option>Brand</option>
                                <option>Samsung</option>
                                <option>Apple</option>
                            </select>
                        </div>
                    </div>
                    <div className="box__item col-6 pl-2">
                        <div className="form-group form-control d-flex">
                            <label htmlFor id="yearInput" className="col-4 pl-1 box__item-mat1">Year: &nbsp;</label>
                            <input className="col-8 px-0 box__item-mat2" type="range" min="2010" max="2021" step="1" defaultValue="2015" style={{ width: '100%' }} onchange="updateYearInput(this.value);" />
                        </div>
                    </div>
                    <div className="box__item col-6 pr-2">
                        <div className="form-group">
                            {/* <label for=""></label> */}
                            <select className="form-control" name id>
                                <option>Availability</option>
                                <option>Available</option>
                                <option>Coming soon</option>
                                <option>Discontinued</option>
                                <option>Rumored</option>
                            </select>
                        </div>
                    </div>
                    <div className="box__item col-6 pl-2">
                        <div className="form-group form-control d-flex">
                            <label htmlFor id="priceInput" className="col-4 pl-1 box__item-mat1">Price: &nbsp;</label>
                            <input className="col-8 px-0 box__item-mat2" id="priceRange" type="range" min={0} max={5} step={1} style={{ width: '100%' }} onchange="updatePriceInput(this.value);" />
                        </div>
                    </div>
                </div>
                {/* ================================ FILTER NETWORK =============================== */}
                <h3>Network</h3>
                <div className="body__advanced-box row no-gutters">
                    <div className="box__item col-3 pr-2">
                        <div className="form-group">
                            <select className="form-control" name id>
                                <option>2G</option>
                                <option>GSM 850</option>
                                <option>GSM 900</option>
                                <option>GSM 1800</option>
                                <option>GSM 1900</option>
                            </select>
                        </div>
                    </div>
                    <div className="box__item col-3 px-2">
                        <div className="form-group">
                            <select className="form-control" name id>
                                <option>3G</option>
                                <option>HSPA 850</option>
                                <option>HSPA 900</option>
                                <option>HSPA 1700</option>
                                <option>HSPA 1900</option>
                                <option>HSPA 2100</option>
                            </select>
                        </div>
                    </div>
                    <div className="box__item col-3 px-2">
                        <div className="form-group">
                            <select className="form-control" name id>
                                <option>4G</option>
                                <option>LTE band 1</option>
                                <option>LTE band 2</option>
                                <option>LTE band 3</option>
                                <option>LTE band 4</option>
                            </select>
                        </div>
                    </div>
                    <div className="box__item col-3 pl-2">
                        <div className="form-group">
                            <select className="form-control" name id>
                                <option>5G</option>
                                <option>5G band 1</option>
                                <option>5G band 2</option>
                                <option>5G band 3</option>
                                <option>5G band 4</option>
                            </select>
                        </div>
                    </div>
                </div>
                {/* ================================ FILTER SIM =============================== */}
                <h3>SIM</h3>
                <div className="body__advanced-box row no-gutters">
                    <div className="box__item col-6 pr-2">
                        <div className="form-group">
                            <select className="form-control" name id>
                                <option>Size</option>
                                <option>Mini-SIM (regular size)</option>
                                <option>Micro-SIM</option>
                                <option>Nano-SIM</option>
                                <option>eSIM</option>
                            </select>
                        </div>
                    </div>
                    <div className="box__item col-6 pl-2">
                        <div className="form-group">
                            <select className="form-control" name id>
                                <option>Multiple</option>
                                <option>Dual SIM</option>
                                <option>Triple SIM</option>
                                <option>Quad SIM</option>
                            </select>
                        </div>
                    </div>
                </div>
                {/* ================================ FILTER BODY =============================== */}
                <h3>Body</h3>
                <div className="body__advanced-box row no-gutters">
                    <div className="box__item col-6 pr-2">
                        <div className="form-group">
                            <select className="form-control" name id>
                                <option>Form actor</option>
                                <option>Bar</option>
                                <option>Flip up</option>
                                <option>Flip down</option>
                                <option>Slide</option>
                                <option>Swivel</option>
                                <option>Watch</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>
                    <div className="box__item col-6 pl-2">
                        <div className="form-group">
                            <select className="form-control" name id>
                                <option>Keyboard</option>
                                <option>With QWERTY</option>
                                <option>Without QWERTY</option>
                            </select>
                        </div>
                    </div>
                    <div className="box__item col-6 pr-2">
                        <div className="form-group form-control d-flex">
                            <label htmlFor id="heightInput" className="col-4 pl-1 box__item-mat1">Height: &nbsp;</label>
                            <input className="col-8 px-0 box__item-mat2" id="heightRange" type="range" min={0} max={9} step={1} style={{ width: '100%' }} onchange="updateHeightInput(this.value);" />
                        </div>
                    </div>
                    <div className="box__item col-6 pl-2">
                        <div className="form-group form-control d-flex">
                            <label htmlFor id="widthInput" className="col-4 pl-1 box__item-mat1">Width: &nbsp;</label>
                            <input className="col-8 px-0 box__item-mat2" id="widthRange" type="range" min={0} max={7} step={1} style={{ width: '100%' }} onchange="updateWidthInput(this.value);" />
                        </div>
                    </div>
                    <div className="box__item col-6 pr-2">
                        <div className="form-group form-control d-flex">
                            <label htmlFor id="thicknessInput" className="col-4 pl-1 box__item-mat1">Thickness &nbsp;</label>
                            <input className="col-8 px-0 box__item-mat2" id="thicknessRange" type="range" min={0} max={15} step={1} style={{ width: '100%' }} onchange="updateThicknessInput(this.value);" />
                        </div>
                    </div>
                    <div className="box__item col-6 pl-2">
                        <div className="form-group form-control d-flex">
                            <label htmlFor id="weightInput" className="col-4 pl-1 box__item-mat1">Weight: &nbsp;</label>
                            <input className="col-8 px-0 box__item-mat2" id="weightRange" type="range" min={0} max={17} step={1} style={{ width: '100%' }} onchange="updateWeightInput(this.value);" />
                        </div>
                    </div>
                    <div className="box__item col-6 pr-2">
                        <div className="form-group">
                            <select className="form-control" name id>
                                <option>IP Certificate:</option>
                                <option>IPx7</option>
                                <option>IPx8</option>
                                <option value>MIL-STD-810D</option>
                                <option value>MIL-STD-810F</option>
                                <option value>MIL-STD-810G</option>
                            </select>
                        </div>
                    </div>
                    <div className="box__item col-6 pl-2">
                        <div className="form-group">
                            <input className="form-control" type="text" placeholder="Color: " />
                        </div>
                    </div>
                    <div className="box__item col-6 pr-2">
                        <div className="form-group">
                            <select className="form-control" name id>
                                <option>Back Marterial</option>
                                <option>Plastic</option>
                                <option>Aluminum</option>
                                <option>Glass</option>
                            </select>
                        </div>
                    </div>
                    <div className="box__item col-6 pl-2">
                        <div className="form-group">
                            <select className="form-control" name id>
                                <option>Plastic</option>
                                <option>Aluminum</option>
                                <option>Stainless steel</option>
                            </select>
                        </div>
                    </div>
                </div>
                {/* ================================ FILTER PLATFORM =============================== */}
                <h3>Plaform</h3>
                <div className="body__advanced-box row no-gutters">
                    <div className="box__item col-12">
                        <div className="form-group">
                            <select className="form-control" name id>
                                <option>OS</option>
                                <option value>Feature phones</option>
                                <option value>Android</option>
                                <option value>iOS</option>
                                <option value>Windows Phone</option>
                                <option value>Symbian</option>
                                <option value>RIM</option>
                                <option value>Bada</option>
                                <option value>Firefox</option>
                            </select>
                        </div>
                    </div>
                    <div className="box__item col-6 pr-2">
                        <div className="form-group form-control d-flex">
                            <label htmlFor id="freqInput" className="col-4 pl-1 box__item-mat1">CPU freq: &nbsp;</label>
                            <input className="col-8 px-0 box__item-mat2" id="freqRange" type="range" min={0} max={18} step={1} style={{ width: '100%' }} onchange="updateFreqInput(this.value);" />
                        </div>
                    </div>
                    <div className="box__item col-6 pl-2">
                        <div className="form-group form-control d-flex">
                            <label htmlFor id="coreInput" className="col-4 pl-1 box__item-mat1">CPU cores: &nbsp;</label>
                            <input className="col-8 px-0 box__item-mat2" id="coreRange" type="range" min={0} max={4} step={1} style={{ width: '100%' }} onchange="updateCoreInput(this.value);" />
                        </div>
                    </div>
                    <div className="box__item col-6 pr-2">
                        <div className="form-group">
                            <select className="form-control" name id>
                                <option value>Chipset</option>
                                <option value>Snapdragon 888</option>
                                <option value>Snapdragon 870</option>
                                <option value>Snapdragon 865+</option>
                                <option value>Snapdragon 865</option>
                                <option value>Snapdragon 860</option>
                                <option value>Snapdragon 855+</option>
                                <option value>Snapdragon 855</option>
                            </select>
                        </div>
                    </div>
                </div>
                {/* ================================ FILTER MEMORY =============================== */}
                <h3>Memory</h3>
                <div className="body__advanced-box row no-gutters">
                    <div className="box__item col-6 pr-2">
                        <div className="form-group form-control d-flex">
                            <label htmlFor id="ramInput" className="col-4 pl-1 box__item-mat1">Ram: &nbsp;</label>
                            <input className="col-8 px-0 box__item-mat2" id="ramRange" type="range" min={0} max={7} step={1} style={{ width: '100%' }} onchange="updateRamInput(this.value);" />
                        </div>
                    </div>
                    <div className="box__item col-6 pl-2">
                        <div className="form-group form-control d-flex">
                            <label htmlFor id="storageInput" className="col-4 pl-1 box__item-mat1">Storage: &nbsp;</label>
                            <input className="col-8 px-0 box__item-mat2" id="storageRange" type="range" min={0} max={13} step={1} style={{ width: '100%' }} onchange="updateStorageInput(this.value);" />
                        </div>
                    </div>
                    <div className="box__item col-6 pr-2">
                        <div className="form-group">
                            <select className="form-control" name id>
                                <option>Card slot:</option>
                                <option value>Yes (any type)</option>
                                <option value>Yes (dedicated)</option>
                                <option value>No</option>
                            </select>
                        </div>
                    </div>
                </div>
                {/* ================================ FILTER DISPLAY =============================== */}
                <h3>DISPLAY</h3>
                <div className="body__advanced-box row no-gutters">
                    <div className="box__item col-12">
                        <div className="form-group form-control d-flex">
                            <label htmlFor id="dResolutionInput" className="col-4 pl-1 box__item-mat1">Resolution: &nbsp;</label>
                            <input className="col-8 px-0 box__item-mat2" id="dResolutionRange" type="range" min={0} max={8} step={1} style={{ width: '100%' }} onchange="updateDResolutionInput(this.value);" />
                        </div>
                    </div>
                    <div className="box__item col-6 pr-2">
                        <div className="form-group form-control d-flex">
                            <label htmlFor id="sizeInput" className="col-4 pl-1 box__item-mat1">Size: &nbsp;</label>
                            <input className="col-8 px-0 box__item-mat2" id="sizeRange" type="range" min={0} max={41} step={1} style={{ width: '100%' }} onchange="updateSizeInput(this.value);" />
                        </div>
                    </div>
                    <div className="box__item col-6 pl-2">
                        <div className="form-group form-control d-flex">
                            <label htmlFor id="densityInput" className="col-4 pl-1 box__item-mat1">Density: &nbsp;</label>
                            <input className="col-8 px-0 box__item-mat2" id="densityRange" type="range" min={0} max={45} step={1} style={{ width: '100%' }} onchange="updateDensityInput(this.value);" />
                        </div>
                    </div>
                    <div className="box__item col-6 pr-2">
                        <div className="form-group">
                            <select className="form-control" name id>
                                <option>Technology:</option>
                                <option>IPS</option>
                                <option>OLED</option>
                            </select>
                        </div>
                    </div>
                    <div className="box__item col-6 pl-2">
                        <div className="form-group">
                            <select className="form-control" name id>
                                <option>Notch:</option>
                                <option>No</option>
                                <option>Yes</option>
                                <option>Punch hole/option&gt;
                                </option></select>
                        </div>
                    </div>
                    <div className="box__item col-3 pr-2">
                        <div className="form-group">
                            <div className="form-check form-control position-relative">
                                <label className="form-check-label">
                                    Hight refresh rate:
                                    <input type="checkbox" className="form-check-input position-absolute" style={{ right: '15px' }} name id defaultValue="checkedValue" />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ================================ FILTER MAIN CAMERA =============================== */}
                <h3>Main camera</h3>
                <div className="body__advanced-box row no-gutters">
                    <div className="box__item col-6 pr-2">
                        <div className="form-group form-control d-flex">
                            <label htmlFor id="mCamResolutionInput" className="col-4 pl-1 box__item-mat1">Resolution: &nbsp;</label>
                            <input className="col-8 px-0 box__item-mat2" id="mCamResolutionRange" type="range" min={0} max={12} step={1} style={{ width: '100%' }} onchange="updateMCamResolutionInput(this.value);" />
                        </div>
                    </div>
                    <div className="box__item col-3 px-2">
                        <div className="form-group">
                            <select className="form-control" name id>
                                <option>CAMERAS:</option>
                                <option value>One</option>
                                <option value>Two</option>
                                <option value>Three</option>
                                <option value>Four or more</option>
                            </select>
                        </div>
                    </div>
                    <div className="box__item -3 pl-2">
                        <div className="form-group">
                            <div className="form-check form-control position-relative">
                                <label className="form-check-label">
                                    OIS:
                                    <input type="checkbox" className="form-check-input position-absolute" style={{ right: '15px' }} name id defaultValue="checkedValue" />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="box__item col-6 pr-2">
                        <div className="form-group form-control d-flex">
                            <label htmlFor id="fNumInput" className="col-4 pl-1 box__item-mat1">F-Number: &nbsp;</label>
                            <input className="col-8 px-0 box__item-mat2" id="fNumRange" type="range" min={0} max={12} step={1} style={{ width: '100%' }} onchange="updateFNumInput(this.value);" />
                        </div>
                    </div>
                    <div className="box__item -3 px-2">
                        <div className="form-group">
                            <div className="form-check form-control position-relative">
                                <label className="form-check-label">
                                    Telephoto:
                                    <input type="checkbox" className="form-check-input position-absolute" style={{ right: '15px' }} name id defaultValue="checkedValue" />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="box__item col-3 pl-2">
                        <div className="form-group">
                            <div className="form-check form-control position-relative">
                                <label className="form-check-label">
                                    Ultrawide:
                                    <input type="checkbox" className="form-check-input position-absolute" style={{ right: '15px' }} name id defaultValue="checkedValue" />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="box__item col-6 pr-2">
                        <div className="form-group form-control d-flex">
                            <label htmlFor id="videoInput" className="col-4 pl-1 box__item-mat1">Video: &nbsp;</label>
                            <input className="col-8 px-0 box__item-mat2" id="videoRange" type="range" min={0} max={5} step={1} style={{ width: '100%' }} onchange="updateVideoInput(this.value);" />
                        </div>
                    </div>
                    <div className="box__item col-6 pl-2">
                        <div className="form-group">
                            <select className="form-control" name id>
                                <option>FLASH:</option>
                                <option>LED</option>
                                <option>Dual-LED</option>
                                <option>Xenon</option>
                            </select>
                        </div>
                    </div>
                </div>
                {/* ================================ FILTER SELFIE CAMERA =============================== */}
                <h3>Selfie camera</h3>
                <div className="body__advanced-box row no-gutters">
                    <div className="box__item col-6 pr-2">
                        <div className="form-group form-control d-flex">
                            <label htmlFor id="sCamResolutionInput" className="col-4 pl-1 box__item-mat1">Resolution: &nbsp;</label>
                            <input className="col-8 px-0 box__item-mat2" id="sCamResolutionRange" type="range" min={0} max={8} step={1} style={{ width: '100%' }} onchange="updateSCamResolutionInput(this.value);" />
                        </div>
                    </div>
                    <div className="box__item col-3 px-2">
                        <div className="form-group">
                            <div className="form-check form-control position-relative">
                                <label className="form-check-label">
                                    Dual camera:
                                    <input type="checkbox" className="form-check-input position-absolute" style={{ right: '15px' }} name id defaultValue="checkedValue" />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="box__item col-3 pl-2">
                        <div className="form-group">
                            <div className="form-check form-control position-relative">
                                <label className="form-check-label">
                                    OIS:
                                    <input type="checkbox" className="form-check-input position-absolute" style={{ right: '15px' }} name id defaultValue="checkedValue" />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="box__item col-3 pr-2">
                        <div className="form-group">
                            <div className="form-check form-control position-relative">
                                <label className="form-check-label">
                                    Front flash:
                                    <input type="checkbox" className="form-check-input position-absolute" style={{ right: '15px' }} name id defaultValue="checkedValue" />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="box__item col-3 px-2">
                        <div className="form-group">
                            <div className="form-check form-control position-relative">
                                <label className="form-check-label">
                                    Pop-up camera:
                                    <input type="checkbox" className="form-check-input position-absolute" style={{ right: '15px' }} name id defaultValue="checkedValue" />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ================================ FILTER AUDIO =============================== */}
                <h3>Audio</h3>
                <div className="body__advanced-box row no-gutters">
                    <div className="box__item col-3 pr-2">
                        <div className="form-group">
                            <div className="form-check form-control position-relative">
                                <label className="form-check-label">
                                    3.5mm jack:
                                    <input type="checkbox" className="form-check-input position-absolute" style={{ right: '15px' }} name id defaultValue="checkedValue" />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="box__item col-3 px-2">
                        <div className="form-group">
                            <div className="form-check form-control position-relative">
                                <label className="form-check-label">
                                    Dual speakers:
                                    <input type="checkbox" className="form-check-input position-absolute" style={{ right: '15px' }} name id defaultValue="checkedValue" />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ================================ FILTER SENSORS =============================== */}
                <h3>Sensors</h3>
                <div className="body__advanced-box row no-gutters">
                    <div className="box__item col-3 pr-2">
                        <div className="form-group">
                            <div className="form-check form-control position-relative">
                                <label className="form-check-label">
                                    Accelerometer:
                                    <input type="checkbox" className="form-check-input position-absolute" style={{ right: '15px' }} name id defaultValue="checkedValue" />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="box__item col-3 px-2">
                        <div className="form-group">
                            <div className="form-check form-control position-relative">
                                <label className="form-check-label">
                                    Gyro:
                                    <input type="checkbox" className="form-check-input position-absolute" style={{ right: '15px' }} name id defaultValue="checkedValue" />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="box__item col-3 px-2">
                        <div className="form-group">
                            <div className="form-check form-control position-relative">
                                <label className="form-check-label">
                                    Compass:
                                    <input type="checkbox" className="form-check-input position-absolute" style={{ right: '15px' }} name id defaultValue="checkedValue" />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="box__item col-3 pl-2">
                        <div className="form-group">
                            <div className="form-check form-control position-relative">
                                <label className="form-check-label">
                                    Proximity:
                                    <input type="checkbox" className="form-check-input position-absolute" style={{ right: '15px' }} name id defaultValue="checkedValue" />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="box__item col-3 pr-2">
                        <div className="form-group">
                            <div className="form-check form-control position-relative">
                                <label className="form-check-label">
                                    Barometer:
                                    <input type="checkbox" className="form-check-input position-absolute" style={{ right: '15px' }} name id defaultValue="checkedValue" />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="box__item col-3 px-2">
                        <div className="form-group">
                            <div className="form-check form-control position-relative">
                                <label className="form-check-label">
                                    Heart rate:
                                    <input type="checkbox" className="form-check-input position-absolute" style={{ right: '15px' }} name id defaultValue="checkedValue" />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="box__item col-6 pl-2">
                        <div className="form-group">
                            <select className="form-control" name id>
                                <option>Fingerprint:</option>
                                <option value>Yes (Any type)</option>
                                <option value>Front-mounted</option>
                                <option value>Rear-mounted</option>
                                <option value>Side-mounted</option>
                                <option value>Under display</option>
                            </select>
                        </div>
                    </div>
                </div>
                {/* ================================ FILTER CONNECTIVITY =============================== */}
                <h3>Sensors</h3>
                <div className="body__advanced-box row no-gutters">
                    <div className="box__item col-6 pr-2">
                        <div className="form-group">
                            <select className="form-control" name id>
                                <option>WLAN(WI-FI):</option>
                                <option>Wi-Fi 4 (802.11n)</option>
                                <option>Wi-Fi 5 (802.11ac)</option>
                                <option>Wi-Fi 6 (802.11ax)</option>
                            </select>
                        </div>
                    </div>
                    <div className="box__item col-6 pl-2">
                        <div className="form-group">
                            <select className="form-control" name id>
                                <option>Bluetooth:</option>
                                <option value>Bluetooth 4.0</option>
                                <option value>Bluetooth 4.1</option>
                                <option value>Bluetooth 4.2</option>
                                <option value>Bluetooth 5.0</option>
                                <option value>Bluetooth 5.1</option>
                            </select>
                        </div>
                    </div>
                    <div className="box__item col-3 pr-2">
                        <div className="form-group">
                            <div className="form-check form-control position-relative">
                                <label className="form-check-label">
                                    GPS:
                                    <input type="checkbox" className="form-check-input position-absolute" style={{ right: '15px' }} name id defaultValue="checkedValue" />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="box__item col-3 px-2">
                        <div className="form-group">
                            <div className="form-check form-control position-relative">
                                <label className="form-check-label">
                                    NFC:
                                    <input type="checkbox" className="form-check-input position-absolute" style={{ right: '15px' }} name id defaultValue="checkedValue" />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="box__item col-3 px-2">
                        <div className="form-group">
                            <div className="form-check form-control position-relative">
                                <label className="form-check-label">
                                    Infrared:
                                    <input type="checkbox" className="form-check-input position-absolute" style={{ right: '15px' }} name id defaultValue="checkedValue" />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="box__item col-3 pl-2">
                        <div className="form-group">
                            <div className="form-check form-control position-relative">
                                <label className="form-check-label">
                                    FM radio:
                                    <input type="checkbox" className="form-check-input position-absolute" style={{ right: '15px' }} name id defaultValue="checkedValue" />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="box__item col-3 pr-2">
                        <div className="form-group">
                            <div className="form-check form-control position-relative">
                                <label className="form-check-label">
                                    USB type-C:
                                    <input type="checkbox" className="form-check-input position-absolute" style={{ right: '15px' }} name id defaultValue="checkedValue" />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ================================ FILTER BATTERY =============================== */}
                <h3>Battery</h3>
                <div className="body__advanced-box row no-gutters">
                    <div className="box__item col-6 pr-2">
                        <div className="form-group form-control d-flex justify-content-between">
                            <label htmlFor id="capacityInput" className="col-4 pl-1 box__item-mat1">Capacity: &nbsp;</label>
                            <input className="col-8 px-0 box__item-mat2" id="capacityRange" type="range" min={0} max={20} step={1} onchange="updateCapacityInput(this.value);" />
                        </div>
                    </div>
                    <div className="box__item col-6 pl-2">
                        <div className="form-group">
                            <select className="form-control" name id>
                                <option>Removable:</option>
                                <option>Non-removable</option>
                            </select>
                        </div>
                    </div>
                    <div className="box__item col-9 pr-2">
                        <div className="form-group form-control d-flex justify-content-between">
                            <label htmlFor id="chargeSpeedInput" className="col-4 pl-1 box__item-mat1">Charging speed: &nbsp;</label>
                            <input className="col-8 px-0 box__item-mat2" id="chargeSpeedRange" type="range" min={0} max={18} step={1} onchange="updateChargeSpeedInput(this.value);" />
                        </div>
                    </div>
                    <div className="box__item col-3 px-2">
                        <div className="form-check form-control position-relative">
                            <label className="form-check-label">
                                Wireless charging:
                                <input type="checkbox" className="form-check-input position-absolute" style={{ right: '15px' }} name id defaultValue="checkedValue" />
                            </label>
                        </div>
                    </div>
                </div>
                {/* ================================ FILTER MISC =============================== */}
                <h3>Misc</h3>
                <div className="body__advanced-box row no-gutters">
                    <div className="box__item col-6 pr-2">
                        <div className="form-group">
                            <input className="form-control" type="text" placeholder="Free text: " />
                        </div>
                    </div>
                    <div className="box__item col-6 pl-2">
                        <div className="form-group">
                            <select className="form-control" name id>
                                <option>Order:</option>
                                <option value>Popularity</option>
                                <option value>Price</option>
                                <option value>Weight</option>
                                <option value>Camera resolution</option>
                                <option value>Battery capacity</option>&gt;
                            </select>
                        </div>
                    </div>
                    <div className="box__item col-3 pr-2">
                        <div className="form-group">
                            <div className="form-check form-control position-relative">
                                <label className="form-check-label">
                                    Reviewed only:
                                    <input type="checkbox" className="form-check-input position-absolute" style={{ right: '15px' }} name id defaultValue="checkedValue" />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <a name id className="btn btn-primary d-flex justify-content-center" href="#" role="button">Show all results</a>
                <div className="mt-3">
                    <p>
                        *Price based on the lowest online SIM-free price, excluding taxes, subsidies and shipment.
                        Only phones with known prices will appear in the results.
                    </p>
                    <p>
                        *Battery stand-by and talk time based on the official manufacturer specifications, not on real-life tests.
                    </p>
                    <p>
                        *In Free text field you can search for other features, not mentioned above.
                        For example - "fast battery charging", "wireless charging", "power bank", "ANT+", "GALILEO",
                        "aptX" and so on. In some cases it can be very useful, but the results are less reliable.
                    </p>
                </div>
            </div>
            
            <Footer />
            <script src="/js/advancedSearch.js" ></script>
        </>
    );
}