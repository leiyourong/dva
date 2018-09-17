import React from 'react'
import style from './styles/Notice.less'

const Notice = data => {
  return (
    <div className={style.notice}>
      <div className={style.notice_title}>{data.title}</div>
      <div className={style.notice_content}>{data.content}</div>
      <div className={style.notice_footer}>
        <div className={style.notice_time}>
          {data.createAt}
        </div>
        <div className={style.notice_author}>
          {data.author}
        </div>
      </div>

    </div>
  )
}

// Notice.propTypes = {
//   notice: React.PropTypes.object.isRequired
// }

export default Notice
