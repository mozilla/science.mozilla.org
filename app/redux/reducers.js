export const userReducer = (state=null, action) => {
	if(action.type === `CHANGE_USER`) {
		return action.userData
	}
	return state
} 
