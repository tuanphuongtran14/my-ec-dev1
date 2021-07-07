
import { Fragment } from "react";
import React from 'react';

const page = ({ productsPerPage, totalProducts, paginate }) => {
    const pageNumbers = [];

    for (let index = 1; index <= Math.ceil(totalProducts / productsPerPage); index++) {
        pageNumbers.push(index);
    }

    return (
        <>
            <ul className="pagination my-3 justify-content-center">
                {pageNumbers.map((number) => (
                    <li className="page-item">
                        <a onClick={() => paginate(number)} href="#!" className="page-link">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </>

    )
}

export default page