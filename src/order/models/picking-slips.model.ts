import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PickingSlipItems } from './picking-slip-items.model';

@Entity('picking_slips')
export class PickingSlips {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: string;

  @PrimaryColumn('bigint', { precision: 20 })
  order_id: string;

  @Column({ type: 'bigint', precision: 20, nullable: true })
  order_fulfillment_order_id: string;

  @Column('bool', { nullable: true, default: () => false })
  is_contained_single_product: boolean;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => PickingSlipItems, (slip_items) => slip_items.picking_slip)
  @JoinColumn({ name: 'id', referencedColumnName: 'picking_slip_id', foreignKeyConstraintName: 'FK_picking_slip_items_picking_slip_id' })
  picking_slip_items: PickingSlipItems[];
}
