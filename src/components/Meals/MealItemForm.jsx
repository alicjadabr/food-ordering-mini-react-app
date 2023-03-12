import { useRef, useState } from "react";
import Input from "../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = event => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNum = +enteredAmount;
    if(enteredAmount.trim().length === 0 || enteredAmountNum < 1 || enteredAmountNum > 50) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNum);

  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input 
        ref={amountInputRef}
        label="Ilość"
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '10',
          step: '1',
          defaultValue: '1'
        }}
      />
      <button type="sumbit">+</button>
      {!amountIsValid && <p>Wprowadź prawidłową ilość produktu (1-10).</p>}
    </form>
  );
}

export default MealItemForm;