const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

const all = () => database('footnotes')
  .select()

const create = (footnote) => database('footnotes')
  .insert(footnote)
  .returning('*')

module.exports = {
  all,
  create,
}
