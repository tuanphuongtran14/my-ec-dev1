import {gql} from '@apollo/client'
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
        });
    if (user)
    {
        return (
            <div>
                    <div class="formItem py-3">
                        <label for="">Họ và tên</label>
                        <input type="text" class="form-control" id = "fullName" defaultValue={user.username} name="name" ></input>
                    </div>
                    <div class="formItem py-3">
                        <label for="">Số điện thoại</label>
                        <input type="text" class="form-control" id="phone" name="phone" defaultValue={user.id}   ></input>
                    </div>
                                                
                    <div class="formItem py-3">
                        <label for="">Email</label>
                        <input type="text" class="form-control" id="mail" name="mail" placeholder="" ></input>
                    </div>
                    <div class="formItem py-3">
                                <label for="">Địa chỉ chi tiết</label>
                                <input type="text" class="form-control" id="addressInfo" name="address" placeholder=""></input>
                            </div>
                </div>
        )
    }
    else 
    {
        return (
            <div>
                    <div class="formItem py-3">
                        <label for="">Họ và tên</label>
                        <input type="text" class="form-control" id = "fullName" name="name" placeholder="" ></input>
                    </div>
                    <div class="formItem py-3">
                        <label for="">Số điện thoại</label>
                        <input type="text" class="form-control" id="phone" name="phone" placeholder="" ></input>
                    </div>
                                                
                    <div class="formItem py-3">
                        <label for="">Email</label>
                        <input type="text" class="form-control" id="mail" name="mail" placeholder="" ></input>
                    </div>
                    <div class="formItem py-3">
                                <label for="">Địa chỉ chi tiết</label>
                                <input type="text" class="form-control" id="addressInfo" name="address" placeholder=""></input>
                            </div>
                </div>
        )
    }
}

export default infoUser;