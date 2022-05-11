import { Entity, PrimaryColumn, Column, OneToMany  } from "typeorm";
import { NikkeiInfo } from "./Member";

@Entity({ name: 'japan_provinces' })
export class ProvinceEntity {
  @PrimaryColumn()
  code!: string;

  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'varchar' })
  japanese_name!: string;

  @Column({ type: 'varchar' })
  region!: string;

  @Column({ type: 'point', nullable: true })
  label_latlng!: string | null;

  @Column({ type: 'point', nullable: true })
  flag_latlng!: string | null;

  @OneToMany(() => NikkeiInfo, (nikkeiInfo) => nikkeiInfo.province_code)
  nikkei_info!: NikkeiInfo[];
}
