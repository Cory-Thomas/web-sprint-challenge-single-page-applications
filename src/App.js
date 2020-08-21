import React from "react";
import Form from './components/PizzaForm';

const App = () => {
  return (
    <>
      <header>
        <h1>Lambda Eats</h1>
        <nav>
          <div><a href='#'>Home</a></div>
          <div><a href='#'>Help</a></div>
        </nav>
      </header>
      <Form />
    </>
  );
};
export default App;
