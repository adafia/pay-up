import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Tables from '../tables/Tables'


const Routes = () => {
    return (
        <div className="container">
          <Switch>
            <Route exact path='/' component={Tables} />
          </Switch>
        </div>
    )
}

export default Routes;
