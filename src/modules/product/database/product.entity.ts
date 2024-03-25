// src/products/product.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from 'typeorm';
import { Category } from '../../category/database/category.entity';
import { ProductSize } from '../../product-size/database/product-size.entity';
import { OrderDetail } from '../../order-detail/database/order-detail.entity';
import { Image } from 'src/modules/image/database/image.entity';

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

  // Mối quan hệ một-nhiều với bảng Image
  @OneToMany(() => Image, image => image.product)
  @JoinColumn()
  images: Image[];


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
