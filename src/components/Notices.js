import React from 'react'

const Notices = notices => {
  return (
    <div className="notice-list">
      {
        notices.map(notice => {
          return (<div className="notice">{notice.content}</div>)
        })
      }
    </div>
  )
}

Notices.propTypes = {
  notices: React.PropTypes.array.isRequired
}

export default Notices
