import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prepareConnection } from '@lib/typeorm/db';


/*  
 * This API endpoint is a hard coded way to sync TypeORM DB changes.
 * It creates all tables in MySQL, defined in src/lib/typeorm/entities 
 * We should run this command once on every deployment that has DB structure 
 * changes.
 * Only admin has access to this API endpoint
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {

  let pass = "senha" //TODO req.body.password

  if (req.method !== 'GET') // TODO will be POST in admin dashboard
    res.status(50).json({ error: true, message: 'Wrong method' });

  const session = await getSession({ req });

  if (!session) {
    return res.status(400).json({ message: 'Session not found' });
  }

  // TODO verify user and admin privileges
  const password = process.env.DB_SYNC_PASS || "test"
  if(pass === password){
    await prepareConnection(true);
    res.json({ msg: 'DB Sync complete' });
  }else 
    res.json({ msg: 'Wrong admin password' });
};
