const express = require("express");
const jsonParser = express.json();
const userRouter = require("./routers/user");
const imageRouter = require("./routers/image");
const authRouter = require("./routers/auth");
const authMiddleware = require("./auth/middleware");

const app = express();

const PORT = process.env.PORT || 4000;

app.use(jsonParser);
app.use("/users", userRouter);
app.use("/images", authMiddleware, imageRouter);
app.use("/auth", authRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
