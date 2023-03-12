import { useContext } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";

const Cart = (props) => {
  const cartContext = useContext(CartContext);
  const hasItems = cartContext.items.length > 0;

  const cartItemRemoveHandler = id => {

  }

  const cartItemAddHandler = item => {
    
  }

  const cartItems = cartContext.items.map(
    (item) => <CartItem
    key={item.id}
      name={item.name}
      amount={item.amount}
      price={item.price}
      onAdd={cartItemAddHandler.bind(null, item.id)}
      onRemove={cartItemRemoveHandler.bind(null, item)}
    />
  );
  return (
    <Modal onHide={props.onHide}>
      <ul className={classes["cart-items"]}>{cartItems}</ul>
      <div className={classes.total}>
        <span>Wartość całego zamówinia</span>
        <span>{cartContext.totalAmount.toFixed(2)} zł</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHide}>Zamknij</button>
        {hasItems && <button className={classes.button}>Zamów</button>}
      </div>
    </Modal>
  );
};

export default Cart;
