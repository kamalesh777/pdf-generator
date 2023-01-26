module.exports = (order) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <title>${order.orderId}</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
      <style type="text/css">
        .line{
          height: 2px;
          background: #333;
          margin-top: 40px;
        }
        .line+.line{
           margin-top: 10px;
           margin-bottom: 30px;
        }
        .invoice{
          margin: 50px auto;
        }
        p{
          margin-bottom: 8px;
        }
        footer .line {
            margin-top: 16px;
        }
        .table-bordered thead td, .table-bordered thead th {
            border-bottom-width: 1px;
        }
        .clientFooter {
            margin-top: 30px;
        }
        .table td, .table th {
          padding: .50rem;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="invoice">
          <header>
            <div class="row">
              <div class="col-md-6">
                <div class="productDetails">
                  <h3 class="corpName">${order.corpName}</h3>
                  <p class="corpAddress">8825 ELarkspur DR,Scottsdale,AZ85260,USA</p>
                  <p class="serviceNumber cmntext">CustomerService:<span>8338329195</span></p>
                  <p class="serviceHours cmntext">CSHours:<span>MONDAY-FRIDAY,9AMEST-6PMESTSATURDAY</span></p>
                  <p class="orderDate cmntext">OrderDate:<span>11/17/20</span></p>
                </div>
              </div>
              <div class="col-md-6 text-right">
                <figure class="logoImage">
                  <img src="images/logo.png">
                </figure>
                <h3 class="logoText">Brand Name</h3>
              </div>
              <div class="col-12">
                <div class="line" style="width: 100%;"></div>
                <div class="line" style="width: 10%;"></div>
              </div>
            </div>
          </header>
          <div class="clientDetails">
            <div class="clientHeader">
              <div class="row">
                <div class="col-12">
                  <h3 class="clientName">Larysa Druzhynina</h3>
                  <p class="clientAddress cmntext">23 Rose downblvd Debary,FL32713US</p>
                  <p class="clientEmail cmntext">Email:<span>colley624@hotmail.com</span></p>
                  <p class="clientNumber cmntext">Phone:<span>8338329195</span></p>
                </div>
                <div class="col-12">
                  <div class="line" style="width: 100%;"></div>
                  <div class="line" style="width: 5%;"></div>
                </div>
              </div>
            </div>
            <div class="clientFooter">
              <div class="row">
                <div class="col-12">
                  <table class="table orderTable table-bordered">
                    <thead>
                      <th>Order Info</th>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Product Item: <span></span></td>
                      </tr>
                      <tr>
                        <td>Sales Price: <span>$97.88</span></td>
                      </tr>
                      <tr>
                        <td>Shipping Price: <span>$0.00</span></td>
                      </tr>
                      <tr>
                        <td>Total Price: <span>$97.88</span></td>
                      </tr>
                      <tr>
                        <td>Credit card Last Four: <span>5756</span></td>
                      </tr>
                    </tbody>                
                  </table>
                </div>
                <div class="col-12">
                  <div class="line" style="width: 100%;"></div>
                  <div class="line" style="width: 10%;"></div>
                </div>
              </div>
            </div>
          </div>
          <footer>
            <div class="row">
              <div class="col-12">
                <div class="footerContent cmntext">
                  Thank you for your purchase from <span class="f-LLC">Crazy Legs202 LLC</span> if you have any questions regarding your order please contact our customer service department directly <span class="f-number">8338329195</span>
                </div>
              </div>
              <div class="col-12">
                <div class="line" style="width: 100%;"></div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    
    </body>
    </html>
    
    `
}