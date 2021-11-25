import express from 'express';
import cors from 'cors';
import signIn from './controllers/signIn/signIn.js';
import getCartItems from './controllers/cartItems/getCartItems.js';
import postCancelItem from './controllers/cartItems/postCancelItem.js';
import getCheckOutList from './controllers/checkOut/getCheckOutList.js';
import { artistsGet, artistsPost } from './controllers/artists.js';
import { galleryGet, galleryPost } from './controllers/galeries.js';
import { artsGet, artsPost } from './controllers/arts.js';
import { artCategoryGet, artCategoryPost } from './controllers/artCategory.js';
import { stockGet, stockPost } from './controllers/stock.js';
import getOneGallery from './controllers/gallery.js';
import getOneArt from './controllers/art.js';
import { postTransaction, getTransaction } from './controllers/transaction.js';
import checkStock from './controllers/checkOut/checkStock.js';
import logout from './controllers/logout.js';
import * as signUpController from './controllers/signUpController/signUp.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/status', (req, res) => {
  // Manda como resposta o texto 'Hello World'
  res.send('Server online');
});

app.post('/sign-up', signUpController.singUp);
app.post('/sign-in', signIn);
app.post('/logout', logout);

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

app.get('/gallery/:idGallery', getOneGallery);
app.get('/art/:idArt', getOneArt);
app.post('/transaction', postTransaction);
app.get('/transaction', getTransaction);

app.get('/cart', getCartItems);
app.post('/cart', postCancelItem);

app.get('/checkstock', checkStock);
app.get('/checkout', getCheckOutList);

export default app;
