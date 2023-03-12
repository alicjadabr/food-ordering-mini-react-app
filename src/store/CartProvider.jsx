import { useReducer } from "react";
import CartContext from "./cart-context";
 
const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  // logika dodawania produktu do koszyka, zwiększania liczby 
  if (action.type === 'ADD_ITEM') {
    // update wartości całego koszyka w oparciu o ilość (sztuk) dodanego produktu
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
    // sprawdzanie czy przekazane przez action item.id posiada któryś z itemow z state.items
    //  jeśli istnieje taki item, zwrany jest jego indeks, inaczej -1
    const isItemAlreadyExistIndex = state.items.findIndex(item => item.id === action.item.id);
    // znaleziony item {obj} zapisany do const
    const exsistingCartItem = state.items[isItemAlreadyExistIndex];
    let updatedItems;
    
    // jeśli dodany produkt jest już w koszyku
    if(exsistingCartItem) {
      // kopiowanie produktów z poprzedniego stanu do updatedItems - nie powinno się modyfikować poprzedniego snapshota!
      updatedItems = [...state.items];
      // nadpisanie pola amount o 1 
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
      // logika zmniejszania ilości/usuwania produktu z koszyka
  } else if (action.type === 'REMOVE_ITEM') {

    const indexItemToRemove = state.items.findIndex(item => item.id === action.id);
    const exsistingCartItem = state.items[indexItemToRemove];
    const updatedTotalAmount = state.totalAmount - exsistingCartItem.price;
    let updatedItems;

    // przypadek kiedy ilość produktu do usunięcia z koszyka === 1 - czyli będzie całkiem usuwany z koszyka
    if(exsistingCartItem.amount === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id)
    // przypadek kiedy ilość produktu do usunięcia z koszyka > 1 - zmniejszamy jego ilość o 1
    } else {
      updatedItems = [...state.items];
      // nadpisanie pola amount o -1 
      updatedItems[indexItemToRemove]  = {
        ...exsistingCartItem,
        amount: exsistingCartItem.amount - 1
      };
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };

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