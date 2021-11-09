import express from 'express';
import cors from 'cors';

import { artistsGet, artistsPost } from './controllers/artists.js';
import { galleryGet, galleryPost } from './controllers/galeries.js';
import { artsGet, artsPost } from './controllers/arts.js';
import { artCategoryGet, artCategoryPost } from './controllers/artCategory.js';

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

export default app;
