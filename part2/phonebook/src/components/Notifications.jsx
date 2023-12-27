
export default function Notifications(props) {
    const {type, message} = props.message
    if (message === null) {
        return
    }
  return (
    <div className={type === "success" ? "message" : "error"}>{message}</div>
  )
}
