const express = require('express');
const { spawn } = require('child_process');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoute = require("./Routes/UserRouter");
const connectToDatabase = require("./DBConnection/DBConfig");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());

app.use("/", userRoute);
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

connectToDatabase().then(() => {
  // Start the server only after the database is connected
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Failed to connect to the database. Server not started.', error);
});