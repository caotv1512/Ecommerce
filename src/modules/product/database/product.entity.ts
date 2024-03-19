// src/products/product.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Category } from '../../category/database/category.entity';
import { ProductSize } from '../../product-size/database/product-size.entity';
import { OrderDetail } from '../../order-detail/database/order-detail.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ name: 'image_url', length: 255, nullable: true })
  imageUrl: string;

  @OneToMany(() => OrderDetail, orderDetail => orderDetail.product) // Đây là mối quan hệ đúng
  orderDetails: OrderDetail[]; // Đảm bảo bạn đã import OrderDetail từ '../orders/order-detail.entity'


  @ManyToOne(() => Category, category => category.products)
  category: Category;

  @OneToMany(() => ProductSize, productSize => productSize.product)
  sizes: ProductSize[];


  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
