import supertest from "supertest";
import StatusCodes from "http-status-codes";
import { SuperTest, Test } from "supertest";

import app from "app";
import { PubDrinkDao } from "dao/PubDrink/PubDrinkDao.mock";
import User, { IUser } from "entity/User";
import { paramMissingError } from "shared/constants";
import { IReqBody, IResponse } from "../support/types";

describe("Pub Routes", () => {
    const usersPath = "/api/pub";
    const getDrinksPath = `${usersPath}/drinks`;

    const { BAD_REQUEST, CREATED, OK } = StatusCodes;
    let agent: SuperTest<Test>;

    beforeAll((done) => {
        agent = supertest.agent(app);
        done();
    });

    describe(`"GET:${getDrinksPath}"`, () => {
        it(`should return a JSON object with all the drinks and a status code of "${OK}" if the
            request was successful.`, (done) => {
            // Setup spy
            const drinks = [
                {
                    pub: {
                        lat: 10,
                        lng: 20,
                        name: "PubName",
                    },
                    drink: {
                        name: "Stella",
                    },
                    pence: 210,
                },
            ];
            spyOn(PubDrinkDao.prototype, "getAll").and.returnValue(
                Promise.resolve(drinks)
            );
            // Call API
            agent.get(getDrinksPath).end((_err: Error, res: IResponse) => {
                expect(res.status).toBe(OK);
                // Caste instance-objects to 'User' objects
                const respDrinks = res.body.drinks;
                expect(respDrinks).toEqual(drinks);
                expect(res.body.error).toBeUndefined();
                done();
            });
        });

        it(`should return a JSON object containing an error message and a status code of
            "${BAD_REQUEST}" if the request was unsuccessful.`, (done) => {
            // Setup spy
            const errMsg = "Could not fetch pub drinks.";
            spyOn(PubDrinkDao.prototype, "getAll").and.throwError(errMsg);
            // Call API
            agent.get(getDrinksPath).end((err: Error, res: IResponse) => {
                expect(res.status).toBe(BAD_REQUEST);
                expect(res.body.error).toBe(errMsg);
                done();
            });
        });
    });
});
