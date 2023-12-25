import Input from "./Input"

export default function Form({name, number, handleChange, handleSubmit}) {
  return (
    <form className="form">
        <Input
          title="Name"
          name="name"
          value={name}
          handleChange={handleChange}
          className="input"
        />
        <Input
          title="Number"
          name="number"
          value={number}
          handleChange={handleChange}
          className="input"
        />
          <button type="submit" onClick={(e) => handleSubmit(e)}>
            Add
          </button>
      </form>
  )
}
