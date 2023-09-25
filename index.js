const express = require("express")
const app = express();

require("dotenv").config();

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

const override = require("method-override");
app.use(override("_method"));

const expressLayout = require("express-ejs-layouts");
app.use(expressLayout);
app.set("layout", "./layout/public.ejs");

app.set("view engine", "ejs");
app.set("views", "./src/views");

const session = require("cookie-session");
app.use(session({ keys: [process.env.keys] }));

const {isLogin} = require("./src/middleware/login")

const routeInicio = require("./src/route/indexRoute")
app.use("/", routeInicio)

const useRoute = require("./src/route/userRoute")
app.use("/user",isLogin ,useRoute)

const loginRoute = require("./src/route/loginRoute")
app.use("/", loginRoute)

const port = process.env.port
app.listen(port, ()=>{
    console.log(`http://localhost:${port}`)
})