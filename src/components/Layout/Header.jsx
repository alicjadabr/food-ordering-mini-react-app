import classes from "./Header.module.css";
import headerImage from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";

const Header = () => {
  return (
    <> 
      <header className={classes.header}>
        <h1>Łowcy smaku</h1>
        <HeaderCartButton />
      </header>
      <div className={classes['main-image']}>
        <img src={headerImage} alt="a table full of meals"/>
      </div>
    </>
  );
}

export default Header;
 