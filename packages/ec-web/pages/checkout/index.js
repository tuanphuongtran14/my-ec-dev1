import Head from 'next/head'
import Link from 'next/dist/client/link';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer'
import Queries from '../../components/Checkout/ItemList';
import InfoUser from '../../components/Checkout/infoUser';
import { useRouter } from 'next/router'

// export const getServerSideProps = useAuth(async ({ req, res, params }) => {
//     const jwt = req.session.get("user") ? req.session.get("user").jwt : null;
//     return {
//         props: 
//     }
// });

const payment = ()=>
{

    const router = useRouter()
    
    const handleClick = (e, path) => {
        e.preventDefault()

        
        var fullName=document.getElementById("fullName").value;
        var phone=document.getElementById("phone").value;
        var mail=document.getElementById("mail").value;
        var addressInfo=document.getElementById("addressInfo").value;

        if ((phone!=="") && ( fullName !== "") && (mail !== "") && (addressInfo !== ""))
        {
            sessionStorage.setItem("fullname",fullName);
            sessionStorage.setItem("phone",phone);
            sessionStorage.setItem("mail",mail);
            sessionStorage.setItem("addressInfo",addressInfo);
            router.push(path);

        }
        else 
        {
            var warning = document.getElementById("hiddenWarning")
            warning.hidden=false;
        }
    };


    
    // if(isSignedIn)
    return (
        <div>
            <Head>
                <title>CellPhone Store</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" key="title"/>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
                {/* <!-- Bootstrap CSS --> */}
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous" />
                <link rel="stylesheet" href="./vendors/flickity.min.css" />
                {/* <!-- Optional CSS --> */}
                <link rel="stylesheet" href="./css/style.css" />
            </Head>
            <Header></Header>
            <nav class="breadcrumb breadcrumb--custom my-1">
            <div class="container px-0">
                <Link href="/">
                <a class="breadcrumb-item">Trang chủ</a>
                </Link>
                <span class="breadcrumb-item active">Thanh toán</span>
            </div>
            </nav>
            <div class="payment container row mx-auto px-0">
                <div class="payment__bill col-12 col-lg-8"> 
                    <div class="bg-white p-3"> 
                        <div class="form-group "> 
                            <h2 class="title">Thông tin giao hàng</h2>
                            <InfoUser></InfoUser>
                        </div>
                        <p className="text-danger" hidden id="hiddenWarning" >*Chưa điền đủ thông tin</p>
                        <Link href="/">
                     
                    <button onClick={(e) => handleClick (e,"/payment")} type="button" id="completeButton" class="btn btn-success w-100 my-3">Tiến hành thanh toán</button>
                    </Link>
                    </div>
                </div>
                <div class="payment__product col-12 col-lg-4">
                    <div class=" bg-white p-3"> 
                        <h2 class="title">Chi tiết đơn hàng</h2>
                        <Queries></Queries>
                    </div>
                </div>
            </div>
            <Footer></Footer>
            
        </div>
    )
}

export default payment;