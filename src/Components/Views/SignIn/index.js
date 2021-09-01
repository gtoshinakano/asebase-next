import Panel from '@Styled/Panel';

const Screen = ({ csrfToken, providers }) => {
  return (
    <div className="w-full sm:w-10/12 md:w-1/2 lg:w-1/3 xl:w-1/4 p-3">
      <Panel
        header={
          <h1 className="text-lg font-semibold uppercase">Asebase Login</h1>
        }
        shaded
      >
        <form method="post" action="/api/auth/signin/email">
          <label
            htmlFor="email"
            className="font-semibold text-sm text-gray-600 pb-1 block"
          >
            E-mail
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
          />
          <input type="hidden" name="csrfToken" defaultValue={csrfToken} />
          <button
            type="submit"
            className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
          >
            <span className="inline-block mr-2">Login</span>
            <i className="ri-arrow-right-s-fill"></i>
          </button>
        </form>
        <hr className="mt-3 mb-4" />
        <div className="flex flex-col">
          <button
            type="button"
            className="transition duration-200 bg-white hover:bg-blue-600 hover:text-white focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-black border w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
          >
            <i className="ri-google-line"></i>
            <span className="inline-block ml-2">Sign in with Google</span>
          </button>
        </div>
      </Panel>
    </div>
  );
};

export default Screen;
