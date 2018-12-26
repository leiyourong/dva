import style from './index.less'

export default () => {
  return <div className={style.lottery}>
    {
      [1,2,3,4,5,6,7,8,9].map(num => <div key={num} className={style.card}>
        <div className={`${style.front} ${style.cardItem}`}></div>
        <div className={`${style.back} ${style.cardItem}`}>奖品{num}</div>
      </div>)
    }
  </div>
}
