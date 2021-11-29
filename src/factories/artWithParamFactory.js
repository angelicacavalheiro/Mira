import createStock from './stockFactory.js';

export default async function artIdFacotry() {
  const stock = await createStock();
  return stock.id;
}
