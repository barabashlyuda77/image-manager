const initialState = []

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_IMAGE_LIST':
        return action.payload.imageList
      default:
        return state
    }
  }
  