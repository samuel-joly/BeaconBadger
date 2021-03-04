import {SET_NAME, SIGN_IN, SIGN_OUT, SET_EMAIL, SET_TOKEN, SET_MATRICULE} from './types'

export default function UserReducer(state, action)
{
  switch(action.type) {
    case SET_NAME:
      return ({
        ...state,
        name : action.payload
      })

    case SET_EMAIL:
      return ({
        ...state,
        email : action.payload
      })

    case SET_TOKEN:
      return ({
        ...state,
        token : action.payload,
        isLogged: true
      })

    case SET_MATRICULE:
      return({
        ...state,
        matricule : action.payload
      })

    case SIGN_IN:
      return ({
        ...state,
        isLogged:true,
        email:action.payload.email,
        matricule:action.payload.matricule,
        name:action.payload.name
      })

    case SIGN_OUT:
      return ({
        ...state,
        isLogged:action.payload
      })
      
    default:
      return state
  }
}
