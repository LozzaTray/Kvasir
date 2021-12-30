import { IDrink } from "./Drink";
import { IPub } from "./Pub";

export interface IPubDrink {
    pub: IPub;
    drink: IDrink;
    pence: number;
}
