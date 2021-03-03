import axios from 'axios';
import React, { useState, useEffect } from 'react';


import Chart from 'chart.js';


import './CoinDetail.css';

console.log(1)
export default function CoinDetail() {
    console.log(2)
    const [coinArray, setCoinArray] = useState([]);
    const [coinInfo, setCoinInfo] = useState({});
    const [coinDescription, setCoinDescription] = useState("");

    const [isLoading, setLoading] = useState(true);

    const [myChart, setChart] = useState();

    
    
    useEffect(() => {
        let id = window.location.pathname.split('/')
        id = id[id.length - 1]
        console.log(5)
        axios
            .get(
                `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=gbp&days=365&interval=daily`
                // `https://api.coingecko.com/api/v3/coins/${id}` 
            )
            .then(res => {
              

                setCoinArray(res.data.prices);

                setLoading(false);
                
                
            })
                .catch(error => console.log(error)); 

                
            }, []);
            console.log(coinArray);
            console.log(coinInfo);



            useEffect(() => {
                console.log(4)
                let id = window.location.pathname.split('/')
                id = id[id.length - 1]
                console.log(5)
                axios
                    .get(
                        // `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=gbp&days=10&interval=daily`
                        `https://api.coingecko.com/api/v3/coins/${id}` 
                    )
                    .then(res => {
                        setCoinInfo(res.data); 
                
            
                        const re1 = /<.+?>/g;
                       

                        setCoinDescription((res.data.description.en).replace(re1,""));
               
                        
                    })
                        .catch(error => console.log(error));                
                    }, []);


                    const data = React.useMemo(
                        () => [
                          {
                            label: 'Series 1',
                            // data: [[1,2], [2,7], [3,12], [4,3]]
                          data: coinArray
                          
                          }
                        ],
                       
                      )
                     
                    const axes = React.useMemo(
                        () => [
                          { primary: true, type: 'linear', position: 'bottom'},
                          { type: 'linear', position: 'left' }
                        ],
                        []
                      )



      if (isLoading) {
        return <div className="App">Loading...</div>;
      }
      
      return (

        <div className='container'>

            <div className="heading">
                <h1>{coinInfo.name}</h1>
            </div>

            <div className='graph'>

            <Chart axes={axes} series={series} data={data} />
            </div>
            
            
            <div className='info'>
                {coinDescription}
            </div>
         </div>
      )
    }

