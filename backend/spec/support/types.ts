import { Response } from "supertest";
import { IUser } from "entities/User";
import { IPubDrink } from "model/PubDrink";

export interface IResponse extends Response {
    body: {
        users: IUser[];
        drinks: IPubDrink[];
        error: string;
    };
}

export interface IReqBody {
    user?: IUser;
}
