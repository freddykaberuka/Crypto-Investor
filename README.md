# 📖 [Crypto Investor] <a name="about-project"></a>

> Let us assume you are a crypto investor. You have made transactions over a period of time which is logged in a CSV file. Write a command line program that does the following

Given no parameters, return the latest portfolio value per token in USD
Given a token, return the latest portfolio value for that token in USD
Given a date, return the portfolio value per token in USD on that date
Given a date and a token, return the portfolio value of that token in USD on that date
The CSV file has the following columns

timestamp: Integer number of seconds since the Epoch
transaction_type: Either a DEPOSIT or a WITHDRAWAL
token: The token symbol
amount: The amount transacted
Portfolio means the balance of the token where you need to add deposits and subtract withdrawals. You may obtain the exchange rates from cryptocompare where the API is free. You should write it in Node.js as our main stack is in Javascript/Typescript and we need to assess your proficiency.

**[Crypto Investor]** is an app that help us to check and analyse the crypto currencies transaction for a certain period.

## 🛠 Built With <a name="built-with"></a>

### Tech Stack <a name="tech-stack"></a>

> used Node js with a help of package management(NPM) and cryptoCompare as the source of Api used.

<details>
  <summary>Server</summary>
  <ul>
    <li><a href="https://nodejs.org/en/">Node Js</a></li>
  </ul>
</details>

<details>
<summary>Database</summary>
  <ul>
    <li><a href="https://min-api.cryptocompare.com/">CryptoCompare API</a></li>
  </ul>
</details>

<!-- Features -->

### Key Features <a name="key-features"></a>

> the Application has 4 different feature in two different functions.

- **[Given no parameters, return the latest portfolio value per token in USD]**
- **[Given a token, return the latest portfolio value for that token in USD]**
- **[Given a date, return the portfolio value per token in USD on that date]**
- **[Given a date and a token, return the portfolio value of that token in USD on that date]**

### Methodology

> 1st Create a function that check the transaction that made.
```sh
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
```
this transactionFunc will check the transaction type and the token used for each.

> 2nd Declare an array which hold the list of question that will be asked in the next step.
```sh
    const questions = [
    "Enter 1: Given no parameters, return the latest portfolio value per token in USD.\n",
    "Enter 2: Given a token, return the latest portfolio value for that token in USD \n",
    "Enter 3: Given a date, return the portfolio value per token in USD on that date \n",
    "Enter 4: Given a date and a token, return the portfolio value of that token in USD on that date \n",
    ].join("");
```
> 3rd main function called cryptoFunc that contains all features listed above.
the function is composed with different if else statement where all the answer of asked questing is



<!-- GETTING STARTED -->

## 💻 Getting Started <a name="getting-started"></a>

To get a local copy up and running, follow these steps.

### Prerequisites

In order to run this project you need to:

install Nodejs in your computer.

### Setup

Clone this repository to your desired folder:


```sh
    git clone https://github.com/freddykaberuka/Crypto-Investor.git
```

### Install

Install this project with:


```sh
  cd Crypto-Investor
  npm install
```

### Usage

To run the project, execute the following command:


```sh
   npm start
```


<!-- AUTHORS -->

## 👥 Authors <a name="authors"></a>


👤 **Author**

- GitHub: [@freddykaberuka](https://github.com/freddykaberuka)
- LinkedIn: [Freddy Kaberuka](https://www.linkedin.com/in/kaberuka-freddy-853b08153/)


<!-- CONTRIBUTING -->

## 🤝 Contributing <a name="contributing"></a>

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](../../issues/).

