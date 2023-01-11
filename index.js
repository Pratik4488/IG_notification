const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const mongoose = require("mongoose");
const loginRoute = require("./routes/userAuth")
// const io = new Server(httpServer, {
//     cors: {
//         origin: "*",
//         credentials: true
//     }
// });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));



mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/User").then(
  () => {
    console.log("mongodb connected...");
  },
  (err) => console.log(err)
);


app.get("/", (req, res) => {
  res.status(200).send("hello");
});

app.use("/auth", loginRoute)


io.on("connection", (socket) => {
  // ...
    console.log(socket.id);

    socket.emit("user-connected", socket.id);
    socket.on("new-notification", (data, sid) => {
        socket.emit("new-notify", data, sid);
    });
    socket.on("new-message", (data, sid) => {
      socket.broadcast.emit("new-msg", data, sid);
    });
});

server.listen(3000);
