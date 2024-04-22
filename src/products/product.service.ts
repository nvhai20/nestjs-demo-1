import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async getAllProducts(): Promise<ProductEntity[]> {
    return await this.productRepository.find();
  }

  async getProductById(id: number): Promise<ProductEntity | undefined> {
    return await this.productRepository.findOne({
      where: { id },
    });
  }

  async createProduct(productData: {
    name: string;
    description: string;
    price: number;
  }): Promise<ProductEntity> {
    const { name, description, price } = productData;
    const newProduct = this.productRepository.create({
      name,
      description,
      price,
    });
    return await this.productRepository.save(newProduct);
  }

  async updateProduct(
    id: number,
    productData: {
      name: string;
      description: string;
      price: number;
    },
  ): Promise<ProductEntity | undefined> {
    const { name, description, price } = productData;
    const product = await this.productRepository.findOne({
      where: { id },
    });
    if (!product) {
      throw new HttpException(`Không tìm thấy sản phẩm ${id}`, 404);
    }

    product.name = name;
    product.description = description;
    product.price = price;

    return await this.productRepository.save(product);
  }

  async deleteProduct(id: number): Promise<ProductEntity | undefined> {
    const product = await this.productRepository.findOne({
      where: { id },
    });
    if (!product) {
      throw new HttpException(`Không tìm thấy sản phẩm ${id} `, 404);
    }

    await this.productRepository.remove(product);
    return product;
  }
}
