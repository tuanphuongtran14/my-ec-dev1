/* This example requires Tailwind CSS v2.0+ */
import { Fragment,useEffect,useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { graphqlClient, gql } from "../../helpers/apollo-client";
import { useAuth } from "../../helpers/auth";
import axios from 'axios';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function DropdownUser() {
{

  const [user,setUser] = useState(); 
  useEffect(async()=>{
    try {
      // Declare query & its variables
      const query = `
      query{
        me{
          id,
          username,  
        }
      }
      `;

      const variables = {}

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

      setUser(data.me);

  } catch {
      return false;
  }
  })
  if(user){
  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="d-inline-block justify-center w-full rounded-md text-center text-white ml-3 mr-4  btn btn--no-outline">
              Xin chào, {user.username}
              {/* <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" /> */}
              <i className=" ml-3 fa fa-user  fa--md" aria-hidden="true"></i>
            </Menu.Button>
          </div>

          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className=" font-weight-solid origin-top-right position-absolute top-20 mt-2 ml-4 w-56 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
              style={{backgroundColor: "#d70018"}}
           >
             
              <div className="py-2 ">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-3 py-2 text-sm text-light'
                      )}
                    ><i className="fa fa-edit pr-2 " aria-hidden="true" />
                    Tài khoản của tôi
                    </a>
                  )}
                </Menu.Item>
              </div>
              <div className="py-2">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-3 py-2 text-sm text-light'
                      )}
                    ><i className="fa fa-history pr-2" aria-hidden="true" />
                      Đơn hàng  
                    </a>
                  )}
                </Menu.Item>
              </div>
              <div className="py-2">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/api/logout"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-3 py-2 text-sm text-light'
                      )}
                    ><i className="fa fa-sign-out pr-2 " aria-hidden="true" />
                      Đăng xuất 
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
} 
else 
return(
 
   <a href ="/login_register" className = "text-white">
     Đăng nhập 
   </a>

)
};

}
