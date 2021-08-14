import config from "../config/default.json";
import dateFormat from "dateformat";
import querystring from "qs";
import sha256 from "sha256";
class vnPay{

    GerUrl(amount,bankCode,orderInfo,orderType){
    
    var ipAddr = "127.0.0.1";
    var tmnCode = "1SNJ89L8";
    var secretKey ="ODJLXOCEWMFIEJXHJNMZUVFFVRDDXLOT";
    var vnpUrl = "http://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    var returnUrl = "http://localhost:3000/thanh-toan/thanh-cong";

    var date = new Date();

    var createDate = dateFormat(date, 'yyyymmddHHmmss');
    var orderId = dateFormat(date, 'HHmmss');
    var locale = 'vn'
    var currCode = 'VND';
    var vnp_Params = {};
    vnp_Params['vnp_Version'] = '2';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = orderInfo;
    vnp_Params['vnp_OrderType'] = orderType;
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if(bankCode !== null && bankCode !== ''){
        vnp_Params['vnp_BankCode'] = bankCode;
    }
    var sorted = {},
            key, a = [];
    
        for (key in vnp_Params) {
            if (vnp_Params.hasOwnProperty(key)) {
                a.push(key);
            }
        }
    
        a.sort();
    
        for (key = 0; key < a.length; key++) {
            sorted[a[key]] = vnp_Params[a[key]];
        }
    // vnp_Params = sortObject(vnp_Params);

    var signData = secretKey + querystring.stringify(sorted, { encode: false });

    var secureHash = sha256(signData);

    vnp_Params['vnp_SecureHashType'] =  'SHA256';
    vnp_Params['vnp_SecureHash'] = secureHash;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: true });

    return vnpUrl;
    }
}
export default new vnPay();