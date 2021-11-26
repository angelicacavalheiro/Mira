import express from 'express';
import cors from 'cors';
import getCartItems from './controllers/cartItems/getCartItems.js';
import postCancelItem from './controllers/cartItems/postCancelItem.js';
import getCheckOutList from './controllers/checkOut/getCheckOutList.js';
import { artCategoryGet, artCategoryPost } from './controllers/artCategory.js';
import { stockGet, stockPost } from './controllers/stock.js';
import getOneGallery from './controllers/gallery.js';
import getOneArt from './controllers/art.js';
import { postTransaction, getTransaction } from './controllers/transaction.js';
import checkStock from './controllers/checkOut/checkStock.js';
import logout from './controllers/logout.js';
import * as signUpController from './controllers/signUpController/signUp.js';
import * as signInController from './controllers/signInController/signIn.js';
import * as artistsController from './controllers/artists.js';
import * as galeriesController from './controllers/galeriesController.js';
import * as artsController from './controllers/artsController.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/status', (req, res) => {
  // Manda como resposta o texto 'Hello World'
  res.send('Server online');
});

app.post('/sign-up', signUpController.singUp);
app.post('/sign-in', signInController.signIn);
app.post('/logout', logout);

app.post('/artists', artistsController.artistsPost);
app.get('/artists', artistsController.artistsGet);

app.get('/galeries', galeriesController.galleryGet);
app.post('/galeries', galeriesController.galleryPost);

app.get('/arts', artsController.artsGet);
app.post('/arts', artsController.artsPost);

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
