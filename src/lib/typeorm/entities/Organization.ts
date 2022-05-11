import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'organizations' })
export class OrganizationEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'varchar', length: 150, })
  org_name!: string;

  @Column({ type: 'point', nullable: true })
  org_latlng!: string | null;

  @Column({ type: 'varchar', nullable: true })
  org_url!: string;

  @Column({ type: 'boolean', nullable: false, default: false })
  is_verified!: boolean;

}