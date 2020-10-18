//extension packages
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//extension files
const User = require('../models/userModel');
const auth = require('../middleware/auth');
router.post('/register', async (req, res) => {
  try {
    //Validation process
    let { email, password, passwordCheck, displayName } = req.body;
    if (!email || !password || !passwordCheck) {
      return res.status(400).json({ msg: 'Please fill all fields' });
    }
    if (password.length < 5) {
      return res.status(400).json({ msg: 'Password to short' });
    }
    if (password !== passwordCheck) {
      return res.status(400).json({ msg: 'Enter same password pre' });
    }
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ msg: 'Email is already use' });
    }

    if (!displayName) displayName = email;

    //Hashing Password using bcrypt
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    console.log(passwordHash);

    //Storing data of User to newUser id
    const newUser = new User({
      email,
      password: passwordHash,
      displayName,
    });

    //Saving in mongodb
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    //Validation
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please fill all fields' });
    }

    // Finding user email in database for logging in
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: `Email doesn't exist` });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    //printing user information
    res.json({
      token,
      user: {
        id: user._id,
        displayName: user.displayName,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//auth.js will execute first then proceed to requesting
router.delete('/delete', auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/tokenIsValid', async (req, res) => {
  try {
    //If the token is not exist
    const token = req.header('x-auth-token');
    if (!token) return res.json(false);
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);
    const user = await User.findById(verified.id);
    if (!user) return res.json(false);
    //If the token is exist
    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
