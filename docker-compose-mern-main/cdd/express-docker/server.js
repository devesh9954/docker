const express = require('express');
const PORT = process.env.PORT || 5500;
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
// const  User = require('./models/user.model.js');
const bcryptjs= require( 'bcryptjs');
// import { errorHandler } from '../utils/error.js';
const jwt = require( 'jsonwebtoken');
app.use(express.json());
app.use(cors());

// Database connection
mongoose.set('strictQuery', false);

mongoose.connect('mongodb://mongo:27017/FriendsDiary',  {useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO ERROR!!!!")
        console.log(err)
    })


const Product = mongoose.model('Product', { name: String, price: Number });
app.get('/', (req, res) => {
    return res.send('Welcome to Node js, express js in Docker');
});
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg',
    },
  },
  { timestamps: true }
);

const errorHandler = (statusCode, message) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};
const User = mongoose.model('User', userSchema);

app.post('/api/products', async (req, res) => {
    const product = new Product({ name: req.body.name, price: req.body.price });
    const savedProduct = await product.save();
    return res.status(201).json(savedProduct);
});

app.get('/api/products', async (req, res) => {
    const products = await Product.find();
    return res.json(products);
});

app.delete('/api/products/:id', async (req, res) => {
    const product = await Product.deleteOne({ id: req.params.id });
    return res.json(product);
});
app.post('/auth/signup',async (req, res, next) => {
    const { username, email, password } = req.body;
      const hashedPassword = bcryptjs.hashSync(password, 10);
      
      const newUser = new User({ username, email, password: hashedPassword });
      console.log(newUser);
      try {
        await newUser.save();
        // Fetch all users from the database
        const users = await User.find();
        // Log users to the console
        console.log(users);
        res.status(201).json({ message: 'User created successfully' });
      } catch (error) {
        next(error);
      }
    });
    app.post('/auth/signin',async (req, res, next) => {
      const { email, password } = req.body;
      try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, 'User not found'));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, 'wrong credentials'));
        const token = jwt.sign({ id: validUser._id }, 'sjss');
        const { password: hashedPassword, ...rest } = validUser._doc;
        const expiryDate = new Date(Date.now() + 3600000); // 1 hour
        res
          .cookie('access_token', token, { httpOnly: true, expires: expiryDate })
          .status(200)
          .json(rest);
      } catch (error) {
        next(error);
      }
    });
    app.post('/auth/google',async (req, res, next) => {
      try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
          const token = jwt.sign({ id: user._id }, 'sjss');
          const { password: hashedPassword, ...rest } = user._doc;
          const expiryDate = new Date(Date.now() + 3600000); // 1 hour
          res
            .cookie('access_token', token, {
              httpOnly: true,
              expires: expiryDate,
            })
            .status(200)
            .json(rest);
        } else {
          const generatedPassword =
            Math.random().toString(36).slice(-8) +
            Math.random().toString(36).slice(-8);
          const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
          const newUser = new User({
            username:
              req.body.name.split(' ').join('').toLowerCase() +
              Math.random().toString(36).slice(-8),
            email: req.body.email,
            password: hashedPassword,
            profilePicture: req.body.photo,
          });
          await newUser.save();
          const token = jwt.sign({ id: newUser._id }, 'sjss');
          const { password: hashedPassword2, ...rest } = newUser._doc;
          const expiryDate = new Date(Date.now() + 3600000); // 1 hour
          res
            .cookie('access_token', token, {
              httpOnly: true,
              expires: expiryDate,
            })
            .status(200)
            .json(rest);
        }
      } catch (error) {
        next(error);
      }
    });
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
