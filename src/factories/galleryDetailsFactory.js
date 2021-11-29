import createStock from './stockFactory.js';

export default async function galleryIdFactory() {
  const stock = await createStock();
  return stock.galery_id;
}
