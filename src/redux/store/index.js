import reducer from '../reducers'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

export const store = createStore(
	reducer,
	window.__REDUX_DEVTOOLS_EXTENSION__
		? compose(
				//Async middleware
				applyMiddleware(thunk),
				//chrome redux extenion
				window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
			)
		: compose(applyMiddleware(thunk))
)

