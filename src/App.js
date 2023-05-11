import React from "react";
import AnaSayfa from "./components/Pages/AnaSayfa";
import PizzaForm from "./components/Pages/PizzaForm";
import { BrowserRouter as Router,Route,Switch } from "react-router-dom";


const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={AnaSayfa}/>
        <Route path="/pizza" component={PizzaForm}/>
      </Switch>
    </Router>
  );
};
export default App;
