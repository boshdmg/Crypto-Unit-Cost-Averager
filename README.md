# Crypto-Unit-Cost-Averager

Automatically buy an amount of cryptocurreny (Ethereum/Litecoin/Bitcoin) at regular intervals, to support [unit cost averaging](https://en.wikipedia.org/wiki/Dollar_cost_averaging) investment stratergy.


Written to run on Node.

`npm run start`

Create a gdaxrc. file in root of project in this shape:
~~~json
{
    "url" : "https://api.gdax.com",
    "key" : "",
    "secret" : "",
    "passphrase" : "",
    "buy" :[
        {"product":"ETH-EUR","amount" : "10","interval" : "1" ,"limit":240},
        {"product":"LTC-USD","amount" : "10","interval" : "24"}
    ]
}
~~~
This will buy 10 Euros worth of Ethereum ever hour unless the price exceeds 240 EUR, and 10 Dollars of LiteCoin every 24 hours.

You can generate an api key,secret and passphrase under your gdax [account](https://www.gdax.com/settings/api).
amount => is the amount you want to spend.
interval => is the intervals in hours you want to buy.


