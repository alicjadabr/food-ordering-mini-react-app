import { useReducer } from "react";
import CartContext from "./cart-context";
 
const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD_ITEM') {
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

    const isItemAlreadyExistIndex = state.items.findIndex(item => item.id === action.item.id)
    const exsistingCartItem = state.items[isItemAlreadyExistIndex];

    let updatedItems;
    if(exsistingCartItem) {
      updatedItems = [...state.items];
      updatedItems[isItemAlreadyExistIndex]  = {
        ...exsistingCartItem,
        amount: exsistingCartItem.amount + 1
      };
    } else {
      updatedItems = state.items.concat(action.item);
    };
    
    return {
        items: updatedItems,
        totalAmount: updatedTotalAmount
      };
  } else if (action.type === 'REMOVE_ITEM') {

  }
  return defaultCartState;
}

const CartProvider = props => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item) => {
    dispatchCartAction({type: 'ADD_ITEM', item: item});
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({type: 'REMOVE_ITEM', id: id});
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler
  }

  return (
  <CartContext.Provider value={cartContext}>
    {props.children}
  </CartContext.Provider>
  );
};

export default CartProvider;