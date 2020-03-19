const express = require('express')
const router = express.Router()
const City = require('../../models/city')

router.get('/', async (req, res) => {
  try {
    let cities = await City.find()
    return res.json( cities )
  } catch (error) {
    return res.status(500).json({ error })
  }
})

router.get('/:id', async (req, res) => {
  try {
    let city = await City.findById(req.params.id)
    if (!city)
      return res.status(404).json({ msg: 'no city found with provided id' })
    return res.jason({ city })
  } catch (error) {
    return res.status(500).json({ error })
  }
})

router.post('/', async (req, res) => {
  try {
    let city = await City.findOne({ name: req.body.name.toLowerCase() })
    if (city) return res.status(400).json({ msg: 'Esta ciudad ya existe' })
    city = new City({
      name: req.body.name.toLowerCase()
    })
    await city.save()
    return res.json({ city })
  } catch (error) {
    return res.status(500).json( error )
  }
})

router.put('/', async (req, res) => {
  try {
    let city = City.findOne({ name: req.body.name.toLower() })
    if (!city) return res.status(400).json({ msg: 'Esta ciudad ya existe' })
    city = new City({
      name: req.body.name.toLower()
    })
    await city.save()
    return res.json({ city })
  } catch (error) {
    return res.status(500).json({ error })
  }
})

module.exports = router
