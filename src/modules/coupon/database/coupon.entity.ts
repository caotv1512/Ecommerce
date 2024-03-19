// src/coupons/coupon.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Coupon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'coupon_code', length: 255, unique: true })
  couponCode: string;

  @Column({ name: 'discount_percentage', type: 'decimal', precision: 5, scale: 2 })
  discountPercentage: number;

  @Column({ name: 'expiry_date', type: 'date' })
  expiryDate: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
