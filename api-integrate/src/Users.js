import { React, useState } from "react";
import axios from "axios";
//import useAsync from "./useAsync"; // customHook
import { useAsync } from "react-async";
import User from "./User";

// CORS - Cross Over Resouce Sharing ...
async function getQuote() {
  const response = await axios.get(
    "https://query1.finance.yahoo.com/v7/finance/quote?&symbols=BTC-USD,ETH-USD,BNB-USD,USDT-USD,ADA-USD,DOT1-USD,DOT2-USD,XRP-USD,LTC-USD,LINK-USD,THETA-USD,BCH-USD,USDC-USD,XLM-USD,LUNA1-USD,DOGE-USD,VET-USD,TRX-USD,ATOM1-USD,SOL1-USD,MIOTA-USD,AVAX-USD,XMR-USD,BSV-USD,EOS-USD&fields=regularMarketPrice,regularMarketChange,regularMarketChangePercent,regularMarketVolume"

    //setupProxy.js
    //"/v7/finance/quote?&symbols=BTC-USD,ETH-USD,BNB-USD,USDT-USD,ADA-USD,DOT1-USD,DOT2-USD,XRP-USD,LTC-USD,LINK-USD,THETA-USD,BCH-USD,USDC-USD,XLM-USD,LUNA1-USD,DOGE-USD,VET-USD,TRX-USD,ATOM1-USD,SOL1-USD,MIOTA-USD,AVAX-USD,XMR-USD,BSV-USD,EOS-USD&fields=regularMarketPrice,regularMarketChange,regularMarketChangePercent,regularMarketVolume"
  );
  return response.data.quoteResponse.result;
}

async function getUser({ id }) {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
}

function Users({ id }) {
  //const [state, refetch] = useAsync(getUsers || getQuote, [], true);
  // const { loading, error, data: arry } = state;
  const [userId, setUserId] = useState(null);
  const { data: users, error, isLoading, reload } = useAsync({
    promiseFn: getUser,
    id,
    watch: id,
  });

  if (isLoading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!users) return <button onClick={reload}>불러오기</button>;

  return (
    <>
      <ul>
        {
          users.map((user) => (
            <li
              key={user.id}
              onClick={() => setUserId(user.id)}
              style={{ cursor: "pointer" }}
            >
              {user.username} ({user.name})
            </li>
          ))

          // arry.map((coin) => (
          //   <li key={coin.symbol}>
          //     {coin.symbol}({coin.regularMarketChange * 100})
          //   </li>
          // ))
        }
      </ul>
      <button onClick={reload}>다시 불러오기</button>
      {userId && <User id={userId} />}
    </>
  );
}

export default Users;
