import notice from './notice'
import lottery from './lottery'

export default function (app) {
  app.model(notice)
  app.model(lottery)
}
