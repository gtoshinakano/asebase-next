import { UserEntity } from '@entities/Auth';
import { MemberEntity } from '@entities/Member';
import { prepareConnection } from '@typeorm/db';
import { Connection, getRepository } from "typeorm";

export class Member{
  private auth_id : string
  private name : string
  email : string
  db : Connection
  user_info: MemberEntity | undefined
  

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
  
}

