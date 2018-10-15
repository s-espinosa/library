const Footnote = require('../models/footnote')

const index = (request, response) => {
  Footnote.all()
    .then((footnotes) => {
      response.status(200).json(footnotes);
    })
    .catch((error) => {
      response.status(500).json({error});
    })
}

const create = (request, response) => {
  const footnote = request.body;
  footnote["paper_id"] = request.params.id

  for (let requiredParameter of ['note']) {
    if (!footnote[requiredParameter]) {
      return response
        .status(422)
        .send({error: `Expected format: { note: <String> }. You're missing a "${requiredParameter}" property.`});
    }
  }

  Footnote.create(footnote)
    .then(footnote => {
      response.status(201).json(footnote)
    })
    .catch(error => {
      response.status(500).json({error});
    });
}

module.exports = {
  index,
  create,
}
