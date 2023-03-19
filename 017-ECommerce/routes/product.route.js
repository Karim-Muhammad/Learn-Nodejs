const router = require("express").Router();
const express = require("express");

const ProductController = require('./../Controllers/product.controller');
router.use(express.static("images"));

router.get("/:id", ProductController.getDetailsProduct)

module.exports = router;