function TodoHeader() {
  const customFont = {
    fontFamily: "'Rubik', sans-serif",
  };

  return (
    <header className="bg-blue-500 text-white p-4 flex flex-col md:flex-row justify-between">
      <div className="text-lg font-bold uppercase">
        Todoer
        <span
          style={customFont}
          className="text-sm font-normal block md:inline mt-1 md:mt-0 md:ml-2 uppercase"
        >
          Making little accomplishments count
        </span>
      </div>
      <div className="flex items-center">
        <div className="mr-4"></div>
      </div>
    </header>
  );
}

export default TodoHeader;
