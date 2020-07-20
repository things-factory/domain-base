import { store } from '@things-factory/shell'
import domainBase from './reducers/main'

export default function bootstrap() {
  store.addReducers({
    domainBase
  })
}
