import express from "express";
import cors from "cors";
import { config } from "./config";
import connectDB from "./configuration/db";
import routes from "./routes/indexRoute";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
connectDB();
app.use(express.json());
app.use(cors());

app.listen(config.PORT, () => {
  console.log(` \n Server running on port ${config.PORT}`);
});

app.use("/api", routes);
app.use(errorHandler);
