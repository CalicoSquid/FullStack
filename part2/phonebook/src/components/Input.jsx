
export default function Input({title, name, value, handleChange}) {
  return (
    <div>
          <input
            placeholder={title}
            name={name}
            value={value}
            onChange={(e) => handleChange(e)}
          />
        </div>
  )
}
