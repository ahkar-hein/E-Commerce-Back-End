const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// get route to find all tag which include associated product by using findall methods
router.get('/', async (req, res) => {
  try {
    const productData = await Tag.findAll({
      include: [{model: Product}],
    })
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// get route to find single tag which include associated product by using findbyPK methods
router.get('/:id', async (req, res) => {
  try {
    const productData = await Tag.findByPk(req.params.id, {
      include: [{model: Product}],
    })
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// post route create new tags by using create methods
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body)
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// put routes for update the tag by id using update methods.
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: { id: req.params.id },
    });

    if (!tagData[0]) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }

    res.status(200).json({ message: 'Tag updated successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});
// delete route for tag and associated product tag by id using destroy tag.
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: { id: req.params.id },
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }
// destroy the product tag which associated with tag.
    await ProductTag.destroy({
      where: { tag_id: req.params.id },
    });

    res.status(200).json({ message: 'Tag and associated records deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
