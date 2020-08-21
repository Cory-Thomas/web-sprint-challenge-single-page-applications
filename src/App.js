import React, { useState } from "react";
import Form from './components/PizzaForm';
import { Route, Switch, Link } from 'react-router-dom';

const App = () => {
  const [passableState, setPassableState ] = useState([]);

  return (
    <>
      <header>
        <h1>Lambda Eats</h1>
        <nav>
          <div><Link to='/'>Home</Link></div>
          <div><Link to='/form'>Make pizza</Link></div>
          <div><Link to='/finishedPizza'>View Pizza</Link></div>
        </nav>
      </header>
      <Switch>
        <Route path='/form'>
          <Form state={setPassableState}/>
        </Route>
        <Route path='/finishedPizza'>
          <section>
                      <h2>Created Pizza</h2>
                      <div><p>Name: {passableState.name}</p></div>
                      <div><p>Size: {passableState.pizzaSize}</p></div>
                      <div><p>Toppings: 
                        {passableState.pepperoni === true ? ' pepperoni' : null}
                        {passableState.bacon === true ? ' bacon' : null}
                        {passableState.sausage === true ? ' sausage' : null}
                        {passableState.mushroom === true ? ' mushroom' : null}
                        </p></div>
                      <div><p>Special Instructions: {passableState.specialInstr}</p></div>
                    </section>
        </Route>
        <Route path='/'>
          <div>Homepage</div>
          <Link to='/form'><button>Make pizza</button></Link>
        </Route>
      </Switch>
      
    </>
  );
};
export default App;
