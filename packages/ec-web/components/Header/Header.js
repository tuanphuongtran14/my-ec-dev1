import React from 'react'
import Link from 'next/link';

export default function Header() {
  return (
    <div className="header__navbar sticky-top">
        <div className="navbar--custom container px-0">
            <div className="navbar__logo">
                <button type="button" className="text-white ml-3 mr-4 bars-btn btn btn--no-outline" id="bars-btn">
                    <i className="fa fa-bars fa--md" aria-hidden="true" />
                </button>
                <Link href="/" >
                    <a><img src="/img/logo.png" className="logo" alt="" /></a>
                </Link>
            </div>
            <div className="navbar__menu" id="navbar-menu">
                <ul className="menu menu--nav" id="menu--nav">
                    <li className="menu__item">
                        <Link href="/category">
                            <a className="text-white">Sản phẩm</a> 
                        </Link>
                    </li>
                    <li className="menu__item">
                        <a href="true" className="text-white">Về chúng tôi</a>
                    </li>
                    <li className="menu__item">
                        <a href="true" className="text-white">Tin tức</a>
                    </li>
                    <li className="menu__item">
                        <a href="true" className="text-white">Liên hệ</a>
                    </li>
                </ul>
            </div>
            <div className="navbar__others">
                <ul className="menu menu--horizontal">
                    <li className="menu__item">
                        <button type="button" className="text-white btn btn--no-outline" id="search-btn">
                            <i className="fa fa-search fa--md" aria-hidden="true" />
                        </button>
                    </li>
                    <li className="menu__item">
                        <button type="button" className="text-white btn btn--no-outline">
                            <Link href="/wishlist">
                                <i className="fa fa-heart fa--md" aria-hidden="true" data-amount={0} />
                            </Link>
                        </button>
                    </li>
                    <li className="menu__item">
                        <button type="button" className="text-white btn btn--no-outline">
                            <Link href="/cart">
                                <i className="fa fa-shopping-bag fa--md" data-amount={0} aria-hidden="true" />
                            </Link>
                        </button>
                    </li>
                    <li className="menu__item">
                        <button type="button" className="text-white btn btn--no-outline">
                            <i className="fa fa-user fa--md" aria-hidden="true" />
                        </button>
                    </li>
                </ul>
            </div>
        </div>
        <form className="search-bar" id="search-bar">
            <input type="text" name="searchInput" className="search-input" placeholder="Nhập sản phẩm bạn cần tìm" />
            <button type="submit" className="btn btn--search">
            <i className="fa fa-search" aria-hidden="true" />
            </button>
        </form>
        <div id="overlaybody"></div>
    </div>
  )
}
