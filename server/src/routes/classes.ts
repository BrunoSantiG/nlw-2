import express from "express";
import {
	create as ClassesCreate,
	index as ClassesIndex,
} from "../controller/classes";

const routes = express.Router();

routes.post("/classes", ClassesCreate);
routes.get("/classes", ClassesIndex);

export default routes;
