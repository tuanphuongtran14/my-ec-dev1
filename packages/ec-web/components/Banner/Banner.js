import React, { useEffect, useRef } from "react";
import Flickity from "react-flickity-component";

export default function Header() {
    let flkty = useRef();

    const flickityOptions = {
        // initialIndex: 2,
        freeScroll: true,
        wrapAround: true,
        imagesLoaded: true,
        autoPlay: 5000
    }

    useEffect(() => {
        if (flkty.playPlayer)
            flkty.playPlayer();
    }, [])

    // <div class="container banner px-0" >
    // <div class="carousel row mx-0">
    //     <div class="col-12 col-lg-8 pr-0 pl-0">
    //         {/* <div class="gallery js-flickity " data-flickity-options='{ "freeScroll": true, "wrapAround": true, "imagesLoaded": true }'>
    //             <img class="gallery-cell" src="./img/banner/ROG_Phone_Sliding_desk.webp" alt="" />
    //             <img class="gallery-cell" src="./img/banner/690x300_Buds_.webp" alt="" />
    //             <img class="gallery-cell" src="./img/banner/mg-6690x300.webp" alt="" />
    //             <img class="gallery-cell" src="./img/banner/IMG_20210515_220924_947.webp" alt="" />
    //         </div> */}
    //         <Flickity
    //             flickityRef={c => flkty = c}
    //             className={'carousel'} // default ''
    //             elementType={'div'} // default 'div'
    //             options={flickityOptions} // takes flickity options {}
    //             disableImagesLoaded={false} // default false
    //             reloadOnUpdate // default false
    //             static // default false
    //         >
    //             <img class="gallery-cell" src="./img/banner/ROG_Phone_Sliding_desk.webp" alt="" />
    //             <img class="gallery-cell" src="./img/banner/690x300_Buds_.webp" alt="" />
    //             <img class="gallery-cell" src="./img/banner/mg-6690x300.webp" alt="" />
    //             <img class="gallery-cell" src="./img/banner/IMG_20210515_220924_947.webp" alt="" />
    //         </Flickity>
    //     </div>
    //     <div class="sub-banner col-12 col-lg-4 pl-0 pr-0">
    //         <div class="col-12 mb-2 pl-1 pr-0">
    //             <img src="./img/banner/iPhone_12_690x300_copy_3_.webp" alt="" />
    //         </div>
    //         <div class="col-12 pl-1 pr-0">
    //             <img src="./img/banner/Right_banner.jpg" alt="" />
    //         </div>
    //     </div>
    //     <div class="col-12 bottom-banner mt-2 px-0">
    //         <img src="./img/banner/bottom-banner.png" alt="" />
    //     </div>
    // </div>
    //     <div className="row w-100 mx-0 bg-secondary text-white py-2">
    //         <div className="col-4 py-3 d-flex justify-content-center">
    //             <p className="my-auto"><i class="fas fa-truck"></i> FREESHIP ĐƠN HÀNG {'>'}5000K</p>
    //         </div>
    //         <div className="col-4 py-3 d-flex justify-content-center">
    //             <p className="my-auto"><i class="fas fa-shield-alt"></i> BẢO HÀNH 3 NĂM</p>
    //         </div>
    //         <div className="col-4 py-3 d-flex justify-content-center">
    //             <p className="my-auto"><i class="fas fa-archive"></i> ĐỔI TRẢ MIỄN PHÍ TRONG VÒNG 7 NGÀY</p>
    //         </div>
    //     </div>
    // </div >

    return (
        <>
            {/* <div> */}
            <div class="container-fluid banner px-0" >
                <div class="carousel row mx-0">
                    <div class="col-12 pr-0 pl-0">
                        <Flickity
                            flickityRef={c => flkty = c}
                            className={'carousel'} // default ''
                            elementType={'div'} // default 'div'
                            options={flickityOptions} // takes flickity options {}
                            disableImagesLoaded={false} // default false
                            reloadOnUpdate // default false
                            static // default false
                        >
                            <img class="gallery-cell" src="./img/banner/banner1.png" alt="" style={{maxHeight: "600px"}}/>
                            <img class="gallery-cell" src="./img/banner/banner2.png" alt="" style={{maxHeight: "600px"}} />
                            <img class="gallery-cell" src="./img/banner/banner3.png" alt="" style={{maxHeight: "600px"}} />
                            <img class="gallery-cell" src="./img/banner/banner4.png" alt="" style={{maxHeight: "600px"}} />
                        </Flickity>
                    </div>
                </div>
            </div >
            <div className="container-fluid">
                <div className="container mx-auto text-dark py-2">
                    <div className="row col-12 w-100 mx-auto">
                        <div className="col-4 py-3 d-flex justify-content-center">
                            <p className="my-auto"><i class="fas fa-truck"></i> FREESHIP ĐƠN HÀNG {'>'}5000K</p>
                        </div>
                        <div className="col-4 py-3 d-flex justify-content-center">
                            <p className="my-auto"><i class="fas fa-shield-alt"></i> BẢO HÀNH 3 NĂM</p>
                        </div>
                        <div className="col-4 py-3 d-flex justify-content-center">
                            <p className="my-auto"><i class="fas fa-archive"></i> ĐỔI TRẢ MIỄN PHÍ TRONG VÒNG 7 NGÀY</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* </div> */}
        </>
    )
}
