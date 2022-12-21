const csv = require('csv-parser');
const fs = require('fs');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
const request = require('request');
const {parse} = require('path');

const readData = fs.createReadStream('./transactions.csv');
const stream = readData.pipe(csv());
const cryptoKey = '3ba1415ed57ad5854e07034c7d56ea57b7cb32e4d3f31244feed25df611b7002';

let totalBtc = 0;
let totalEth = 0;
let totalXrp = 0;

const transactionFunc =(csvData)=>{
  if(csvData.token === 'BTC' && csvData.transaction_type === 'WITHDRAWAL')
    totalBtc -=+ csvData.amount;
  else if(csvData.token === 'BTC' && csvData.transaction_type === 'DEPOSIT')
    totalBtc +=+ csvData.amount;
  else if(csvData.token === 'ETH' && csvData.transaction_type === 'DEPOSIT')
    totalEth +=+ csvData.amount;
  else if(csvData.token === 'ETH' && csvData.transaction_type === 'WITHDRAWAL')
    totalEth -=+ csvData.amount;
  else if(csvData.token === 'XRP' && csvData.transaction_type === 'DEPOSIT')
    totalXrp +=+ csvData.amount;
  else if(csvData.token === 'ETH' && csvData.transaction_type === 'WITHDRAWAL')
    totalXrp -=+ csvData.amount;
    
}

const cryptoFunc = () =>{
    readline.question(
        `Enter 1: Given no parameters, return the latest portfolio value per token in USD.\n`,
        (answer) =>{
            if(answer === '1'){
                console.log('you selected 1');
                stream.on('data',(data)=> 
                  transactionFunc(data)
                ).on('end',()=>{
                    console.log({totalBtc, totalEth, totalXrp});
                    const multiPriceUrl = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,XRP&tsyms=USD&api_key=${cryptoKey}`;
                    request({multiPriceUrl : multiPriceUrl},(error, res, body)=>{
                        if(!error&&res.statusCode == 200){
                            const parseData = JSON.parse(body);
                            const btc = parseData['BTC']['USD']*totalBtc;
                            const eth = parseData['ETH']['USD']*totalEth;
                            const xrp = parseData['XRP']['USD']*totalXrp;

                            console.log('BTC in USD:'+btc.toString(), 'ETH in USD:'+eth.toString(), 'XRP in USD:'+xrp.toString());
                        }
                        readline.close();
                    })
                })
            }
        }
    )
}
cryptoFunc();
