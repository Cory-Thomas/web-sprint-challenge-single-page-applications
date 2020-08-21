import React, { useState } from "react";
import * as Yup from "yup";


const PizzaForm = ({state}) => {
    const [values, setValues] = useState({
        name: "",
        pizzaSize: "",
        pepperoni: "",
        bacon: "",
        sausage: "",
        mushroom: "",
        specialInstr: ""
      });
    
      const [errors, setErrors] = useState({
        name: "",
        pizzaSize: "",
        pepperoni: "",
        bacon: "",
        sausage: "",
        mushroom: "",
        specialInstr: ""
      });

      const formSchema = Yup.object().shape({
        name: Yup
            .string()
            .min(2, "Name must be at least 2 characters long")
            .required(),
        pizzaSize: Yup
            .string()
            .oneOf(['small', 'medium', 'large'])
            .required('You must select a size'),
        pepperoni: Yup
            .string()
            .oneOf([], 'You must select pepperoni'),
        bacon: Yup
            .string()
            .oneOf([], 'You must select bacon'),
        sausage: Yup
            .string()
            .oneOf([], 'You must select sausage'),
        mushroom: Yup
            .string()
            .oneOf([], 'You must select mushroom'),
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
       state(values);
        setValues({
            name: "",
            pizzaSize: "",
            pepperoni: "",
            bacon: "",
            sausage: "",
            mushroom: "",
            specialInstr: ""
        });
      };

      

      const handleCheckboxChange = evt => {
        const { name, checked } = evt.target
        
        evt.persist();
        Yup.reach(formSchema, evt.target.name)
          .validate(evt.target.value)
          .then((valid) => {
            console.log("valid");
            setErrors({
              ...errors,
                ...values.toppings,
            });
          })
          .catch((err) => {
            setErrors({
              ...errors,
                [evt.target.name]: err.errors[0],
            });
          });

          setValues({
          ...values,
          [name]: checked,
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
                checked={values.pepperoni}
                onChange={handleCheckboxChange}
            />
        </label>
        
        <label>
            sausage <input 
                type="checkbox" 
                name="sausage"
                checked={values.sausage}
                onChange={handleCheckboxChange}
            />
        </label>

        <label>
            Bacon <input 
                type="checkbox"
                name="bacon"
                value="bacon"
                checked={values.bacon}
                onChange={handleCheckboxChange} 
            />
        </label>

        <label>     
            Mushrooms <input 
                type="checkbox"
                name="mushroom"
                checked={values.mushroom}
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