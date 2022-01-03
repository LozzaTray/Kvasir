import { config } from "config";
import { IDrink } from "../model/drink";
import * as drinksList from "./dummy/drinks.json";

const getDrinks = async (): Promise<IDrink[]> => {
    if (config.mockBackend) {
        return drinksList.drinks;
    }
    const response = await fetch("/api/pub/drinks");
    const json = await response.json();
    return json.drinks;
};

export { getDrinks };
