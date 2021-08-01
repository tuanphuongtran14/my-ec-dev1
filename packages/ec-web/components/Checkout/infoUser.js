import { gql } from '@apollo/client'
import Header from '../Header/Header'
import { Fragment, useEffect, useState } from "react";
import Link from 'next/link';
import axios from 'axios';

const infoUser = () => {

    const [user, setUser] = useState();
    useEffect(async () => {
        try {
            // Declare query & its variables
            const query = `
					query {
						me {
							id,
							username,  
						}
					}
				`;

            const { data: responseData } = await axios({
                method: "POST",
                url: "/api/graphql",
                headers: {
                    "Content-Type": "application/json",
                },
                data: {
                    type: "query",
                    query,
                },
            });
            console.log("This is user information");
            const { data } = responseData;
            console.log(data);

            setUser(data.me);
        } catch {
            return false;
        }
    }, []);
    if (user) {
        return (
            <div>
                <div class="formItem py-3">
                    <label htmlFor="">Họ và tên</label>
                    <input type="text" class="form-control" id="name" defaultValue={user.username} name="name" required></input>
                </div>
                <div class="formItem py-3">
                    <label htmlFor="">Số điện thoại</label>
                    <input type="text" class="form-control" id="phone" name="phone" defaultValue={user.phone} required  ></input>
                </div>

                <div class="formItem py-3">
                    <label htmlFor="">Email</label>
                    <input type="text" class="form-control" id="mail" name="mail" placeholder=""  required></input>
                </div>
                <div className="formItem py-3">
                    <label htmlFor="">Tỉnh thành</label>
                    <input type="text" className="form-control" name="address1" id="address1" required defaultValue="" />
                </div>
                <div className="formItem py-3">
                    <label htmlFor="">Quận, huyện</label>
                    <input type="text" className="form-control" name="address2" id="address2" required defaultValue="" />
                </div>
                <div className="formItem py-3">
                    <label htmlFor="">Địa chỉ chi tiết</label>
                    <input type="text" className="form-control" name="address3" id="address3" required defaultValue="" />
                </div>
            </div>
        )
    }
    else {
        return (
            <div>
                <div className="formItem py-3">
                    <label htmlFor="">Họ và tên</label>
                    <input type="text" className="form-control" name="name" id="name" required defaultValue="" />
                </div>
                <div className="formItem py-3">
                    <label htmlFor="">Số điện thoại</label>
                    <input type="text" className="form-control" name="phone" id="phone" required defaultValue="" />
                </div>
                <div className="formItem py-3">
                    <label htmlFor="">Email</label>
                    <input type="text" className="form-control" name="mail" id="mail" required defaultValue="" />
                </div>
                <div className="formItem py-3">
                    <label htmlFor="">Tỉnh thành</label>
                    <input type="text" className="form-control" name="address1" id="address1" required defaultValue="" />
                </div>
                <div className="formItem py-3">
                    <label htmlFor="">Quận, huyện</label>
                    <input type="text" className="form-control" name="address2" id="address2" required defaultValue="" />
                </div>
                <div className="formItem py-3">
                    <label htmlFor="">Địa chỉ chi tiết</label>
                    <input type="text" className="form-control" name="address3" id="address3" required defaultValue="" />
                </div>
            </div>
        )
    }
}

export default infoUser;