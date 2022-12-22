const lodash = require('lodash');
const pool = require('../config/database');

exports.AddOrder = async (req, res) => {
    try {
        resp = {};
   
    const {orderNo, companyId, shipmentDate,  customerNote, total, taxes, quantity,unitPrice, grandTotal,
         tax,  amount, paymentStatus, shipStatus, packedStatus,deliveryStatus,fromQuotation} = req.body;
    // console.log(orderNo);
    
     const query2 = await pool.promise().query( 
        `INSERT INTO tblListOfItems(  quantity, unitPrice, tax, amount)
         VALUES('${quantity}','${unitPrice}','${tax}','${amount}')`
     );
     console.log(query2[0]['insertId']);
     const productId =  query2[0]['insertId']
     const CURRENT_DATE_time = await pool.promise().query(
        `SELECT NOW() AS today`
     );
     const Today  = lodash.map(CURRENT_DATE_time[0],'today' );
        const orderDate = Today[0]
    const query = await  pool.promise().query(
        `INSERT INTO order( orderNo, companyId, orderDate, shipmentDate, customerNote, total, taxes, grandTotal, productId, paymentStatus, packedStatus, shipStatus, deliveryStatus, fromQuotation)
        VALUES('${orderNo}','${companyId}','${orderDate}','${shipmentDate}','${customerNote}','${total}','${taxes}','${grandTotal}','${productId}','${paymentStatus}','${packedStatus}','${shipStatus}','${deliveryStatus}','${fromQuotation}')`
    );
    
    resp.success = true;
    resp.message = "OK"; 
    resp.data = query[0]['insertId']; 
    return res.json(resp);
} catch(err) {
    console.log(err);
    } 
}
exports.getlistofitems = async (req, res) => {
    try {
        resp = {};
    const {productId} = req.body;
    const query2 = await pool.promise().query( 
        ` SELECT   quantity, unitPrice, tax, amount FROM tblListOfItems WHERE productId = '${productId}'`
     );
     console.log(query2[0]);
     resp.success = true;
     resp.message = "OK"; 
     resp.data = query2[0]; 
    return res.json(resp);
} catch(err) {
    console.log(err);
    } 
}

// INSERT INTO order( orderNo,companyId,orderDate,shipmentDate,customerNote,total,taxes,grandTotal,productId,status,paymentStatus, packedStatus,
//     shipStatus, deliveryStatus, fromQuotation)
//     VALUES('1','11','2022-12-11 01:02:03','2022-12-11 01:02:03','great product','50','2','58','45','0','0','0','0','0','k')