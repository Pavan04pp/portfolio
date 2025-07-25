const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const router = express.Router();

const DATA_FILE = path.join(__dirname, '../data/works.json');
const IMAGES_DIR = path.join(__dirname, '../public/images');

// Ensure data and images directory exist
if (!fs.existsSync(path.join(__dirname, '../data'))) fs.mkdirSync(path.join(__dirname, '../data'));
if (!fs.existsSync(IMAGES_DIR)) fs.mkdirSync(IMAGES_DIR);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, IMAGES_DIR),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

function readWorks() {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}
function writeWorks(works) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(works, null, 2));
}

// GET /api/works
router.get('/', (req, res) => {
  res.json(readWorks());
});

// POST /api/works
router.post('/', upload.single('image'), (req, res) => {
  const works = readWorks();
  const { title, description } = req.body;
  const image = req.file ? `/images/${req.file.filename}` : null;
  const newWork = {
    id: Date.now().toString(),
    title,
    description,
    image
  };
  works.push(newWork);
  writeWorks(works);
  res.status(201).json(newWork);
});

// DELETE /api/works/:id
router.delete('/:id', (req, res) => {
  let works = readWorks();
  const work = works.find(w => w.id === req.params.id);
  if (!work) return res.status(404).json({ error: 'Not found' });
  if (work.image) {
    const imgPath = path.join(IMAGES_DIR, path.basename(work.image));
    if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
  }
  works = works.filter(w => w.id !== req.params.id);
  writeWorks(works);
  res.json({ success: true });
});

module.exports = router; 