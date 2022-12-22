const lodash = require('lodash');
const pool = require('../config/database');


var express = require('express');
var app = express();
      
var dateTime = require('node-datetime');

exports.AddOrder = async (req, res) => {
    try {
        resp = {};   
    const {orderNo, companyId, shipmentDate,  customerNote, total, taxes, grandTotal,list_of_items,
          paymentStatus, shipStatus, packedStatus,deliveryStatus,fromQuotation} = req.body;
    // console.log(orderNo);
    const quantity = list_of_items[0]['quantity']
    const unitPrice = list_of_items[0]['unitPrice']
    const tax = list_of_items[0]['tax']
    const amount = list_of_items[0]['amount']

    console.log(quantity);
     const query2 = await pool.promise().query( 
        `INSERT INTO tblListOfItems(  quantity, unitPrice, tax, amount)
         VALUES('${quantity}','${unitPrice}','${tax}','${amount}')`
     );
     console.log(query2[0]['insertId']);
     const productId =  query2[0]['insertId']
     var dt = dateTime.create();
    var formatted = dt.format('Y-m-d H:M:S');
    console.log(formatted);

    
        const orderDate = formatted
    const query = await  pool.promise().query(
        `INSERT INTO tblOrder( orderNo, companyId, orderDate, shipmentDate, customerNote, total, taxes, grandTotal, productId, paymentStatus, packedStatus, shipStatus, deliveryStatus, fromQuotation)
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
    const {customerId} = req.body;
    const query = await pool.promise().query( 
        ` SELECT  orderNo, companyId, shipmentDate,  customerNote,total, taxes,grandTotal, productId ,paymentStatus, shipStatus,packedStatus,deliveryStatus,
        fromQuotation  FROM tblOrder  WHERE customerId = '${customerId}'`
     );
     
     const productId = query[0][0]['productId'];
     const query3 = await pool.promise().query( 
        ` SELECT  quantity,unitPrice,tax,amount FROM  tblListOfItems WHERE  productId =  '${productId}'`
     );
     query[0][0]['listOfitems'] = query3[0][0]
     
     console.log(query[0]);
    const query2 = await pool.promise().query( 
        ` SELECT  L.orderNo, L.companyId, L.shipmentDate,  L.customerNote, L.total, L.taxes, L.grandTotal,
        L.paymentStatus, L.shipStatus, L.packedStatus,L.deliveryStatus,L.fromQuotation , O.quantity, O.unitPrice, O.tax, O.amount FROM 
        tblOrder  L LEFT JOIN tblListOfItems O ON L.productId = O.productId
        WHERE L.customerId = '${customerId}'`
     );
     console.log(query2[0]);
     resp.success = true;
     resp.message = "OK"; 
     resp.data = query[0]; 
    return res.json(resp);
} catch(err) {
    console.log(err);
    } 
}

/////////////////////////////////////////// add_oder
// {
//     "orderNo":1,
// "companyId":11,
// "shipmentDate":"2022-12-11 01:02:03",
// "customerNote":"great product",
// "total":50,
// "taxes":2,
// "grandTotal":58,
// "list_of_items":[
//     {
//         "quantity":5,
//         "unitPrice":1,
//         "tax":3,
//         "amount":50
//     }
// ],
// "status":0,
// "paymentStatus":0,
// "shipStatus":0,
// "packedStatus":0,
// "deliveryStatus":0,
// "fromQuotation":"okk",
// "customerId":55,
// "orderDate":"2022-12-11 01:02:03"
// }