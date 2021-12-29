import { IDrink } from "../model/drink";
import * as drinksList from "./dummy/drinks.json";

const getDrinks = (): IDrink[] => {
  // TODO: Hook up with api once built
  return drinksList.drinks;
};

export { getDrinks };
