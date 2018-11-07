

class insertOrderHandler{

  constructor(databaseMgr){
    this.databaseMgr = databaseMgr;
  };

 async handle(event, context, cb) {

  console.log("inside insertOrderHandler.handle");

  
    let body = event.Records[0].body;
  try {
        body = JSON.parse(body);
      } catch (e) {
        cb({ code: 500, message: "no json body" });
        return;
      }


    //check body
    console.log(body);
    console.log(body.toString());

    /* checking for inputs */
    if (!body.tokenURI) {
      cb({ code: 500, message: "tokenURI parameter missing" });
      return;
    }
    if (!body.totalPrice) {
      cb({ code: 500, message: "totalPrice parameter missing" });
      return;
    }
    if (!body.customerEmail) {
      cb({ code: 500, message: "customerEmail missing" });
      return;
    }
    if (!body.customerEmailSHA256) {
      cb({ code: 500, message: "customerEmailSHA256 missing" });
      return;
    }
    if (!body.orderId) {
      cb({ code: 500, message: "orderId missing" });
      return;
    }
    if (!body.orderNumber) {
      cb({ code: 500, message: "orderNumber missing" });
      return;
    }
    if (!body.redemptionPinSHA256) {
      cb({ code: 500, message: "redemptionPinSHA256 parameter missing" });
      return;
    }
    if (!body.blockchain) {
      cb({ code: 500, message: "blockchain parameter missing" });
      return;
    } else if (body.blockchain.toLowerCase() != 'rinkeby' && body.blockchain.toLowerCase() != 'mainnet' && body.blockchain.toLowerCase() != 'kovan' && body.blockchain.toLowerCase() != 'ropsten') {
      cb({ code: 500, message: "blockchain parameter not valid" });
      return;
    }
  
    try{

      console.log("inside try");
      const records = await this.databaseMgr.insertOrder(body);
      console.log("after records await");
      cb(null, records);

    }catch(error){
      console.log("insertOrderHandler error"+error);
      cb({ code: 500, message: "insertOrderHandler error: " + error.message });
      return;
    }

  }



};

module.exports = insertOrderHandler;