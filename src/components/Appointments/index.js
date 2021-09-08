import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    appointmentsList: [],
    isFilteredActive: false,
  }

  onTitleChange = event => {
    this.setState({title: event.target.value})
  }

  onDateChange = event => {
    this.setState({date: event.target.value})
  }

  onSubmitAppointment = event => {
    const {title, date} = this.state
    event.preventDefault()

    const formatedDate = date ? format(new Date(date), 'dd MMMM yyyy EEEE') : ''

    const newAppointment = {
      id: v4(),
      title,
      date: formatedDate,
      isImportant: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  isToggle = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, isImportant: !eachItem.isImportant}
        }
        return eachItem
      }),
    }))
  }

  starredAppointments = () => {
    const {isFilteredActive} = this.state
    this.setState({
      isFilteredActive: !isFilteredActive,
    })
  }

  getFilteredAppointmentList = () => {
    const {appointmentsList, isFilteredActive} = this.state

    if (isFilteredActive) {
      return appointmentsList.filter(
        eachAppointment => eachAppointment.isImportant === true,
      )
    }
    return appointmentsList
  }

  render() {
    const {title, date} = this.state
    const filteredAppointmentList = this.getFilteredAppointmentList()

    return (
      <div className="bg-container">
        <div className="appointments-container">
          <div className="large-width">
            <form className="form" onSubmit={this.onSubmitAppointment}>
              <h1 className="heading">Add Appointment</h1>
              <label className="label" htmlFor="input">
                TITLE
              </label>
              <br />
              <input
                id="input"
                type="text"
                placeholder="Title"
                className="input"
                onChange={this.onTitleChange}
                value={title}
              />
              <label className="label date" htmlFor="date">
                DATE
              </label>
              <input
                id="date"
                type="date"
                placeholder="dd/mm/yy"
                className="input"
                onChange={this.onDateChange}
                value={date}
              />
              <button type="submit" className="button">
                Add
              </button>
            </form>
            <div className="image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png "
                className="image"
                alt="appointments"
              />
            </div>
          </div>
          <hr className="line" />
          <div className="bottom-container">
            <h1 className="bottom-heading">Appointments</h1>
            <button
              className="star-button"
              type="button"
              onClick={this.starredAppointments}
            >
              Starred
            </button>
          </div>

          <ul className="unOrder-list">
            {filteredAppointmentList.map(eachItem => (
              <AppointmentItem
                details={eachItem}
                key={eachItem.id}
                isToggle={this.isToggle}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
