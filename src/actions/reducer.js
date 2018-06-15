const initialState = {
    list: [
        {
            id: 1,
            title: 'wash car',
            task: 'take car to carwash'
        },
        {
            id: 2,
            title: 'take out the garbage',
            task: 'take bags to bin'
        },
        {
            id: 3,
            title: 'make dinner',
            task: 'cook the food'
        }
    ],
    title: '',
    task: '',
    redirectTo: null
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case 'CHANGE_LIST':
        const listItem = state.list.filter(item => item.id === parseInt(action.id, 10));
        return {
            ...state,
            // 'listItem[0] === true' = 'listItem[0]' = if listItem[0] exists
            title: listItem[0] ? listItem[0].title : '',
            task: listItem[0] ? listItem[0].task : ''
        }

        case 'CAPTURE_INPUT':
            console.log('[NAME]', action.payload.name)
            console.log('[VALUE]', action.payload.value)
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        
        case 'UPDATE':
            const updatedList = state.list.map(item => {
                if(item.id === parseInt(action.id, 10)) {
                    item.title = state.title;
                    item.task = state.task;
                }
                return item;
            });
            return {
                ...state,
                list: updatedList
            }

        case 'DELETE':
            const newList = state.list.filter(item => item.id !== parseInt(action.id, 10));
            return {
                ...state,
                list: newList,
                title: newList[0] ? newList[0].title : '',
                task: newList[0] ? newList[0].task : '',
                // look up template strings
                redirectTo: newList.length > 0 ? `/${newList[0].id}` : '/1'
            }

        case 'ADD':
            let id;
            state.list.length > 0 ? id = state.list[state.list.length - 1].id + 1 : id = 1;
            const newToDo = {id : id, title: state.title, task: state.task}
            return {
                ...state,
                // push manipulates state. concat does not.
                list: state.list.concat(newToDo)
            }

        default:
        return state;
    }
}

export default reducer;