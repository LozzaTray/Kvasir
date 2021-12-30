import { IPubDrink } from "entity/PubDrink";

export interface IPubDrinkDao {
    getAll: () => Promise<IPubDrink[]>;
}

export class PubDrinkDao implements IPubDrinkDao {
    public async getAll(): Promise<IPubDrink[]> {
        throw new Error("Not implemented");
    }
}
