import {
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from './Auth';
import { ProvinceEntity } from './Province';
import { OrganizationEntity } from './Organization';

export enum GenderTypes {
  m = 'm',
  f = 'f',
  u = '',
}

@Entity({ name: 'users_info' })
export class MemberEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @OneToOne(() => UserEntity)
  @JoinColumn({
    name: 'auth_id',
    referencedColumnName: 'id',
  })
  auth_id!: UserEntity;

  @Column({ type: 'varchar', nullable: true })
  full_name!: string | null;

  @Column({ type: 'enum', enum: GenderTypes, nullable: true })
  gender!: string | null;

  @Column({ type: 'datetime', nullable: true })
  birth_date!: Date | null;

  @Column({ type: 'varchar', nullable: true, default: 'BRA' })
  birth_country!: string | null;

  @Column({ type: 'varchar', nullable: true })
  birth_state!: string | null;

  @Column({ type: 'varchar', nullable: true })
  birth_city!: string | null;

  @Column({ type: 'tinyint', default: 0 })
  is_nikkei!: number;

  @Column({ type: 'tinyint', nullable: true })
  jp_generation!: number;

  @Column({ type: 'point', nullable: true })
  map_latlng!: string | null;

  @Column({ type: 'tinyint', default: 0 })
  is_admin!: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @Column({ type: 'varchar', nullable: true, unique: true })
  cpf!: string | null;

  @Column({ type: 'tinyint', default: 0 })
  blocked!: number;
  
  @Column({ type: 'tinyint', default: 0 })
  admin!: number;

  @OneToMany(() => NikkeiInfo, (nikkeiInfo) => nikkeiInfo.user_id)
  nikkei_info!: NikkeiInfo[];
}

@Entity({ name: 'japanese_origins' })
export class NikkeiInfo {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @ManyToOne(() => MemberEntity)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'auth_id',
  })
  user_id!: MemberEntity;

  @ManyToOne(() => ProvinceEntity)
  @JoinColumn({
    name: 'province_code',
    referencedColumnName: 'code',
  })
  province_code!: ProvinceEntity;

  @Column({ type: 'varchar' })
  degree!: string;
}

@Entity({ name: 'academic_info' })
export class AcademicInfo {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'varchar' })
  institution_name!: string;

  @ManyToOne(() => MemberEntity)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'auth_id',
  })
  user_id!: MemberEntity;

  @Column({ type: 'varchar', length: 150 })
  subject!: string;

  @Column({ type: 'int', default: 2000 })
  year!: number;

  @Column({ type: 'tinyint' })
  study_area!: number;
}

@Entity({ name: 'professional_data' })
export class ProfessionalData {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'int', nullable: false, width: 4 })
  start_year!: number;

  @Column({ type: 'int', nullable: false, width: 4  })
  end_year!: number;

  @Column({ type: 'varchar', length: 80, nullable: false })
  position!: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  company_name!: string;

  @Column({ type: 'boolean', nullable: false, default: false })
  current_job!: boolean;

  @ManyToOne(() => MemberEntity)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'auth_id',
  })
  user_id!: MemberEntity;
}

@Entity({ name: 'exchanges' })
export class ExchangeEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'int', nullable: false, width: 4 })
  year!: number;

  @Column({ type: 'tinyint', nullable: false  })
  type!: number;

  @Column({ type: 'int', width: 2, nullable: false })
  started_month!: number;

  @Column({ type: 'int', width: 4, nullable: false })
  started_year!: number;

  @Column({ type: 'int', width: 2, nullable: false })
  ended_month!: number;

  @Column({ type: 'int', width: 4, nullable: false })
  ended_year!: number;

  @Column({ type: 'varchar', length: 150, nullable: false })
  exchange_place!: string;

  @Column({ type: 'tinyint', nullable: false  })
  study_area!: number;

  @Column({ type: 'varchar', length: 250, nullable: false })
  study_title!: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  study_url!: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  exchange_url!: string;

  @Column({ type: 'varchar', length: 10, nullable: true})
  org_exch_ref!: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  org_exch_title!: string;

  @ManyToOne(() => OrganizationEntity)
  @JoinColumn({
    name: 'organization_id',
    referencedColumnName: 'id',
  })
  organization_id!: OrganizationEntity;

  @ManyToOne(() => ProvinceEntity)
  @JoinColumn({
    name: 'province_code',
    referencedColumnName: 'code',
  })
  province_code!: ProvinceEntity;

  @ManyToOne(() => MemberEntity)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'auth_id',
  })
  user_id!: MemberEntity;
}

