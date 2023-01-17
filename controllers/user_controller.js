const bcrypt = require("bcrypt");
const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");

module.exports.home = function (req, res) {
  return res.end("<h1> Hey Welcome This is Home Page !  </h1>");
};

module.exports.dashboard = function (req, res) {
  return res.end("<h1> Dashboard </h1>");
};

module.exports.register = async (req, res) => {
  const { name, email, phone, password, confirmPassword } = req.body;

  if (!name || !email || !phone || !password || !confirmPassword) {
    return res.status(422).json({ error: "Pls fill all the details" });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res
        .status(422)
        .json({ success: false, message: "email already registered with us" });
    } else if (password !== confirmPassword) {
      return res.status(422).json({
        success: false,
        message: "password and confirmPassword doesnot match ! ",
      });
    } else {
      const user = new User({ 
        name, 
        email, 
        phone, 
        password : bcrypt.hashSync(req.body.password, 8)
      });
      const userRegister = await user.save();
      if (userRegister) {
        res
          .status(201)
          .json({ success: true, message: " user registerd successfully" });
      }
    }

    //  password and confirm password
  } catch (err) {
    console.log(err);
  }
};

module.exports.login = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.json(422, {
        success: false,
        message: "User Not Found !",
      });
    }

    //comparing passwords
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).json({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Sign in successfull , here is your token keep it safe !",
      accessToken: jwt.sign(user.toJSON(), process.env.SECRET_KEY, {
        expiresIn: "100000000",
      }),
      user: user,
    });
  } catch (error) {
    console.log("******", error);
    return res.json(500, {
      success: false,
      message: "Internal Server Error",
    });
  }
};


module.exports.content = function (req, res) {
  const user = req.user ; 
  console.log(req.user) ; 
  if (!user) {
    res.status(403)
      .json({
        message: "Invalid JWT token"
      });
  }
  if (req.user.name == "ashish10") {
    res.status(200)
      .json({
        message: "Congratulations! but there is no hidden content"
      });
  } else {
    res.status(403)
      .json({
        message: "Unauthorised access"
      });
  }
}