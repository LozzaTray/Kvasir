import { Controller, Get } from "@decorators/express";
import StatusCodes from "http-status-codes";
import { Request, Response } from "express";
import PubDrinkDao from "dao/PubDrink/PubDrinkDao.mock";

const { BAD_REQUEST, CREATED, OK } = StatusCodes;

@Controller("/pub")
export class PubController {
    private pubDrinkDao = new PubDrinkDao();

    @Get("/drinks")
    public getDrinks(req: Request, res: Response): Promise<Response> {
        const drinks = await this.pubDrinkDao.getAll();
        res.status(OK).send({ drinks });
    }
}
