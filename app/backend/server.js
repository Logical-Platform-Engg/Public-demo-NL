const express = require('express');
const { triggerWorkflow } = require('./functions/feature');
const app = express();
const port = process.env.PORT || 5000;

// Define a route
app.use(express.json());

app.get('/trigger',async (req, res) => {
  // console.log('triggering github pipeline' , req.body)
  metadata = {
    "environment": "dev",
    "github_owner" : "semii404",
    "github_repo" : "test-pipe",
    "branch" : "dev",
    "workflow_file" : "post.yaml",
    "variables" : req.body
  }
  const result = await triggerWorkflow(metadata, process.env.github_token);
  res.send(result);
});


app.get('/', (req, res) => {
  res.send('Hello from the Express backend!');
});
// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
