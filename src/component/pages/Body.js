import React, { Component } from 'react';
import { Route, NavLink, Switch, BrowserRouter } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Home from './Home';
class Body extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className='body-main'>
          <div className='row'>
            <div className='col-1'>
              <h1>SCRUMBUG|CINEMA</h1>
              <h2>Reserve Your Movie Tickets NOW!</h2>
              <p>| FAST | EASY | CONVENIENT |</p>
              <p></p>
            </div>
            <div className='col-2'>
              <div className='form-container'>
                <div className='form-btn'>
                  <NavLink exact to='/' activeClassName='btn-click'>
                    <span> Login</span>
                  </NavLink>
                  <NavLink to='/register' activeClassName='btn-click'>
                    <span> Register</span>
                  </NavLink>
                </div>
                <Route
                  render={({ location }) => (
                    <TransitionGroup>
                      <CSSTransition
                        key={location.key}
                        timeout={10}
                        classNames='fade'
                      >
                        <Switch>
                          <Route exact path='/' component={Home} />
                          <Route exact path='/login' component={Login} />
                          <Route path='/register' component={Register} />
                        </Switch>
                      </CSSTransition>
                    </TransitionGroup>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
export default Body;
