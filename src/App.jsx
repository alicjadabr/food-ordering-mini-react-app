import { useState } from "react";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [showShopCart, setShowShopCart] = useState(false);

  const showHideCartHandler = () => {
    setShowShopCart(showShopCart => !showShopCart);
  };



  return (
    <CartProvider>
      {showShopCart && <Cart onHide={showHideCartHandler} />}
      <Header onShow={showHideCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider >
  );
}

export default App;
