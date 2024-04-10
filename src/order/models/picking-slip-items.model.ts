import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PickingSlips } from './picking-slips.model';

@Entity('picking_slip_items')
export class PickingSlipItems {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: string;

  @PrimaryColumn('bigint', { precision: 20 })
  picking_slip_id: string;

  @PrimaryColumn('bigint', { precision: 20 })
  item_id: string;

  @PrimaryColumn('bigint', { precision: 20 })
  stock_id: string

  @PrimaryColumn('bigint', { precision: 20 })
  order_fulfillment_product_id: string;

  @Column({ precision: 11, })
  quantity: number;

  @Column({ precision: 11, nullable: true  })
  refunded_quantity: number;

  @Column({ type: 'bigint', precision: 20, nullable: true  })
  location_id: string;

  @Column({ type: 'varchar', length: 30, nullable: true  })
  location_code: string;

  @Column({ type: 'boolean', nullable: true  })
  is_pre_order: boolean;

  @Column({ type: 'boolean', nullable: true  })
  is_sales_only: boolean;

  @Column({ type: 'timestamp', nullable: true  })
  pre_order_shipping_at: Date;

  @Column({ type: 'timestamp', nullable: true  })
  pre_order_deadline_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => PickingSlips, (slip) => slip.picking_slip_items)
  @JoinColumn({ name: 'picking_slip_id', referencedColumnName: 'id', foreignKeyConstraintName: 'FK_picking_slips_id' })
  picking_slip: PickingSlips;
}
