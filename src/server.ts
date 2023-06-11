import { serverHttp } from "./http";
import "./websocket";

serverHttp.listen(3000, () => console.log("Server us running on PORT 3000"));

