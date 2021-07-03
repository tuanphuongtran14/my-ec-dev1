import React from 'react'
import Link from 'next/link';
import '../../pages/_app'
import '../../pages/_document'
export default function Header() {
  return (
    <div class="container px-0 banner">
        <div class="carousel row mx-0">
            <div class="col-12 col-lg-8 px-0">
                <div class="gallery js-flickity " data-flickity-options='{ "freeScroll": true, "wrapAround": true }'>
                    <img class="gallery-cell" src="./img/banner/ROG_Phone_Sliding_desk.webp" alt=""/>
                    <img class="gallery-cell" src="./img/banner/690x300_Buds_.webp" alt=""/>
                    <img class="gallery-cell" src="./img/banner/mg-6690x300.webp" alt=""/>
                    <img class="gallery-cell" src="./img/banner/IMG_20210515_220924_947.webp" alt=""/>
                </div>
            </div>
            <div class="sub-banner col-12 col-lg-4 px-0">
                <div class="col-12 mb-2 pr-0">
                    <img src="./img/banner/iPhone_12_690x300_copy_3_.webp" alt=""/>
                </div>
                <div class="col-12 pr-0">
                    <img src="./img/banner/Right_banner.jpg" alt=""/>
                </div>
            </div>
            <div class="col-12 bottom-banner px-0 mt-2">
                <img src="./img/banner/bottom-banner.png" alt=""/>
            </div>
        </div>
    </div>
  )
}
