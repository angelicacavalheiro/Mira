import express from 'express';
import cors from 'cors';
import singUp from './controllers/signUp/signUp.js';
import signIn from './controllers/signIn/signIn.js';

import { artistsGet, artistsPost } from './controllers/artists.js';
import { galleryGet, galleryPost } from './controllers/galeries.js';
import { artsGet, artsPost } from './controllers/arts.js';
import { artCategoryGet, artCategoryPost } from './controllers/artCategory.js';
import { stockGet, stockPost } from './controllers/stock.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/artists', artistsPost);
app.get('/artists', artistsGet);

app.get('/galeries', galleryGet);
app.post('/galeries', galleryPost);

app.get('/arts', artsGet);
app.post('/arts', artsPost);

app.get('/artCategory', artCategoryGet);
app.post('/artCategory', artCategoryPost);

app.get('/stock', stockGet);
app.post('/stock', stockPost);

app.get('/status', (req, res) => {
  // Manda como resposta o texto 'Hello World'
  res.send('Server online');
});

app.post('/sign-up', singUp);
app.post('/sign-in', signIn);

export default app;
