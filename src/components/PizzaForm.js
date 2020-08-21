import React, { useState } from "react";
import * as Yup from "yup";


const PizzaForm = () => {
    const [values, setValues] = useState({
        name: "",
        pizzaSize: "",
        toppings: {
            pepperoni: "",
            bacon: "",
            sausage: "",
            mushroom: ""
        },
        specialInstr: ""
      });
    
      const [errors, setErrors] = useState({
        name: "",
        pizzaSize: "",
        toppings: {
            pepperoni: "",
            bacon: "",
            sausage: "",
            mushroom: ""
        },
        specialInstr: ""
      });

      const formSchema = Yup.object().shape({
        name: Yup
            .string()
            .min(3, "Name must be at least 3 characters long")
            .required(),
        pizzaSize: Yup
            .string()
            .oneOf(['small', 'medium', 'large'])
            .required('You must select a size'),
        toppings: Yup
            .boolean()
            // .string()
            .oneOf(['pepperoni', 'bacon', 'sausage', 'mushroom'], 'You must select a topping')
            .required('You must select a topping'),
        specialInstr: Yup
            .string()
            .min(3, "Name must be at least 3 characters long")
            .required()
      });

      const handleChange = (e) => {
          e.persist();
        Yup.reach(formSchema, e.target.name)
          .validate(e.target.value)
          .then((valid) => {
            console.log("valid");
            setErrors({
              ...errors,
              [e.target.name]: ""
            });
          })
          .catch((err) => {
            console.log("err: ", err.errors[0]);
            setErrors({
              ...errors,
              [e.target.name]: err.errors[0]
            });
          });
    
        setValues({
          ...values,
          [e.target.name]: e.target.value
        });
      }; 
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submitting ", values);
    
        setValues({
            name: "",
            pizzaSize: "",
            toppings: {
                pepperoni: "",
                bacon: "",
                sausage: "",
                mushroom: "",
            },
            specialInstr: ""
        });
      };

      const handleCheckboxChange = e => {
        e.persist();
        Yup.reach(formSchema, e.target.name)
          .validate(e.target.value)
          .then((valid) => {
            console.log("valid");
            setErrors({
              ...errors,
              toppings: {
                ...values.toppings,
                [e.target.name]: "",
              }
            });
          })
          .catch((err) => {
            setErrors({
              ...errors,
              toppings: {
                ...values.toppings,
                [e.target.name]: e.errors[0],
              }
            });
          });
        const { name, checked } = e.target
        setValues({
            ...values,
            toppings: {
              ...values.toppings,
              [name]: checked,
            }
          })
      }
      


  return (
    <form onSubmit={handleSubmit}>
        <div>
            <label>
            Enter your Name: 
            <input 
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder="Enter your name"
            />
        </label>
        {errors.name.length > 0 && <p>{errors.name}</p>}
        </div>
        <div>
            <label>
                Size: 
            <select
                onChange={handleChange}
                value={values.pizzaSize}
                name="pizzaSize"
            >
                <option value="">Please select a size: </option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
            </select>
        </label>
        {errors.pizzaSize.length > 0 && <p>{errors.pizzaSize}</p>}
        </div>
        <div>
           <label>
            Pepperoni <input 
                type="checkbox" 
                name="pepperoni"
                value={values.toppings.pepperoni}
                checked={values.toppings.pepperoni}
                onChange={handleCheckboxChange}
            />
        </label>
        <label>
            Sausage <input 
                type="checkbox" 
                name="sausage"
                checked={values.toppings.sausage}
                onChange={handleCheckboxChange}
            />
        </label>
        <label>
            Bacon <input 
                type="checkbox"
                name="bacon"
                checked={values.toppings.bacon}
                onChange={handleCheckboxChange} 
            />
        </label>
        <label>     
            Mushrooms <input 
                type="checkbox"
                name="mushroom"
                checked={values.toppings.mushroom}
                onChange={handleCheckboxChange} 
            />
        </label>
           
        </div>
        <div>
           <label>
            Special Instructions: 
            <textarea 
                placeholder="Enter special instructions here"
                name="specialInstr"
                onChange={handleChange}
                value={values.specialInstr}
            />
        </label>
        {errors.specialInstr.length > 0 && <p>{errors.specialInstr}</p>} 
        </div>
        
        <button type="submit">add to order</button>
    </form>
  );
};
export default PizzaForm;