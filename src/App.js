
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Homepage from './Homepage.js';
import CoinDetail from './CoinDetail1.js';

import React from 'react'


export default function App() {
  return (
    <div>
      Hello HELLLLLLLOOOOOOOOOO
      <h1>YES!!!!!</h1>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' render={() => <Homepage />}/>
          <Route exact path='/Coin-detail/:coinid' render={() => <CoinDetail />}/>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

