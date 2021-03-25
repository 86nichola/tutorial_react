import React from "react";
import axios from "axios";
import useAsync from "./useAsync";

async function getQuote() {
  const response = await axios.get(
    "https://query1.finance.yahoo.com/v7/finance/quote?&symbols=BTC-USD,ETH-USD,BNB-USD,USDT-USD,ADA-USD,DOT1-USD,DOT2-USD,XRP-USD,LTC-USD,LINK-USD,THETA-USD,BCH-USD,USDC-USD,XLM-USD,LUNA1-USD,DOGE-USD,VET-USD,TRX-USD,ATOM1-USD,SOL1-USD,MIOTA-USD,AVAX-USD,XMR-USD,BSV-USD,EOS-USD&fields=regularMarketPrice,regularMarketChange,regularMarketChangePercent,regularMarketVolume"

    //setupProxy.js
    //"/v7/finance/quote?&symbols=BTC-USD,ETH-USD,BNB-USD,USDT-USD,ADA-USD,DOT1-USD,DOT2-USD,XRP-USD,LTC-USD,LINK-USD,THETA-USD,BCH-USD,USDC-USD,XLM-USD,LUNA1-USD,DOGE-USD,VET-USD,TRX-USD,ATOM1-USD,SOL1-USD,MIOTA-USD,AVAX-USD,XMR-USD,BSV-USD,EOS-USD&fields=regularMarketPrice,regularMarketChange,regularMarketChangePercent,regularMarketVolume"
  );
  return response.data.quoteResponse.result;
}

async function getUsers() {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
}

function Users() {
  const [state, refetch] = useAsync(getUsers || getQuote, [], true);
  const { loading, error, data: arry } = state;
  // const { loading, error, data: coins } = state;

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!arry) return <button onClick={refetch}>불러오기</button>;

  return (
    <>
      <ul>
        {
          arry.map((user) => (
            <li key={user.id}>
              {user.username} ({user.name})
            </li>
          ))

          /*
          arry.map((coin) => (
            <li key={coin.symbol}>
              {coin.symbol}({coin.regularMarketChange * 100})
            </li>
          ))
          */
        }
      </ul>

      <button onClick={refetch}>다시 불러오기</button>
    </>
  );
}

export default Users;
