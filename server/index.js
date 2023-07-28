const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Stripe = require("stripe");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json({ limit: "10mb" }));

//mongodb connection
mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connected to database"))
  .catch((error) => console.log(error));

//schema

const userSchema = mongoose.Schema({
  firstName: String,

  lastName: String,

  email: {
    type: String,
    unique: true,
  },

  password: String,

  confirmPassword: String,
});

const userModel = mongoose.model("user", userSchema);

//api
app.get("/", (req, res) => {
  res.send("server is running");
});

//signup api
app.post("/signup", (req, res) => {
  const userData = req.body;

  userModel
    .findOne({ email: userData.email })
    .then((existingUser) => {
      if (existingUser) {
        // Email is already registered
        res.status(409).json({ error: "Email is already registered" });
      } else {
        // Email is not registered, proceed with signup
        saveUserDataToDatabase(userData)
          .then(() => {
            res.status(200).json({ message: "Signup successful" });
          })
          .catch((error) => {
            console.error(error);
            res.status(500).json({ error: "An error occurred during signup" });
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "An error occurred during signup" });
    });
});

//login api

app.post("/login", (req, res) => {
  const userData = req.body;

  userModel
    .findOne({ email: userData.email })
    .then((existingUser) => {
      if (existingUser) {
        // Email is already registered
        const dataSend = {
          _id: existingUser._id,
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
          email: existingUser.email,
        };

        res.status(200).json({ message: "Login successful", data: dataSend });
      } else {
        // Email is not registered, proceed with signup
        saveUserDataToDatabase(userData)
          .then(() => {
            res
              .status(409)
              .json({ message: "Email is not available, please signup" });
          })
          .catch((error) => {
            console.error(error);
            res.status(500).json({ error: "An error occurred during signup" });
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "An error occurred during signup" });
    });
});

function saveUserDataToDatabase(userData) {
  const user = new userModel(userData);
  return user.save();
}
// product section//

const schemaProduct = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
});
const productModel = mongoose.model("product", schemaProduct);

// save product in data

//newProduct api

app.post("/newProduct", async (req, res) => {
  const data = await productModel(req.body);
  const datasave = await data.save();
  res.send({ message: "upload successfully" });
});

// checkout payment

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post("/create-checkout-session", async (req, res) => {
  try {
    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_options: [{ shipping_rate: "shr_1NYUefSDlZDRdhHGMOviGuPk" }],

      line_items: req.body.map((item) => {
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item.name,
              // images : [item.image]
            },
            unit_amount: item.price * 100,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.qty,
        };
      }),

      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    };

    const session = await stripe.checkout.sessions.create(params);
    res.status(200).json(session.id);
  } catch (err) {
    res.status(err.statusCode || 500).json(err.message);
  }
});

//poroduct api

app.get("/product", async (req, res) => {
  const data = await productModel.find({});
  res.send(JSON.stringify(data));
});

app.listen(PORT, () => console.log(`server is running at port: ${PORT}`));
