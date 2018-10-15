const Paper = require('../models/paper')

const index = (request, response) => {
  Paper.all()
    .then((papers) => {
      response.status(200).json(papers);
    })
    .catch((error) => {
      response.status(500).json({error});
    })
}

const create = (request, response) => {
  const paper = request.body;

  for (let requiredParameter of ['title', 'author']) {
    if (!paper[requiredParameter]) {
      return response
        .status(422)
        .send({error: `Expected format: { title: <String>, author: <String> }. You're missing a "${requiredParameter}" property.`});
    }
  }

  Paper.create(paper)
    .then(paper => {
      response.status(201).json(paper)
    })
    .catch(error => {
      response.status(500).json({error});
    });
}

module.exports = {
  index,
  create,
}
