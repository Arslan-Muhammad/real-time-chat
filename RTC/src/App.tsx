function App() {
  return (
    <>
      <div className="grid grid-cols-3 min-h-screen">
        <div className="m-3 rounded border-dashed border-2 border-indigo-300 grid">
          <div className="rounded border-dotted border-2 border-indigo-300 mx-auto mt-2 h-fit px-4 font-semibold text-2xl">
            Chat
          </div>
        </div>
        <div className="m-3 rounded border-dashed border-2 border-indigo-300">
          <div className="rounded border-dotted border-2 border-indigo-300 mx-auto mt-2 h-fit px-4 font-semibold text-2xl">
            Upvotes
          </div>
        </div>
        <div className="m-3 rounded border-dashed border-2 border-indigo-300"></div>
      </div>
    </>
  );
}

export default App;
