const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const SDK = require('../models/SDK');

router.get('/', auth, async (req, res) => {
  try {
    const sdks = await SDK.find({ user: req.user.id });
    res.json(sdks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', auth, async (req, res) => {
  const { name, language, code, description } = req.body;

  try {
    const newSdk = new SDK({
      name,
      language,
      code,
      description,
      user: req.user.id,
    });

    await newSdk.save();
    res.json(newSdk);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
