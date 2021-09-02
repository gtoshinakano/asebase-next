import Layout from '@Components/Layouts/NotSigned';

export default function Page() {


  return (
    <Layout>
      <div className="w-full h-screen flex justify-center items-center bg-gray-100">
        <div className="w-full sm:w-10/12 md:w-1/2 lg:w-1/3 p-3">
          <div className="inline-flex items-center bg-white leading-none text-green-600 rounded-full p-2 shadow text-teal text-sm">
            <span className="inline-flex bg-green-600 text-white rounded-full h-6 px-3 justify-center items-center">
              <i class="ri-mail-send-line mr-2"></i>Link Enviado com sucesso</span>
            <span className="inline-flex px-2">
            Abra o seu email para acessar o ASEBASE
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
}