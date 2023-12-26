export default function Form({ handleChange }) {
  return (
    <div className="form">
      <form style={{ display: "flex", flexDirection: "column" }}>
        <input
          className="input"
          type="text"
          placeholder="Enter Country"
          onChange={(e) => handleChange(e)}
        ></input>
      </form>
    </div>
  );
}
