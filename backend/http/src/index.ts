import express from "express";
import { routes } from "./routes/route";

const app = express();

app.use("/api/v1",routes);

app.listen(3000, ()=>{
    console.log("server is running at the port 3000");
})