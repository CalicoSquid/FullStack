
export default function List({ list, displayCountry, showList }) {
  
  return (
    <>
    {showList && <ul className="list-country">
      {list.map((item) => (
        <li className="list-item-country" key={item.name.common}>
          <div className="list-1">
            <img src={item.flags.png} style={{ width: "50px" }} />
            <p>{item.name.common} </p>
          </div>

          <button
            className="show-country"
            onClick={() => displayCountry(item.name.common)}
          >
            View
          </button>
        </li>
      ))}
    </ul>}
    </>
    
  );
}
