export default function List({ list }) {
  const handleDeleteList = () => {
    console.log("list delete")
  }

  const handleAddList = () => {
    console.log("list add")
  }

  const handleDeleteCard = () => {
    console.log("card delete")
  }

  const handleAddCard = () => {
    console.log("card add ")
  }

  return (
    <div className="bg-neutral-100 w-1/4 pb-2 rounded-lg">
      <div className="flex justify-between items-center py-2 px-1">
        <h2 className="underline font-semibold pl-2">{list.name}</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 hover:text-red-500 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </div>

      {list.cards.length > 0 ? (
        <ul className="flex flex-col gap-1">
          {list.cards.map((card) => (
            <li key={card._id}>
              <button className="bg-neutral-300 text-black w-full text-start py-2 hover:bg-slate-400 pl-2">
                {card.name}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty-list">
          <button className="bg-neutral-300 text-black w-full  py-2 hover:bg-slate-400 pr-2 flex justify-end items-center gap-2">
            Add Card{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}