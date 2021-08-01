

const TinhThanh = () =>
{

    fetch("https://provinces.open-api.vn/api/p/")
    .then(function(resp){
        return resp.json();
    })
    .then(function(data){
        var main = document.getElementById("TinhThanh");    
        var code=  document.getElementById("Code");    
        var htmls= data.map(function(data){
            let option = new Option(data.name,data.name);
            main.appendChild(option);
            let option2=new Option(data.code);
            code.appendChild(option2);
        });
    })
    .catch(function(err){
        alert("Co loi roi");
    });

    fetch("https://provinces.open-api.vn/api/d/")
    .then(function(resp){
        return resp.json();
    })
    .then(function(data){
        var subs = document.getElementById("QuanHuyen");    
        var htmls= data.map(function(data){
            if (data.province_code == 1)
            {
                let option = new Option(data.name,data.name);
                subs.appendChild(option);
            }
        });
    })
    .catch(function(err){
        alert("Co loi roi");
    });



    return(
        <div>
            <select class="form-select" aria-label="Default select example" name="calc_shipping_provinces" id="TinhThanh" required="">
            </select>
            <select name="calc_shipping_provinces" id="Code" hidden required="">
            </select>
            <select class="form-select" aria-label="Default select example" name="calc_shipping_district" id="QuanHuyen" required="">
            </select>

        </div>
        
  
    )
}

export default TinhThanh;