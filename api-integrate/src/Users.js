import React from "react";
import axios from "axios";
import useAsync from "./useAsync";

async function getQuote() {
  const response = await axios.get(
    "/v7/finance/quote?&symbols=BTC-USD,ETH-USD,BNB-USD,USDT-USD,ADA-USD,DOT1-USD,DOT2-USD,XRP-USD,LTC-USD,LINK-USD,THETA-USD,BCH-USD,USDC-USD,XLM-USD,LUNA1-USD,DOGE-USD,VET-USD,TRX-USD,ATOM1-USD,SOL1-USD,MIOTA-USD,AVAX-USD,XMR-USD,BSV-USD,EOS-USD&fields=regularMarketPrice,regularMarketChange,regularMarketChangePercent,regularMarketVolume"
  );
  debugger;
  return response.data.quoteResponse.result;
}

async function getUsers() {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  debugger;
  return response.data;
}

function Users() {
  const [state, refetch] = useAsync(getQuote, [], true);
  const { loading, error, data: coins } = state;
  // const [state, refetch] = useAsync(getUsers, [], true);
  // const { loading, error, data: users } = state;

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  //if (!users) return <button onClick={refetch}>불러오기</button>;
  if (!coins) return <button onClick={refetch}>불러오기</button>;

  return (
    <>
      <ul>
        {
          /*
          users.map((user) => (
            <li key={user.id}>
              {user.username} ({user.name})
            </li>
          ))
          */
          coins.map((item) => (
            <li key={item.symbol}>
              {item.symbol}({item.regularMarketChange * 100})
            </li>
          ))
        }
      </ul>

      <button onClick={refetch}>다시 불러오기</button>
    </>
  );
}

export default Users;
