import Layout from '../components/layout';
import useTranslation from 'next-translate/useTranslation';

export default function Page() {
  const { t } = useTranslation('common');
  const example = t('variable-example', { count: 42 });
  return (
    <Layout>
      <h1>NextAuth.js Example</h1>
      <p className="text-sky-500">
        This is an example site to demonstrate how to use{' '}
        <a href={`https://next-auth.js.org`}>NextAuth.js</a> for authentication.
      </p>
      <p>{example}</p>
    </Layout>
  );
}
