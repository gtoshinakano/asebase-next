import { getSession } from 'next-auth/react';
import {Member} from '@Classes/Member'

const get = async (req, res) => {
  const session = await getSession({ req });

  if (!session)
    res.status(401).json({ message: 'I refuse to shake hands with you' });
  else {
    const member = await Member.init(session.user.email)

    if (member.user_info.blocked) {
      res.status(403).json({
        message: 'You are blocked for transgressing our Terms of Use',
        action: 'force-sign-out-user',
      });
    } else {
      res.status(200).json({
        message: 'High Five 🖐',
        data: {
          uid: member.user_info.id,
          auth_id : member.auth_id
        },
      });
    }
  }
};

export default get;
