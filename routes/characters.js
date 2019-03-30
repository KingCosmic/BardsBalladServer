const router = require('express').Router();
const nanoid = require('nanoid');

const JWT = require('../middleware/jwt');

const Characters = require('../models/character');

router.use(JWT)

router.get('/', (req, res) => {

  Characters.find({
    ownerID: req.user._id
  })
  .limit(20)
  .lean()
  .sort('updatedAt')
  .exec((err, characters) => {
    if (err) return res.status(500).send({ err, message: 'Error occured trying to find your characters' });
    
    res.status(200).send({ characters });
  })
});

router.get('/:characterID', ({ user, params: { characterID } }, res) => {
  
  Characters.find({
    _id: characterID
  })
  .limit(1)
  .lean()
  .exec((err, characters) => {
    if (err) return res.status(500).send({ err, message: 'Error occured trying to find your character' })
    if (characters.length === 0) return res.status(404).send({ message: 'failed to find that character' })
    const character = characters[0]

    // ensure this character belongs to the current user
    if (character.ownerID != user._id) return res.status(403).send({ message: 'that character does not belong to you' })

    res.status(200).send({
      character
    })
  })

});

router.post('/create', (req, res) => {

  const id = req.user._id

  let character = new Characters({
    ownerID: id
  })

  character.save()
  .then(newCharacter => {

    res.status(200).send({
      character: newCharacter
    })

  })
  .catch(error => {

    res.status(503).send({
      error
    })
  })

})

router.post('/:characterID', ({ user, params: { characterID }, body: { data } }, res) => {

  let update = { $set: {} };
  let options = { lean: true, new: true }

  if (data.feats) {
    for (let f = 0; f < data.feats.length; f++) {
      let feat = data.feats[f];

      if (feat.new) {
        if (!update.$push) update.$push = { feats: { $each: [] } }

        delete feat.new
        update.$push.feats.$each.push(feat)
      } else {
        if (!options.arrayFilters) options.arrayFilters = [];

        // have to loop through the properties of the array
        // that we need to modify
        Object.keys(feat).forEach(prop => {
          update.$set[`feats.$[${feat.id}].${prop}`] = feat[prop];
        })
        options.arrayFilters.push({ [`${feat.id}.id`]: feat.id });
      }
    }

    // here we remove feats from the data
    delete data.feats
  }

  update.$set = { ...update.$set, ...data };

  Characters.findByIdAndUpdate(
    characterID,
    update,
    options,
  (err, character) => {
    if (err) console.log(err)
    if (err) return res.status(500).send({ err, message: 'Error occured trying to update character' })

    res.status(200).send({ character })
  })
  
})

module.exports = router;