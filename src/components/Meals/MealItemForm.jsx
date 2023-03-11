import Input from "../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  return (
    <form className={classes.form}>
      <Input />
      <button >+</button>
      <button>-</button>
    </form>
  );
}

export default MealItemForm;