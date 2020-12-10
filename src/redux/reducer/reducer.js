const initialValue = {
    chatLog : []
}
export default function reducer( state=initialValue,action ){
    switch(action.type){
        case 'MESSAGES' :
            return {...state, chatLog: [...state.chatLog, action.value]}
        default:
            return state;
    }
}