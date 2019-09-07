# Crypto-Unit-Cost-Averager

Automatically buy an amount of cryptocurreny at regular intervals on Coinbase Pro, to support [unit cost averaging](https://en.wikipedia.org/wiki/Dollar_cost_averaging) investment stratergy.


Written to run on Node.

`npm run start`

Create a gdaxrc. file in root of project in this shape:
~~~json
{
    "url" : "https://api.pro.coinbase.com",
    "key" : "api-key-from-coinbase-pro",
    "secret" : "api-secret-from-coinbase-pro",
    "passphrase" : "api-passphrase-from-coinbase-pro",
    "buy" :[
        {"product":"ETH-EUR","amount" : "10","interval" : "1" , "limit":240},
        {"product":"LTC-USD","amount" : "10","interval" : "24", "limit": 40}
    ]
}
~~~
This will buy 10 Euros worth of Ethereum ever hour unless the price exceeds 240 EUR, and 10 Dollars of LiteCoin every 24 hours unless the price exceeds 40 USD.

For BTC trades there is currently a minimum purchase of 0.01 coins imposed by gdax, so if Bitcoins value is 5000, your amount value must be at least 50.

You can generate an api `key`,`secret` and `passphrase` under your Coinbase Pro [account](https://pro.coinbase.com/profile/api), you will need to grand `View` and `Trade` permission.
`amount` => is the amount you want to spend.
`interval` => is the intervals in hours you want to buy (whole numbers only)
`limit` => is the maximum price you are willing to buy at.

Up coming features
- Purchasing coins as soon as they drop below the limit - using websock api
