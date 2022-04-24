import { config } from "config";
import { IPubDrink } from "../model/drink";
import * as drinksList from "./dummy/drinks.json";

const getPubDrinks = async (): Promise<IPubDrink[]> => {
    if (config.mockBackend) {
        return drinksList.pubDrinks;
    }
    const response = await fetch("/api/pub/drinks");
    const json = await response.json();
    return json.drinks;
};

export { getPubDrinks };
