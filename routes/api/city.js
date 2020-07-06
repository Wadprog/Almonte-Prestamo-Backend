const express = require("express");
const router = express.Router();
const City = require("../../models/city");
const Client = require("../../models/client");
router.get("/", async (req, res) => {
  try {
    let cities = await City.find();
    return res.json(cities);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.get("/stats/client", async (req, res) => {
  try {
    let usedCities = await Client.aggregate([
      { $match: {} },
      { $group: { _id: "$ciudad", total: { $sum: 1 } } },
    ]);

    console.log(usedCities);

    let allCities = await City.find();

    let Blend = [];

    allCities.forEach(city => {
      const [newCity] = usedCities.filter(
        usedCity => city.name == usedCity._id
      );

      Blend.push({
        id: city._id,
        name: city.name,
        total: newCity ? newCity.total : 0,
      });
    });
    return res.json({ cities: Blend });
  } catch (error) {
    return res.status(500).json({ error, msg: "error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let city = await City.findById(req.params.id);
    if (!city)
      return res.status(404).json({ msg: "no city found with provided id" });
    return res.jason({ city });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.post("/", async (req, res) => {
  try {
    let city = await City.findOne({ name: req.body.name.toLowerCase() });
    if (city) return res.status(400).json({ msg: "Esta ciudad ya existe" });
    city = new City({
      name: req.body.name.toLowerCase(),
    });
    await city.save();
    return res.json({ city });
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await City.findByIdAndDelete(req.params.id);
    return res.json({ id: req.params.id });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
});
router.put("/", async (req, res) => {
  try {
    let city = City.findOne({ name: req.body.name.toLower() });
    if (!city) return res.status(400).json({ msg: "Esta ciudad no  existe" });
    city = new City({
      name: req.body.name.toLower(),
    });
    await city.save();
    return res.json({ city });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

module.exports = router;
