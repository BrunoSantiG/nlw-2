import express from "express";

import {
	create as ConnectionsCreate,
	index as ConnectionsIndex,
} from "../controller/connections";

const routes = express.Router();

routes.post("/connections", ConnectionsCreate);
routes.get("/connections", ConnectionsIndex);

export default routes;
