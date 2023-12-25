export default function List({ filteredPersons, handleDelete }) {
  return (
    <ul>
      {filteredPersons.map((p) => (
        <li key={p.name} className="list-item">
          {p.name}: {p.number}
          <button className="delete" onClick={() => handleDelete(p.id)}>
            X
          </button>
        </li>
      ))}
    </ul>
  );
}
