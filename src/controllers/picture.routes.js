const express = require('express');
const router = express.Router();
const Picture = require('../models/picture.model');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), async (req, res) => {
  const requestFile = req.file;

  if (!requestFile) {
    return res.status(400).send('No file sent');
  }

  const data = {
    originalName: requestFile.originalname,
    uniqueName: requestFile.filename,
    path: requestFile.destination,
    mimeType: requestFile.mimetype,
    size: requestFile.size,
    UserId: (req.body && req.body.userId) || null,
  };

  const created = await Picture.create(data)
    .catch(() => res.status(500).send('Unable to create the picture'));

  res.send(created.id);
});

router.get('/:id', async (req, res) => {
  const picture = await Picture.findOne({ where: { id: req.params.id } });

  if (!picture) {
    return res.status(404).send('Picture not found');
  }

  res.download(`${picture.path + picture.uniqueName}`, picture.originalName);
})

exports.initializeRoutes = () => router;
