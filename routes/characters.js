const router = require('express').Router();
const nanoid = require('nanoid');

const JWT = require('../middleware/jwt');

const Characters = require('../models/character');

/*
const arrayUpdates = (update, data, array) => {
  for (let f = 0; f < data[array].length; f++) {
    let item = data[array][f];

    if (item.remove) {
      if (!update.$pull) update.$pull = {}
      if (!update.$pull[array]) update.$pull[array] = { 'id': { '$in': [] }}

      update.$pull[array].id.$in.push(item.id)
    } else if (item.new) {
      if (!update.$push) update.$push = { [array]: { $each: [] } }

      delete item.new
      update.$push[array].$each.push(item)
    } else {
      if (!options.$set) options.$set = {}
      if (!options.arrayFilters) options.arrayFilters = [];

      // have to loop through the properties of the array
      // that we need to modify
      Object.keys(item).forEach(prop => {
        update.$set[`${array}.$[${item.id}].${prop}`] = item[prop];
      })
      options.arrayFilters.push({ [`${item.id}.id`]: item.id });
    }
  }

  // here we remove feats from the data
  delete data[array]
}*/


const arrayUpdates = (update, data, array) => {
  for (let i = 0; i < data[array].length; i++) {
    if (data[array][i].new) delete data[array][i].new
  }
}

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

  let update = {};
  let options = { lean: true, new: true }

  if (data.feats) arrayUpdates(update, data, 'feats')

  if (data.items) arrayUpdates(update, data, 'items')

  update.$set = { ...update.$set || {}, ...data };

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