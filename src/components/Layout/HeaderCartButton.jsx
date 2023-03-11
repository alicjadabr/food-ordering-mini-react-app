import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = () => {
  return (
    <button className={classes.button}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Twój koszyk</span>
      <span className={classes.badge}>10</span>
    </button>
  );
}

export default HeaderCartButton;
