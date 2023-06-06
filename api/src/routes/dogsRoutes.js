const { Router } = require("express")
const { getDogsHandler, getDog } = require("../handlers/handlerDogs");
const { postDogsHandler } = require("../handlers/handlerDogsPost");

const dogsRouter = Router()


dogsRouter.get("/", getDogsHandler)
dogsRouter.get("/:id", getDog)


dogsRouter.post("/", postDogsHandler)

module.exports = dogsRouter;