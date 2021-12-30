import StatusCodes from "http-status-codes";
import { Request, Response } from "express";

import UserDao from "dao/User/UserDao.mock";
import { paramMissingError } from "shared/constants";
import { Get, Delete, Post, Put } from "@decorators/express";

const userDao = new UserDao();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;

// User-route
const userRouter = Router();
userRouter.get("/all", getAllUsers);
userRouter.post("/add", addOneUser);
userRouter.put("/update", updateOneUser);
userRouter.delete("/delete/:id", deleteOneUser);

@Controller("/user")
export class UserController {
    @Get("/all")
    public async getAllUsers(req: Request, res: Response): Promise<Response> {
        const users = await userDao.getAll();
        return res.status(OK).json({ users });
    }

    @Post("/add")
    public async addOneUser(
        req: Request,
        res: Response
    ): Promise<Response | void> {
        const { user } = req.body;
        if (!user) {
            return res.status(BAD_REQUEST).json({
                error: paramMissingError,
            });
        }
        await userDao.add(user);
        return res.status(CREATED).end();
    }

    @Put("/update")
    public async updateOneUser(
        req: Request,
        res: Response
    ): Promise<Response | void> {
        const { user } = req.body;
        if (!user) {
            return res.status(BAD_REQUEST).json({
                error: paramMissingError,
            });
        }
        user.id = Number(user.id);
        await userDao.update(user);
        return res.status(OK).end();
    }

    @Delete("/delete/:id")
    public async deleteOneUser(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await userDao.delete(Number(id));
        return res.status(OK).end();
    }
}
