import React, { useEffect } from "react";
import { AuthContextProvider } from './store/UserDataContext'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from './components/HomePage/HomePage'
import BidPage from './components/BidPage/BidPage'

export default function App() {

  function capitalizeFirstLetter(string) {
    if (string === " ") {
      return ''
    }
    let split = string.split(' ');
    for (let x in split) {
      split[x] = split[x].charAt(0).toUpperCase() + split[x].slice(1)
    }
    let joined = split.join(' - ')
    return joined;
  }
  // return <AnimationRevealPage disabled></AnimationRevealPage>;
  useEffect(() => {
    let title = document.title + capitalizeFirstLetter(window.location.pathname.replaceAll('/', ' '))
    document.title = title;
  });
  return (
    <Router>
      <Switch>
        <Route path="/user/bids/:id" exact >
          <AuthContextProvider>
            <BidPage />
          </AuthContextProvider>
        </Route>
        <Route path="/" exact>
          <AuthContextProvider>
            <HomePage />
          </AuthContextProvider>
        </Route>
      </Switch>
    </Router >
  );
}