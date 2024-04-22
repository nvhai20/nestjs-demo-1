import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: number) {
    const product = await this.productService.getProductById(id);
    if (!product) {
      throw new NotFoundException(`Không tìm thấy sản phẩm ${id}`);
    }
    return product;
  }

  @Post()
  async createProduct(
    @Body()
    productData: {
      name: string;
      description: string;
      price: number;
    },
  ) {
    return this.productService.createProduct(productData);
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: number,
    @Body()
    productData: {
      name: string;
      description: string;
      price: number;
    },
  ) {
    const updatedProduct = await this.productService.updateProduct(
      id,
      productData,
    );
    if (!updatedProduct) {
      throw new NotFoundException(`Không tìm thấy sản phẩm ${id} `);
    }
    return updatedProduct;
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: number) {
    const deletedProduct = await this.productService.deleteProduct(id);
    if (!deletedProduct) {
      throw new NotFoundException(`Không tìm thấy sản phẩm ${id}`);
    }
    return deletedProduct;
  }
}
