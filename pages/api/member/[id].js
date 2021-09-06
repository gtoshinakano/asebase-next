import {query} from '@lib/db'

export default async (req, res) => {

  const { id } = req.query
  
  try {
    
    if (!id) {
      return res.status(400).json({ message: '`id` required' })
    }
    if (typeof parseInt(id.toString()) !== 'number') {
      return res.status(400).json({ message: '`id` must be a number' })
    }
    const results = await query(
      `
      SELECT *
      FROM users
      WHERE id = ?
    `,
      id
    )
    console.log(query)
    return res.json(results[0])
  } catch (e) {
    res.json({ message: e.message })
  }

}