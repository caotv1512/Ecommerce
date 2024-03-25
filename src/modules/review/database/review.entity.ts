// src/reviews/review.entity.ts
import { Rating } from 'src/constant/enum';
import { Product } from 'src/modules/product/database/product.entity';
import { User } from 'src/modules/user/database/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'text' })
  content: string;

  @Column({
    type: 'enum',
    enum: Rating, // Sử dụng enum Rating cho trường rating
  })
  rating: Rating;

  @Column({ name: 'review_date', type: 'date' })
  reviewDate: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
