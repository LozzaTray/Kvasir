import jsonfile from "jsonfile";
import { IUser } from "model/User";
import { IPubDrink } from "model/PubDrink";

interface IDatabase {
    users: IUser[];
    pubDrinks: IPubDrink[];
}

class MockDaoMock {
    private readonly dbFilePath = "src/dao/MockDb/MockDb.json";

    protected openDb(): Promise<IDatabase> {
        return jsonfile.readFile(this.dbFilePath) as Promise<IDatabase>;
    }

    protected saveDb(db: IDatabase): Promise<void> {
        return jsonfile.writeFile(this.dbFilePath, db);
    }
}

export default MockDaoMock;
