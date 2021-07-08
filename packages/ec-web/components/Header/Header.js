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
                            <button id="search-btn" type="button" className="text-white btn btn--no-outline" id="search-btn">
                                <i className="fa fa-search fa--md" aria-hidden="true" />
                            </button>
                        </li>
                        <li className="menu__item">
                            <button type="button" className="text-white btn btn--no-outline">
                                <i className="fa fa-heart fa--md" aria-hidden="true" data-amount={0} />
                            </button>
                        </li>
                        <li className="menu__item">
                            <button type="button" className="text-white btn btn--no-outline">
                                <i className="fa fa-shopping-bag fa--md" data-amount={0} aria-hidden="true" />
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
            <form action className="search-bar" id="search-bar">
                <div className="container position-relative">
                    <input type="text" name="search" id="search" className="search-input container " placeholder="Search" style={{ width: '100%' }} />
                    <button type="submit" className="btn btn--searchGo" id="search-go">
                        <div className="searchGo_text" href="./category.html">
                            Go
                        </div>
                    </button>
                    <button type="submit" className="btn btn--search" id="search-advanced">
                        <div className="searchGo_text">
                            <Link href="/advancedSearch">Advanced
                            </Link>
                            
                        </div>
                    </button>
                    <button type="submit" className="btn btn--search" id="search-icon">
                        <i className="fa fa-search " aria-hidden="true" />
                    </button>
                </div>
            </form>
            <div id="overlaybody"></div>
        </div>
    )
}
