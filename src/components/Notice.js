import React from 'react'
import style from './styles/Notice.less'
import moment from 'moment'

const Notice = data => {
  return (
    <div className={style.notice}>
      <div className={style.notice_title}>{data.title}</div>
      <div className={style.notice_content}>{data.content}</div>
      <div className={style.notice_footer}>
        <div className={style.notice_time}>
          {moment(data.createAt).format('YYYY-MM-DD hh:mm:ss')}
        </div>
        <div className={style.notice_author}>
          {data.author}
        </div>
      </div>

    </div>
  )
}

export default Notice
