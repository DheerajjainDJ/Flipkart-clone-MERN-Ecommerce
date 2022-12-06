import PaytmChecksum from "../paytm/PaytmChecksum.js";
import dotenv from "dotenv";
import formidable from "formidable";
import { v4 as uuid } from "uuid";
import https from "https";

dotenv.config();

export const paytmGateway = async (request, response) => {
  const { amount, email } = request.body;
  let totalAmount = JSON.stringify(amount);
  var params = {};

  params["MID"] = process.env.PAYTM_MID;
  params["WEBSITE"] = process.env.PAYTM_WEBSITE;
  params["CHANNEL_ID"] = process.env.PAYTM_CHANNEL_ID;
  params["INDUSTRY_TYPE_ID"] = process.env.PAYTM_INDUSTRY_TYPE_ID;
  params["ORDER_ID"] = uuid();
  params["CUST_ID"] = process.env.PAYTM_CUST_ID;
  params["TXN_AMOUNT"] = totalAmount;
  params["CALLBACK_URL"] = "https://mern-ecommerce-flipkart-lite.up.railway.app/clone/callback";
  params["EMAIL"] = email;
  params["MOBILE_NO"] = "1234567891";

  var paytmChecksum = PaytmChecksum.generateSignature(
    params,
    process.env.PAYTM_MERCHANT_KEY
  );
  paytmChecksum
    .then(function (checksum) {
      let paytmParams = {
        ...params,
        "CHECKSUMHASH": checksum,
      };
      response.json(paytmParams);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const paytmCallback = async (request, response) => {
  const form = new formidable.IncomingForm();

  form.parse(request, (error, fields, file) => {
    console.log(fields);

    let paytmChecksum = fields.CHECKSUMHASH;
    delete fields.CHECKSUMHASH;

    var isVerifySignature = PaytmChecksum.verifySignature(
      fields,
      process.env.PAYTM_MERCHANT_KEY,
      paytmChecksum
    );
    if (isVerifySignature) {
      console.log("Checksum Matched");
      var paytmParams = {};

      /* body parameters */
      paytmParams.body = {
        /* Find your MID in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys */
        mid: fields.MID,

        /* Enter your order id which needs to be check status for */
        orderId: fields.ORDER_ID,
      };

      /**
       * Generate checksum by parameters we have in body
       * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
       */
      PaytmChecksum.generateSignature(
        JSON.stringify(paytmParams.body),
        process.env.PAYTM_MERCHANT_KEY
      ).then(function (checksum) {
        /* head parameters */
        paytmParams.head = {
          /* put generated checksum value here */
          signature: checksum,
        };

        /* prepare JSON string for request */
        var post_data = JSON.stringify(paytmParams);

        var options = {
          /* for Staging */
          hostname: "securegw-stage.paytm.in",

          /* for Production */
          // hostname: 'securegw.paytm.in',

          port: 443,
          path: "/v3/order/status",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": post_data.length,
          },
        };

        // Set up the request
        var resp = "";
        var post_req = https.request(options, function (post_res) {
          post_res.on("data", function (chunk) {
            resp += chunk;
          });

          post_res.on("end", function () {
            console.log("Response: ", resp);
            response.redirect("https://mern-ecommerce-flipkart-lite.netlify.app/")
          });
        });

        // post the data
        post_req.write(post_data);
        post_req.end();
      });
    } else {
      console.log("Checksum Mismatched");
    }
  });
};
