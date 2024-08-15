const Admin = require("../Models/adminModels");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

// const register = async (req, res) => {
//   const { name, email, password } = req.body;
//   console.log("Received registration request:", { name, email });

//   try {
//     console.log("Checking if user already exists");
//     const userExists = await Admin.findByEmail(email);
//     if (userExists) {
//       console.log("User already exists");
//       return res.status(409).json("User already exists");
//     }

//     console.log("Creating new user");
//     const newUser = await Admin.createUser(name, email, password);
//     console.log("User created successfully:", newUser);

//     const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: "1h" });
//     console.log("JWT token generated");

//     res
//       .status(200)
//       .json({ token, userId: newUser.id, message: "User created", newUser });
//   } catch (err) {
//     console.error("Error in registration:", err.message);
//     res.status(500).json("Server error");
//   }
// };

const register = async (req, res) => {
  const { email, password } = req.body;
  console.log("Received registration request for email:", email);

  try {
    console.log("Checking if user already exists");
    const userExists = await Admin.findByEmail(email);
    if (userExists) {
      console.log("User already exists");
      return res.status(409).json("User already exists");
    }

    console.log("Creating new user");
    const newUser = await Admin.createUser(email, password);
    console.log("User created successfully:", newUser);

    const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: "1h" });
    console.log("JWT token generated");

    res.cookie("Token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
  } catch (err) {
    console.error("Error in registration:", err.message);
    res.status(500).json("Server error");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Received login request for email:", email);

  try {
    console.log("Finding user by email");
    const user = await Admin.findByEmail(email);
    if (user) {
      console.log("User found, comparing passwords");
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        console.log("Password match, generating token");
        const token = jwt.sign({ id: user.id }, JWT_SECRET, {
          expiresIn: "1h",
        });
        res.json({ token, userId: user.id });
      } else {
        console.log("Password mismatch");
        res.status(401).json({ message: "Invalid credentials" });
      }
    } else {
      console.log("User not found");
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json("Server error");
  }
};

const view = async (req, res) => {
  console.log("Accessed protected view route");
  res.status(200).json({ message: "You can see data :)" });
};

const protectedRoute = (req, res) => {
  console.log("Accessed protected route");
  res.status(200).json({
    id: req.tokenValid.id,
    username: req.tokenValid.username,
  });
};

module.exports = { register, login, view, protectedRoute };
