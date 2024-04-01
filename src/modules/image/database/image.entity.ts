// image.entity.ts
import { Product } from 'src/modules/product/database/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  // Mối quan hệ nhiều-một với bảng Product
  @ManyToOne(() => Product, product => product.images)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
