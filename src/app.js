import express from 'express';
import cors from 'cors';
import postCancelItem from './controllers/cartItemsController/postCancelItem.js';
import getCheckOutList from './controllers/checkOut/getCheckOutList.js';
import checkStock from './controllers/checkOut/checkStock.js';
import logout from './controllers/logout.js';
import * as signUpController from './controllers/signUpController/signUp.js';
import * as signInController from './controllers/signInController/signIn.js';
import * as artistsController from './controllers/artistsController.js';
import * as galeriesController from './controllers/galeriesController.js';
import * as artsController from './controllers/artsController.js';
import * as artCategoryController from './controllers/artCategoryController.js';
import * as stockController from './controllers/stockController.js';
import * as transactionController from './controllers/transactionController.js';
import * as cartController from './controllers/cartItemsController/getCartItems.js';
import * as artController from './controllers/artController.js';
import * as galleryController from './controllers/galleryController.js';

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

app.get('/artCategory', artCategoryController.artCategoryGet);
app.post('/artCategory', artCategoryController.artCategoryPost);

app.get('/stock', stockController.stockGet);
app.post('/stock', stockController.stockPost);

app.get('/gallery/:idGallery', galleryController.getOneGallery);
app.get('/art/:idArt', artController.getOneArt);

app.post('/transaction', transactionController.postTransaction);
app.get('/transaction', transactionController.getTransaction);

app.get('/cart', cartController.getCartItems);
app.post('/cart', postCancelItem);

app.get('/checkstock', checkStock);
app.get('/checkout', getCheckOutList);

export default app;
