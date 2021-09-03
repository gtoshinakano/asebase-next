import Layout from '@Components/Layouts/NotSignedCommon';

export default function Page() {
  return (
    <Layout>
      <div className="w-full h-screen flex justify-center items-center bg-gray-100">
        <div className="w-full sm:w-10/12 md:w-1/2 lg:w-1/3 xl:w-1/4 p-3">
          <div className="bg-white w-full px-4 py-5 flex flex-row justify-center rounded">
            <span className="bg-teal-400 text-white rounded-full h-16 w-16 p-4 justify-center">
              <i className="ri-mail-send-line text-3xl"></i>
            </span>
            <p className="flex-grow px-2">
              <span className="text-xl font-bold block mb-3">
                Email de login enviado
              </span>
              <span className="font-extralight">
                Clique no link enviado ao endereço de email fornecido para
                acessar o ASEBASE
              </span>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
