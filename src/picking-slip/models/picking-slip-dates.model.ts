import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { PickingSlips } from "./picking-slips.model";

@Entity("picking_slip_dates")
export class PickingSlipDates {
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  id: string;

  @PrimaryColumn("bigint", { precision: 20, unique: true })
  picking_slip_id: string;

  @Column("varchar", { length: 20, nullable: true })
  printed_username: string;

  @Column("varchar", { length: 20, nullable: true })
  inspected_username: string;

  @Column("varchar", { length: 20, nullable: true })
  packed_username: string;

  @Column("varchar", { length: 20, nullable: true })
  shipped_username: string;

  @Column("varchar", { length: 20, nullable: true })
  held_username: string;

  @Column("varchar", { length: 20, nullable: true })
  cancelled_username: string;

  @Column("varchar", { length: 20, nullable: true })
  refunded_username: string;

  @Column("varchar", { length: 20, nullable: true })
  confirmed_username: string;

  @Column({ type: "timestamp", nullable: true })
  printed_at: Date;

  @Column({ type: "timestamp", nullable: true })
  inspected_at: Date;

  @Column({ type: "timestamp", nullable: true })
  packed_at: Date;

  @Column({ type: "timestamp", nullable: true })
  shipped_at: Date;

  @Column({ type: "timestamp", nullable: true })
  delivered_at: Date;

  @Column({ type: "timestamp", nullable: true })
  returned_at: Date;

  @Column({ type: "timestamp", nullable: true })
  cancelled_at: Date;

  @Column({ type: "timestamp", nullable: true })
  refunded_at: Date;

  @Column({ type: "timestamp", nullable: true })
  held_at: Date;

  @Column({ type: "timestamp", nullable: true })
  confirmed_at: Date;

  @Column("varchar", { length: 20, nullable: true })
  held_reason: string;

  @OneToOne(() => PickingSlips)
  @JoinColumn({ name: "picking_slip_id", referencedColumnName: "id", foreignKeyConstraintName: "FK_picking_slip_id" })
  picking_slip: PickingSlips;
}
