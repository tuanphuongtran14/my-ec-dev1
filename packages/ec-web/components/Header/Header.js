import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function Header() {
    const [itemsNumber, setItemsNumber] = useState();

    useEffect(async () => {
        const cartId = localStorage.getItem('cartId');
        
        if(!cartId) {
            const query = `
                query {
                    cart: getCart {
                        _id
                        items {
                            _id
                        }
                    }
                }
            `;

            const variables = {};

            const { data } = await axios({
                method: 'POST',
                url: '/api/query',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    query,
                    variables
                },
            });

            if(data && data.cart) {
                localStorage.setItem('cartId', data.cart._id);
                localStorage.setItem('cartItems', data.cart.items.length);
                setItemsNumber(data.cart.items.length);
            } else {
                localStorage.removeItem('cartId');
                localStorage.setItem('cartItems', 0);
            }
        } else {
            const query = `
                query($cartId: ID!) {
                    cart: getCart(cartId: $cartId) {
                        _id
                        items {
                            _id
                        }
                    }
                }
            `;

            const variables = {
                cartId: localStorage.getItem("cartId")
            };

            const { data } = await axios({
                method: 'POST',
                url: '/api/query',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    query,
                    variables
                },
            });

            if(data && data.cart) {
                localStorage.setItem('cartId', data.cart._id);
                localStorage.setItem('cartItems', data.cart.items.length);
                setItemsNumber(data.cart.items.length);
            } else {
                localStorage.removeItem('cartId');
                localStorage.setItem('cartItems', 0);
            }
        }
    });

    useEffect(() => {
        toggleMenuAndSearch();
    }, []);

    const toggleMenuAndSearch = () => {
        let menu = document.getElementById("menu--nav");
        let menuParent = document.getElementById("navbar-menu");


        let searchBar = document.getElementById("search-bar");
        let searchBtn = document.getElementById("search-btn");
        let searchIcon = document.getElementById("search-icon");
        let searchGo = document.getElementById("search-go")
        let searchAdvanced = document.getElementById("search-advanced")

        let overBodyLayer = document.getElementById("overlaybody");

        let body = document.querySelector("body");
        let root = document.getElementById("__next");

        // If window < 991, display mobile menu version
        if (innerWidth < 991)
            body.appendChild(menu);

        // If user change window width, change to suitable version
        window.onresize = function () {
            if (window.innerWidth >= 992) {
                root.style.transform = "translateX(0%)";
                if (getStyleElement(searchBar, "display") === "none") {
                    overBodyLayer.style.display = "none";
                    menuParent.appendChild(menu);
                    menu.style.transform = "none";
                    body.classList.remove('noscroll');
                }
            } else {
                body.appendChild(menu);
                menu.style.transform = "translateX(-60vw)";
            }
        }

        // If bars button is clicked, open menu on left
        document.getElementById("bars-btn").onclick = function () {
            overBodyLayer.style.display = "block";
            menu.style.transform = "translateX(60vw)";
            root.style.transform = "translateX(60vw)";
            body.classList.add('noscroll');
        }

        // If search button is clicked, display search bar
        searchBtn.onclick = function () {
            searchBar.style.display = "flex";
            overBodyLayer.style.display = "block";
            body.classList.add('noscroll');
            searchIcon.style.display = "block";
            searchGo.style.display = "none"
            searchAdvanced.style.display = "none";
        }

        searchBar.onclick = function () {
            searchGo.style.display = "block"
            searchAdvanced.style.display = "block";
            searchIcon.style.display = "none";
        }

        // If over body layer is click, close menu or search bar
        overBodyLayer.onclick = function () {
            if (getStyleElement(searchBar, "display") === "none") {
                root.style.transform = "translateX(0%)";
                menu.style.transform = "translateX(-60vw)";
                overBodyLayer.style.display = "none";
            } else {
                searchBar.style.display = "none";
                overBodyLayer.style.display = "none";
            }
            body.classList.remove('noscroll');
        }
    }

    return (
        <div className="header__navbar sticky-top">
            <div className="navbar--custom container">
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
                            <Link href="/san-pham">
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
                        {/* <li className="menu__item">
                            <button type="button" className="text-white btn btn--no-outline">
                                <i className="fa fa-heart fa--md" aria-hidden="true" data-amount={0} />
                            </button>
                        </li> */}
                        <li className="menu__item">
                            <button type="button" className="btn btn--no-outline">
                                <Link href="/gio-hang">
                                    <a><i className="fa fa-shopping-bag fa--md text-white" data-amount={itemsNumber} aria-hidden="true" /></a>
                                </Link>
                            </button>
                        </li>
                        <li className="menu__item">
                            <button type="button" className="text-white btn btn--no-outline">
                                <i className="fa fa-user  fa--md" aria-hidden="true"></i>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <form action className="search-bar" id="search-bar" action="/result" method='GET'>
                <div className="container position-relative">
                    <input
                        type="text"
                        name="name"
                        id="search"
                        className="search-input container "
                        placeholder="Search"
                        style={{ width: '100%' }}
                    />
                    <button type="submit" className="btn btn--searchGo" id="search-go"
                    >
                        <div className="searchGo_text" href="./san-pham">
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
