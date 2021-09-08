import './index.css'

const AppointmentItem = props => {
  const {details, isToggle} = props
  const {id, title, date, isImportant} = details

  const onClickStar = () => {
    isToggle(id)
  }

  const imageUrl = isImportant
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="list-item">
      <div>
        <p className="title">{title}</p>
        <p className="date">Date: {date}</p>
      </div>
      <div>
        <button
          type="button"
          onClick={onClickStar}
          className="list-button"
          testid="star"
        >
          <img src={imageUrl} alt="star" />
        </button>
      </div>
    </li>
  )
}

export default AppointmentItem
