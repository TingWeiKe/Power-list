const SUCCESS = 'SUCCESS'

let initState = {
    msg: ''
}

export function box(state = initState, action) {
    switch (action.type) {
        case SUCCESS:
            return state = { ...state, msg: "success" }
        default:
            return state
    }


}