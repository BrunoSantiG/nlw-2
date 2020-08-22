import express from "express";

import cors from "cors";

import routesConnections from "./routes/connections";
import routesClasses from "./routes/classes";

const app = express();

app.use(cors());

app.use(express.json());

app.use(routesConnections, routesClasses);

app.listen(3333);
