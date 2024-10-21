const express = require("express");
const { spawn } = require("child_process");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./Routes/UserRouter");
const connectToDatabase = require("./DBConnection/DBConfig");
require("dotenv").config();
const config = require("./config");

// Import routes for auth and admin
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
// MongoDB connection
mongoose
  .connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.error(err));

// SDK Schema and Model
const sdkSchema = new mongoose.Schema({
  name: String,
  language: String,
  code: String,
  description: String,
});

const SDK = mongoose.model("SDK", sdkSchema);

app.use("/", userRoute);

// Routes for SDK Management
app.get("/api/sdks", async (req, res) => {
  try {
    const sdks = await SDK.find();
    res.json(sdks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/sdks", async (req, res) => {
  const { name, language, code, description } = req.body;
  try {
    const newSdk = new SDK({ name, language, code, description });
    await newSdk.save();
    res.json(newSdk);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/search", async (req, res) => {
  const { name } = req.body;
  try {
    const sdk = await SDK.findOne({ name: name });
    res.json(sdk);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Root route
app.get("/", (req, res) => {
  res.send("Welcome to SmartChat API!");
});
// Chat route
app.post("/api/chat", async (req, res) => {
  const userInput = req.body.message;
  console.log("Received message:", userInput); // Log incoming messages

  if (!userInput) {
    return res.status(400).send("Message is required");
  }

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userInput }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("OpenAI Response:", response.data); // Log the response from OpenAI
    res.json({ response: response.data.choices[0].message.content });
  } catch (error) {
    console.error("Error communicating with AI:", error.message); // Log any errors
    res.status(500).send("Error communicating with AI");
  }
});

// Routes for User Authentication and Management
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/admin", adminRoutes); // Admin management routes

// Handle Terraform actions
// app.post('/terraform', (req, res) => {
//   console.log(req.body);

//   // Write the request body to config.json
//   fs.writeFile('config.json', JSON.stringify(req.body, null, 2), (error) => {
//     if (error) {
//       console.error('Error writing JSON data to file:', error);
//       return res.status(500).json({ error: 'Error saving JSON data to file' });
//     }
//     console.log('JSON data saved to config.json');
//   });

//   const terraformInit = spawn('terraform', ['init']);

//   terraformInit.stdout.on('data', (data) => {
//     console.log(`terraform init: ${data}`);
//   });

//   terraformInit.stderr.on('data', (data) => {
//     console.error(`terraform init error: ${data}`);
//   });

//   terraformInit.on('close', (code) => {
//     if (code !== 0) {
//       return res.status(500).json({ error: 'Terraform init failed' });
//     }

//     const terraformPlan = spawn('terraform', ['plan']);

//     terraformPlan.stdout.on('data', (data) => {
//       console.log(`terraform plan: ${data}`);
//     });

//     terraformPlan.stderr.on('data', (data) => {
//       console.error(`terraform plan error: ${data}`);
//     });

//     terraformPlan.on('close', (code) => {
//       if (code !== 0) {
//         return res.status(500).json({ error: 'Terraform plan failed' });
//       }

//       const terraformApply = spawn('terraform', ['apply', '--auto-approve']);

//       terraformApply.stdout.on('data', (data) => {
//         console.log(`terraform apply: ${data}`);
//       });

//       terraformApply.stderr.on('data', (data) => {
//         console.error(`terraform apply error: ${data}`);
//       });

//       terraformApply.on('close', (code) => {
//         if (code !== 0) {
//           return res.status(500).json({ error: 'Terraform apply failed' });
//         }
//         res.json({ message: 'Terraform apply successful' });
//       });
//     });
//   });
// });

// Handle Terraform destroy action
// app.post('/tfdestroy', (req, res) => {
//   const terraformDestroy = spawn('terraform', ['destroy', '--auto-approve']);

//   terraformDestroy.stdout.on('data', (data) => {
//     console.log(`terraform destroy: ${data}`);
//   });

//   terraformDestroy.stderr.on('data', (data) => {
//     console.error(`terraform destroy error: ${data}`);
//   });

//   terraformDestroy.on('close', (code) => {
//     if (code !== 0) {
//       return res.status(500).json({ error: 'Terraform destroy failed' });
//     }
//     res.json({ message: 'Terraform destroy successful' });
//   });
// });

/* connectToDatabase().then(() => {
  // Start the server only after the database is connected
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Failed to connect to the database. Server not started.', error);
}); */
