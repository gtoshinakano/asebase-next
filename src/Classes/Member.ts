import { UserEntity } from '@entities/Auth';
import { MemberEntity, NikkeiInfo, AcademicInfo, ProfessionalData, ExchangeEntity } from '@entities/Member';
import { prepareConnection } from '@typeorm/db';
import { Connection, getRepository } from "typeorm";
import _ from 'lodash'

export class Member{
  
  private auth_id : string
  private name : string
  email : string
  db : Connection
  user_info: MemberEntity | undefined
  nikkei_info: NikkeiInfoObj | undefined
  academic_info: AcademicInfo[] | undefined
  professional_info: ProfessionalData[] | undefined
  exchange_info: Exchange[] | undefined
  

  private constructor(email: string, db: Connection, user?: UserEntity, member?: MemberEntity){
    this.auth_id = user?.id || "" // id from users
    this.name = user?.name || "" // provider Name
    this.email = email
    this.db = db
    this.user_info = member
  }

  static async init(email : string) {
    const db = await prepareConnection()
    const user = await db
      .getRepository(UserEntity)
      .findOne({ where: { email: email } });
    const uid = user?.id  
    const user_info = await db
      .getRepository(MemberEntity).findOne({ where: { auth_id: uid }, relations: ["auth_id"] });
    let member : MemberEntity  
    if(!user_info || user_info.id === undefined){ // There is no user_info, so let's create one
      member = new MemberEntity()
      if (user) member.auth_id = user
      const repo = getRepository(MemberEntity)
      const new_member = repo.create(member)
      repo.save(new_member)
    }else{
      member = user_info
    }
    return new Member(email, db, user, member)
  }

  public async fetchNikkeiProfile(){
    if(this.user_info?.is_nikkei){
      const query = await this.db
        .getRepository(NikkeiInfo)
        .find({where: { user_id: this.auth_id }, relations: ['province_code']});

      const result = query.map((i) => ({
        name: i.province_code.name,
        degree: i.degree,
      }))  

      this.nikkei_info = result.length > 0
        ? {
          jp_generation: genByDegreeMaxLenght[_.map(result, (i) => i.degree).reduce((a:string, b:string) =>
            a.length > b.length ? a : b
          ).length],
          jpFamilyMembers: _.map(result, (i) => i.degree),
          jpFamilyOrigins: _.reduce(
            result,
            (acc: any, cur) => {
              acc[cur.degree] = cur.name;
              return acc;
            },
            {}
          ),
        }
        : { jp_generation: 2, jpFamilyMembers: [], jpFamilyOrigins: {} }
    }
  }

  public async fetchAcademicProfile(){
    this.academic_info = await this.db.getRepository(AcademicInfo).find({
      where: { user_id: this.auth_id },
      select: ['institution_name', 'subject', 'year', 'study_area'],
    });
  }

  public async fetchProfessionalProfile(){
    this.professional_info = await this.db.getRepository(ProfessionalData).find({
      where: { user_id: this.auth_id },
      select: ['current_job', 'position', 'company_name', 'start_year', 'end_year'],
    });
  }

  public async fetchExchangeProfile(){
    const exchange = await this.db.getRepository(ExchangeEntity)
      .createQueryBuilder('e')
      .leftJoinAndSelect('e.organization_id','o','e.organization_id = o.id')
      .leftJoinAndSelect('e.province_code','p','e.province_code = p.code')
      .where('e.user_id = :uid', {uid: this.auth_id})
      .getMany()

    this.exchange_info = exchange.map((i) => ({
      year: i.year,
      type: i.type,
      started_month: i.started_month,
      started_year: i.started_year,
      ended_month: i.ended_month,
      ended_year: i.ended_year,
      org_name: i.organization_id.org_name,
      org_exch_ref: i.org_exch_ref,
      org_exch_title: i.org_exch_title,
      exchange_place: i.exchange_place,
      study_area: i.study_area,
      study_title: i.study_title,
      study_url: i.study_url,
      province_name: i.province_code.name,
    }));

  }


  
}

type generationDegrees = {
  [key: number] : number
}

const genByDegreeMaxLenght : generationDegrees = {
  1: 2,
  3: 3,
  5: 4,
  7: 5,
};

type Exchange = {
  year: number,
  type: number,
  started_month: number,
  started_year: number,
  ended_month: number,
  ended_year: number,
  org_name: string,
  org_exch_ref: string,
  org_exch_title: string,
  exchange_place: string,
  study_area: number,
  study_title: string,
  study_url: string,
  province_name: string,
}

type NikkeiInfoObj = { 
  jp_generation: number, 
  jpFamilyMembers: string[], 
  jpFamilyOrigins: {} 
}
