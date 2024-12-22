export default function List({ list }) {
  return (
    <div className="bg-neutral-100 w-1/4 py-2 rounded-lg">
      <h2 className="underline font-semibold pl-2">{list.name}</h2>
      {list.cards.length > 0 ? (
        <ul className="flex flex-col gap-1">
          {list.cards.map((card) => (
            <li key={card._id}>
              <button className="bg-neutral-300 text-black w-full text-start py-2 hover:bg-slate-400 pl-2">
                {card.name}
              </button>
              {/* <p className="card-description">{card.description}</p> */}
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty-list">
          <button className="bg-neutral-300 text-black w-full text-end py-2 hover:bg-slate-400 pr-2">
            Add Card
          </button>
        </div>
      )}
    </div>
  );
}
