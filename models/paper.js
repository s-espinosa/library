const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);


const all = () => database('papers')
  .select()

const create = (paper) => database('papers')
  .insert(paper)
  .returning("*")

module.exports = {
  all,
  create,
}
