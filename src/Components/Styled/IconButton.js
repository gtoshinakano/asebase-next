export const IconButton = ({ children, rest }) => {
  const {} = props;

  return (
    <button
      className={`bg-red-600 py-3 px-5 text-white font-semibold rounded-lg hover:shadow-lg transition duration-3000 cursor-pointer`}
      {...rest}
    >
      {children}
    </button>
  );
};
