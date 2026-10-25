import express from 'express';
import { products } from '../data/productsData.js';

const router = express.Router();

/**
 * 1. GET /api/products
 * Read all products (with optional ?category= and ?search= query filters)
 */
router.get('/', (req, res) => {
  const { category, search } = req.query;
  let result = [...products];

  if (category) {
    result = result.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (search) {
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  res.status(200).json({
    success: true,
    count: result.length,
    data: result
  });
});

/**
 * 2. GET /api/products/:id
 * Read a single product by numeric ID
 */
router.get('/:id', (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: `Product with ID ${productId} not found.`
    });
  }

  res.status(200).json({
    success: true,
    data: product
  });
});

/**
 * 3. POST /api/products
 * Create a new product with input validation
 */
router.post('/', (req, res) => {
  const { name, category, price, stock, description } = req.body;

  // Validation: Check required fields
  if (!name || name.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'Validation Error: Product "name" is required.'
    });
  }

  if (price === undefined || isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation Error: Product "price" must be a positive number.'
    });
  }

  const newId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;

  const newProduct = {
    id: newId,
    name: name.trim(),
    category: category ? category.trim() : 'General',
    price: parseFloat(price),
    stock: stock !== undefined ? parseInt(stock, 10) : 0,
    description: description ? description.trim() : ''
  };

  products.push(newProduct);

  res.status(201).json({
    success: true,
    message: 'Product created successfully.',
    data: newProduct
  });
});

/**
 * 4. PUT /api/products/:id
 * Update an existing product by ID
 */
router.put('/:id', (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const index = products.findIndex((p) => p.id === productId);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Product with ID ${productId} not found.`
    });
  }

  const { name, category, price, stock, description } = req.body;

  // Validation if updated fields provided
  if (price !== undefined && (isNaN(parseFloat(price)) || parseFloat(price) <= 0)) {
    return res.status(400).json({
      success: false,
      message: 'Validation Error: "price" must be a positive number.'
    });
  }

  const updatedProduct = {
    ...products[index],
    name: name !== undefined ? name.trim() : products[index].name,
    category: category !== undefined ? category.trim() : products[index].category,
    price: price !== undefined ? parseFloat(price) : products[index].price,
    stock: stock !== undefined ? parseInt(stock, 10) : products[index].stock,
    description: description !== undefined ? description.trim() : products[index].description
  };

  products[index] = updatedProduct;

  res.status(200).json({
    success: true,
    message: `Product with ID ${productId} updated successfully.`,
    data: updatedProduct
  });
});

/**
 * 5. DELETE /api/products/:id
 * Delete a product by ID
 */
router.delete('/:id', (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const index = products.findIndex((p) => p.id === productId);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Product with ID ${productId} not found.`
    });
  }

  const deletedProduct = products.splice(index, 1)[0];

  res.status(200).json({
    success: true,
    message: `Product "${deletedProduct.name}" (ID ${productId}) was deleted successfully.`,
    data: deletedProduct
  });
});

export default router;
