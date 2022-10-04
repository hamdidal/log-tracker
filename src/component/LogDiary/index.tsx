import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { Button, TimePicker } from 'antd'
import { FC } from 'react'

interface LogsProps {
  setDescription: (value: any) => void
  difference: string
  handleTimeChange: (value: any) => void
  description: string
  toCancel: () => void
}

const LogDiary: FC<LogsProps> = ({ setDescription, difference, handleTimeChange, toCancel, description }) => {
  return (
    <div>
      <div className="description-diary">
        <h3 className="title-form">Description</h3>
        <textarea
          className="description-input"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          maxLength={500}
        />
      </div>
      <div className="description-diary">
        <h3 className="title-form">Start Time</h3>
        <TimePicker.RangePicker className="time-diary" onChange={handleTimeChange} />
        {difference && <h3>Difference: {difference}</h3>}
      </div>
      <div className="buttons">
        <Button className="description-button" disabled={description.length < 1} htmlType="submit">
          <CheckOutlined />
        </Button>
        <Button className="cancel-button" type="primary" onClick={toCancel}>
          <CloseOutlined />
        </Button>
      </div>
    </div>
  )
}

export default LogDiary
