import * as dao from "./dao.js";
//let currentUser = null;
export default function UserRoutes(app) {
  const createUser = (req, res) => { };
  const deleteUser = (req, res) => { };
  const findAllUsers = (req, res) => { };
  const findUserById = (req, res) => { };

  //update
  const updateUser = (req, res) => {
    const userId = req.params.userId;
    const userUpdates = req.body;
    dao.updateUser(userId, userUpdates);
    const currentUser = dao.findUserById(userId);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };

  //signup
  const signup = (req, res) => {
    const user = dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json(
        { message: "Username already in use" });
      return;
    }
    const currentUser = dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };

  //signin
  const signin = (req, res) => {
    const { username, password } = req.body;
    console.log("I am here at signin.")
    const currentUser = dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
    } else {
      res.status(401).json({ message: "Unable to login. Try again later." });
    }
    res.json(currentUser);
  };

  //signout
  const signout = (req, res) => {
    //currentUser = null;
    req.session.destroy();
    res.sendStatus(200);
  };

  //profile
  const profile = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }

    res.json(currentUser);
  };

  console.log("I am here at UserRoutes")
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
}

