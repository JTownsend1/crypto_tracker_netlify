import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Chart } from 'react-charts'
// import * as d3 from "d3";

// import {line} from "d3-scale";


// import { curveLinear } from 'react-charts/dist/react-charts.development';

// import Linkify from 'react-linkify';
// import { Linking } from 'react-native';

import './CoinDetail.css';

console.log(1)
export default function CoinDetail() {
    console.log(2)
    const [coinArray, setCoinArray] = useState([]);
    const [coinInfo, setCoinInfo] = useState({});
    const [coinDescription, setCoinDescription] = useState("");

    const [isLoading, setLoading] = useState(true);

    
    
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
              
                setCoinInfo(res.data);
                setCoinArray(res.data.prices);

                console.log(coinArray);
                // dateObject.toLocaleString()

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

                        // coinDescription.replace("/<.+?>","NNNNN");
                        coinDescription.replace('is','MMMMMMMMMMMMM');
                    console.log(coinDescription);
                    // console.log(yes);

  

    const data = React.useMemo(
        () => [
          {
            label: 'Series 1',
            // data: [[1,2], [2,7], [3,12], [4,3]]
            // data: [["XXxxxx",3],["ddddddd",4],["edede",5],["XXxxxx",3],["ddddddd",4],["edede",5],["XXxxxx",3],["ddddddd",4],["edede",5],["XXxxxx",3],["ddddddd",4],["edede",5]],
          data: coinArray,
          // data: [
          // { primary: "xxxxxxxx", secondary: 10 },
          // { primary: "jjjjjjjjjj", secondary: 12 },
          // { primary: "lklklkklklklklk", secondary: 15 },
          // ],
          color: 'rgb(13, 118, 128)',
          showPoints: false
          
          }
        ],
       
      )

      // <text class="tickLabel" dominant-baseline="hanging" text-anchor="middle" style="font-family: sans-serif; font-size: 10px; opacity: 1; fill: black; transform: translate3d(0px, 20px, 0px) rotate(45deg);">February</text>
     
    const axes = React.useMemo(
        () => [
          { primary: true, type: 'time', position: 'bottom', showGrid: false},
          
          { primary: false, type: 'linear', position: 'left', showGrid: true}
        ],
        []
      )

    //   <g class="tick" style="transform: translate3d(0px, 0px, 0px);"><g class="labelGroup"><line class="tickline" x1="0" x2="0" y1="0" y2="6" style="stroke-width: 1; fill: transparent; opacity: 1; stroke: rgba(0, 0, 0, 0.1);"></line><text class="tickLabel" dominant-baseline="hanging" text-anchor="middle" style="font-family: sans-serif; font-size: 20px; opacity: 1; fill: black; transform: translate3d(0px, 20px, 0px) rotate(30deg);">August</text></g></g>

    //   const line = d3.line();
    // const line = d3.line(d => d.date, d => d.value)
    // .curve(d3.curveCatmullRom.alpha(0.5));

    const series = React.useMemo(
        () => (
          { showPoints: false }
       

        ),
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

            <div classname='graph_container'>
            {/* <div classname='y_label'>
                  <p>Price in USD</p>
                </div> */}
                
                <div className='graph'>
                    <Chart axes={axes} series={series} data={data} />
                </div>
                {/* <div classname='y_label'>
                  <p>Price in USD</p>
                </div> */}
              {/* <div classname='y_label'>
                Time
              </div> */}
            </div>
            {}
            <div className='info'>
                {coinDescription}
            </div>

         </div>
      )
    }

