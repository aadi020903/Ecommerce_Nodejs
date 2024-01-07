const { transactions_viewer} = require("../services/transaction_service")

exports.transactions_viewer = async(req,res)=>{
    let data = await transactions_viewer(req,res);
    console.log(data.data);
    if(data.success){
        res.render("transactions_viewer",{data: data.data, admin_data:data.admin_data});
    }
    else{
        res.send("data did not fetch");
    }

}