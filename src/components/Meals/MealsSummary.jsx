import classes from "./MealsSummary.module.css";

const MealsSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>Wybierz coś smakowitego dla siebie</h2>  
      <p>Nasze potrawy są owocem pracy, pasji i zaangażowania. 
        Wytwarzane tylko z naturalnych produktów. Powstają w atmosferze domowego 
        ciepła i rodzinnych tradycji.</p>
    </section>
  );
}

export default MealsSummary;