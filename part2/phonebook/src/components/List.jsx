export default function List({filteredPersons}) {
  return (
    <ul>
      {filteredPersons.map((p) => (
        <li key={p.name}>
          {p.name}: {p.number}
        </li>
      ))}
    </ul>
  );
}
