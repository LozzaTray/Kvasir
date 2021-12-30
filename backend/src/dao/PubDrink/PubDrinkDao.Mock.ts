import { IPubDrink } from "entity/PubDrink";
import MockDaoMock from "../MockDb/MockDao.mock";
import { IPubDrinkDao } from "./PubDrinkDao";

export class PubDrinkDao extends MockDaoMock implements IPubDrinkDao {
    public async getAll(): Promise<IPubDrink[]> {
        const db = await super.openDb();
        return db.pubDrinks;
    }
}
