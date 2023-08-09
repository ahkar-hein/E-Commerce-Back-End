const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// get routes for find all categories that include associated product by using findall methods.
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{model: Product}],
    })
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }  
});

// get routes for find single categories with id that include associated product by using findbyPK methods.
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{model: Product}],
    })
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// post route for create new category by using create method.
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body)
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// put route for update category by id using update method.
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: { id: req.params.id },
    });
// if category data doesn't find with id parms, display message.
    if (!categoryData[0]) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }

    res.status(200).json({ message: 'Category updated successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});
// delete route by id using destroy mehtods
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {  id: req.params.id},
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No Category found with that id!' });
      return;
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
