export default (req, res) => {
  if(req.method !== 'GET') res.status(50).json({error: true, message: "Wrong method"})
  res.json({msg: "hello world"})
}