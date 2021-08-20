import Layout from '../components/layout'

export default function Page () {
  return (
    <Layout>
      <h1>NextAuth.js Example</h1>
      <p className="text-sky-500">
        This is an example site to demonstrate how to use <a href={`https://next-auth.js.org`}>NextAuth.js</a> for authentication.
      </p>
    </Layout>
  )
}