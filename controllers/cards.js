const Card = require('../models/answers');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => res.status(400).send({ message: err.message }));
};

module.exports.removeCard = (req, res) => {
  const { id } = req.params;

  Card.findById(id)
    .then((card) => {
      if (card === null) {
        res.status(401).send({ message: 'Havent card, check id pls' });
      }

      if (card.owner._id == req.user._id) {
        Card.findOneAndRemove(id)
          .then((card) => res.status(200).send({ message: 'Success delete' }))
          .catch((err) => res.status(500).send({ message: err.message }));
      } else {
        res.status(403).send({ message: 'No permissions' });
      }
    })

    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createLike = (req, res) => {
  const owner = req.user._id;
  const { id } = req.params;

  Card.findByIdAndUpdate(
    id,
    { $addToSet: { likes: owner } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.removeLike = (req, res) => {
  const owner = req.user._id;
  const { id } = req.params;

  Card.findByIdAndUpdate(
    id,
    { $pull: { likes: owner } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message }));
};
