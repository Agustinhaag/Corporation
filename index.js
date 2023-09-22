const express = require("express")
const app = express();

require("dotenv").config();

const session = require("cookie-session");
app.use(session({ keys: [process.env.keys] }));

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "./src/views");

const expressLayout = require("express-ejs-layouts");
app.use(expressLayout);
app.set("layout", "./layout/public.ejs");

const {isLogin} = require("./src/middleware/login")

const routeInicio = require("./src/route/indexRoute")
app.use("/", routeInicio)

const loginRoute = require("./src/route/loginRoute")
app.use("/", loginRoute)

const port = process.env.port
app.listen(port, ()=>{
    console.log("hola")
})