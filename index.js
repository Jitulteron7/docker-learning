const express = require("express");
const {
  MONGO_IP,
  MONGO_PASSWORD,
  MONGO_PORT,
  MONGO_USER,
  SESSION_SECRET,
  REDIS_URL,
  REDIS_PORT,
} = require("./config/config");

const session = require("express-session");
const redis = require("redis");
const redisStore = require("connect-redis")(session);
const redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT,
});
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const app = express();
const cors = require("cors");
const postRouter = require("./routes/post.route");
const authRouter = require("./routes/auth.route");
app.use(cors({}));
app.use(express.json());

// note: do not depend on docker or docker orchestrator to handle connections
// make sure that your application logic can handle that
const connectRetry = () => {
  mongoose
    .connect(
      `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
    )
    .then(() => {
      console.log("Successfully connected to db");
    })
    .catch((err) => {
      console.log(err);
      setTimeout(connectRetry, 5000);
    });
};
connectRetry();
app.enable("trust proxy");
app.use(
  session({
    store: new redisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
      secure: false,
      resave: false,
      saveUninitialized: false,
      httpOnly: true,
      maxAge: 60000,
    },
  })
);

app.get("/api/v1", (req, res) => {
  console.log("running!!");
  res.send("<h2>Hi testing !!</h2>");
});
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/auth", authRouter);

app.listen(port, () => {
  if (process.env.NODE_ENV === "development") {
    console.log("listening on port " + port + " development");
  } else {
    console.log("listening on port " + port + " production");
  }
});
