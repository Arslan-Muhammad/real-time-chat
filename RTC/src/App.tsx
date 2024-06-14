function App() {
  return (
    <>
      <div className="grid grid-cols-3 min-h-screen">
        <div className="m-3 rounded border-dashed border-2 border-indigo-300 grid">
          <div className="rounded border-dotted border-2 border-indigo-300 mx-auto mt-2 h-fit px-4 font-semibold text-2xl">
            Chat
          </div>
          <div className="absolute bottom-3 text-white flex rounded-lg border border-solid border-indigo-300 px-auto ml-3 mb-3">
            <input
              type="search"
              className="relative m-0 block w-[200px] md:w-[400px] min-w-0 flex-auto  bg-transparent bg-clip-padding px-2 text-base font-normal text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
              placeholder="Send your message!"
              // onChange={(e) => setSearch(e.target.value)}
              // value={search}
            />
            <button
              className="z-[2] flex items-center rounded-r px-1 py-1 text-xs font-medium uppercase leading-tight transition duration-150 ease-in-out hover:bg-primary-700 hover:bg-indigo-300 focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg "
              type="submit"
              id="button-addon1"
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              <svg
                width="50px"
                height="50px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z"
                  stroke="#000000"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="m-3 rounded border-dashed border-2 border-indigo-300 grid">
          <div className="rounded border-dotted border-2 border-indigo-300 mx-auto mt-2 h-fit px-4 font-semibold text-2xl">
            Upvoted
          </div>
        </div>
        <div className="m-3 rounded border-dashed border-2 border-indigo-300 grid">
          <div className="rounded border-dotted border-2 border-indigo-300 mx-auto mt-2 h-fit px-4 font-semibold text-2xl">
            Most Upvoted
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
