import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class StreetAddress extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  lineOne!: string;

  @Column({ nullable: true })
  lineTwo?: string;

  @Column()
  city!: string;

  @Column()
  state!: string;

  @Column()
  zip!: string;
}
