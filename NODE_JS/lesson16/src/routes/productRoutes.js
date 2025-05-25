import express from 'express'
import { addProductItem } from '../controllers/productController'

const router = express.Router()

router.post('/', addProductItem)
