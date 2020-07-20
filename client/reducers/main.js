import { UPDATE_DOMAIN_BASE } from '../actions/main'

const INITIAL_STATE = {
  domainBase: 'ABC'
}

const domainBase = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_DOMAIN_BASE:
      return { ...state }

    default:
      return state
  }
}

export default domainBase
