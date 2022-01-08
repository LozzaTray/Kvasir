import { Controller, Get } from "@decorators/express";
import StatusCodes from "http-status-codes";
import { Request, Response } from "express";
import { PubDrinkDao } from "dao/PubDrink/PubDrinkDao.mock";

const { OK } = StatusCodes;

@Controller("/pub")
export class PubController {
    private pubDrinkDao = new PubDrinkDao();

    @Get("/drinks")
    public async getDrinks(req: Request, res: Response): Promise<Response> {
        const drinks = await this.pubDrinkDao.getAll();
        return res.status(OK).send({ drinks });
    }
}
