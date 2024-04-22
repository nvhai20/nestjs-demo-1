import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

@Entity({ name: 'products' })
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP', nullable: true })
  updatedAt: Date;

  constructor(partial: Partial<ProductEntity>) {
    super();
    Object.assign(this, partial);
  }

  @Expose()
  get formattedPrice(): string {
    if (typeof this.price === 'number') {
      return `$${this.price.toFixed(2)}`;
    } else {
      return 'Price is not a valid number';
    }
  }
}
