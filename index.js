const csv = require("csv-parser");
const fs = require("fs");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
const request = require("request");
const { parse } = require("path");

const readData = fs.createReadStream("./transactions.csv");
const stream = readData.pipe(csv());
const cryptoKey =
  "3ba1415ed57ad5854e07034c7d56ea57b7cb32e4d3f31244feed25df611b7002";

let totalBtc = 0;
let totalEth = 0;
let totalXrp = 0;
let totalTrans = 0;

const transactionFunc = (csvData) => {
  csvData.token === "BTC" && csvData.transaction_type === "WITHDRAWAL"
    ? (totalBtc -= +csvData.amount)
    : (totalBtc += +csvData.amount);
  csvData.token === "ETH" && csvData.transaction_type === "WITHDRAWAL"
    ? (totalEth -= +csvData.amount)
    : (totalEth += +csvData.amount);
  csvData.token === "XRP" && csvData.transaction_type === "WITHDRAWAL"
    ? (totalXrp -= +csvData.amount)
    : (totalXrp += +csvData.amount);
};

const questions = [
  "Enter 1: Given no parameters, return the latest portfolio value per token in USD.\n",
  "Enter 2: Given a token, return the latest portfolio value for that token in USD \n",
  "Enter 3: Given a date, return the portfolio value per token in USD on that date \n",
  "Enter 4: Given a date and a token, return the portfolio value of that token in USD on that date \n",
].join("");

const cryptoFunc = () => {
  readline.question(questions, (answer) => {
    if (answer === "1") {
      console.log("you selected 1");
      stream
        .on("data", (data) => transactionFunc(data))
        .on("end", () => {
          console.log({ totalBtc, totalEth, totalXrp });
        });
      readline.close();
    } else if (answer === "2") {
      console.log("you selected 2");
      readline.question("Enter Token ex: BTC:", (answer2) => {
        const token = answer2;
        stream
          .on("data", (data) => {
            if (data.token === token && data.transaction_type === "DEPOSIT") {
              totalTrans += +data.amount;
            } else if (
              data.token === token &&
              data.transaction_type === "WITHDRAWAL"
            ) {
              totalTrans -= +data.amount;
            }
          })
          .on("end", () => {
            const url = `https://min-api.cryptocompare.com/data/price?fsym=${token}&tsyms=USD&api_key=${cryptoKey}`;
            request({ url: url }, (error, res, body) => {
              if (!error && res.statusCode == 200) {
                const parseData = JSON.parse(body);

                const total = parseData["USD"] * totalTrans;
                console.log(
                  "Total of" + answer2 + ": $" + total.toLocaleString()
                );
              }
            });
          });
        readline.close();
      });
    } else if (answer === "3") {
      console.log("you selected 3 ");
      readline.question(`Enter a Date ex: 01 Jan 2018: \n`, (date) => {
        parseDate = Date.parse(date);
        console.log(parseDate / 1000);
        stream
          .on("data", (data) => {
            if (parseDate / 1000 >= data.timestamp) {
              transactionFunc(data);
            }
          })
          .on("end", () => {
            const url = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=1&toTs=${
              parseDate / 1000
            }&api_key=${cryptoKey}`;
            request({ url: url }, (error, res, body) => {
              if (!error && res.statusCode == 200) {
                const parseData = JSON.parse(body);
                btc = parseData["Data"]["Data"][0]["close"] * totalBtc;
                eth = parseData["Data"]["Data"][0]["close"] * totalEth;
                xrp = parseData["Data"]["Data"][0]["close"] * totalXrp;
                console.log(parseData["Data"]["Data"][0]["close"]);
                console.log(`Total BTC $${btc.toLocaleString()}`);
                console.log(`Total ETH $${eth.toLocaleString()}`);
                console.log(`Total XRP $${xrp.toLocaleString()}`);
                const newTotal = xrp + btc + eth;
                console.log(
                  `Total value of all tokens on this date: ${date} is $:${newTotal.toLocaleString()}`
                );
              }
            });
          });
        readline.close();
      });
    } else if (answer === "4") {
      console.log("You selected 4");
      readline.question(`Enter a Date ex: 01 Jan 2015:\n`, (date) => {
        total = 0;
        parseDate = Date.parse(date);

        readline.question(`Enter a Token:\n`, (input) => {
          const token = input;
          stream
            .on("data", (data) => {
              if (parseDate / 1000 >= data.timestamp) {
                if (
                  data.token === token &&
                  data.transaction_type === "DEPOSIT"
                ) {
                  total += +data.amount;
                } else if (
                  data.token === token &&
                  data.transaction_type === "WITHDRAWAL"
                ) {
                  total -= +data.amount;
                }
              }
            })
            .on("end", () => {
              const url = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${token}&tsym=USD&limit=1&toTs=${
                parseDate / 1000
              }&api_key=${cryptoKey}`;
              request({ url: url }, (error, res, body) => {
                if (!error && res.statusCode == 200) {
                  const parseData = JSON.parse(body);

                  const btc = parseData["Data"]["Data"][0]["close"] * total;
                  console.log("Total Amount:", { total });
                  console.log(
                    "at " +
                      date +
                      token +
                      " value was:" +
                      parseData["Data"]["Data"][1]["close"]
                  );
                  console.log(
                    "Total Amount of " +
                      input +
                      ": $" +
                      btc.toLocaleString() +
                      ` for ${date}`
                  );
                }
              });
            });

          readline.close();
        });
      });
    }
  });
};
cryptoFunc();
