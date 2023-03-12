import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";

import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [btnAnimated, setBtnAnimated] = useState(false);
  const cartContext = useContext(CartContext)
  const numOfCartItems = cartContext.items.reduce((currentNum, item) => {
    return currentNum + item.amount;
  }, 0);

  // condionally add the animation class
  const btnClasses = `${classes.button} ${btnAnimated ? classes.bump : ''}`;

  useEffect(() => {
    if(cartContext.items.length === 0) {
      return;
    }
    setBtnAnimated(true);

    const timer = setTimeout(() => {
      setBtnAnimated(false);
    }, 300);
    
    // clean up timer
    return () => {
      clearTimeout(timer);
    };
  }, [cartContext.items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Twój koszyk</span>
      <span className={classes.badge}>{numOfCartItems}</span>
    </button>
  );
}

export default HeaderCartButton;
