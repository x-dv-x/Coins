
import React, { Component } from 'react';
import axios from 'axios';
import btc from './logos/btc.png';
import eth from './logos/eth.png';
import link from './logos/link.png';
import ada from './logos/ada.png';
import xmr from './logos/xmr.png';
import yfi from './logos/yfi.png';
import lend from './logos/lend.png';
import comp from './logos/comp.png';
import uni from './logos/uni.png';
import gnt from './logos/gnt.png';


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      ccData: [],
      ccGlobalMcap: '',
      loading: true
    }
  }

  async componentDidMount() {
    await this.getData();
  }

  getData = async () => {
    try {
      const response = await axios({
        "method": "GET",
        "url": "https://coinpaprika1.p.rapidapi.com/tickers",
        "headers": {
          "content-type": "application/octet-stream",
          "x-rapidapi-host": "coinpaprika1.p.rapidapi.com",
          "x-rapidapi-key": process.env.REACT_APP_API_KEY,
          "useQueryString": true
        }
      });

      const coins = response.data;
      console.log(coins)
      const ccArray = [
        { name: 'Bitcoin', img: btc },
        { name: 'Ethereum', img: eth },
        { name: 'Chainlink', img: link },
        { name: 'Cardano', img: ada },
        { name: 'Monero', img: xmr },
        { name: 'yearn.finance', img: yfi },
        { name: 'Aave', img: lend },
        { name: 'Compound', img: comp },
        { name: 'Uniswap', img: uni },
        { name: 'Golem', img: gnt }
      ];

      const ccData = [];

      for (let j = 0; j < ccArray.length; j++) {
        for (let i = 0; i < coins.length; i++) {
          if (coins[i].name === ccArray[j].name) {
            coins[i]['img'] = ccArray[j].img;
            ccData.push(coins[i]);
            break;
          }
        }
      }
      console.log("ccData after matching:", ccData);

      const sortedData = ccData.sort((a, b) => a.rank - b.rank);

      const globalResponse = await axios({
        "method": "GET",
        "url": "https://coinpaprika1.p.rapidapi.com/tickers",
        "headers": {
          "content-type": "application/octet-stream",
          "x-rapidapi-host": "coinpaprika1.p.rapidapi.com",
          "x-rapidapi-key": process.env.REACT_APP_API_KEY,
          "useQueryString": true
        }
      });

      const globalData = globalResponse.data;
      const ccGlobalMcap = globalData.market_cap_usd;

      this.setState({
        ccData: sortedData,
        ccGlobalMcap,
        loading: false
      });
    } catch (error) {
      console.log(error);
    }
  }

 
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow text-monospace text-white">
          <p
            className="navbar-brand col-sm-3 col-md-2 mr-0">
            My fav Coins
          </p>
        </nav>
        &nbsp;
          <div className="container-fluid mt-5 w-50 p-3">
            <div className="row">
              <main role="main" className="col-lg-12 d-flex text-center">
                  <table className="table table-striped table-hover table-fixed table-bordered text-monospace">
                    <caption>Data Source: 
                      <a target="_blank" rel="noopener noreferrer" href="https://coinpaprika.com/">coinpaprika</a>
                    </caption>
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col">Rank</th>
                        <th scope="col">Logo</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Market Cap</th>
                      </tr>
                    </thead>
                      <tbody>
                        {this.state.ccData.map((data, key) => {
                          return(
                            <tr key={key}>
                              <td>{data.rank}</td>
                              <td><img src={data.img} width="25" height="25" className="d-inline-block align-top" alt="" /></td>
                              <td><a target="_blank" rel="noopener noreferrer" href={"https://coinpaprika.com/coin/" + data.id}>{data.name}</a></td>
                              <td>${(data.quotes.USD.price).toFixed(2)}</td>
                              <td>${(data.quotes.USD.market_cap).toLocaleString("fr-CH")}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                  </table>
                
              </main>
            </div>
          </div>
      </div>
    );
  }

} export default App;