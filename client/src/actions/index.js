import axios from 'axios'

export function getBooks(
    limit=10, 
    start=0,
    order = 'asc',
    list = ''
    ){
        const request = axios.get(`/api/books?limit=${limit}&skip=${start}$order=${order}`)
        .then( response => {
            if(list){
                return [...list,...response.data]
            }else{
                return response.data
            }
        })
    


        return {
            type:'GET_BOOKS',
            payload:request
        }
    
}



export function getBookWithReviewer(id){
    const request = axios.get(`/api/getBook?id=${id}`)
    
    return (dispatch)=>{
        request.then( ({data}) => {
            let book = data;
            
            axios.get(`/api/getReviewer?id=${book.ownerId}`)
            .then( ({data})=> {
                
                let response = {
                    book,
                    reviewer:data
                }
                dispatch({
                    type:"GET_BOOK_W_REVIEWER",
                    payload:response
                })
            })
            
           


        })
    }
}
export function clearBookWithReviewer(){
    return {
        type:"CLEAR_BOOK_W_REVIEWER",
        payload:{
            book:{},
            reviewer:{}
        }
    }
}
export function addReview(review) {
    
    const request = axios.post('/api/book',review).then(response => response.data)
    return {
        type:"ADD_REVIEW",
        payload:request
    }
}
export function clearNewBook() {
    return {
        type:'CLEAR_NEWBOOK',
        payload:{}
    }
}

export function getBook(id) {
    const request = axios.get(`/api/getBook?id=${id}`).then(response => response.data);
    return {
        type:'GET_BOOK',
        payload:request
    }
}
export function updateBook(newbook){
    const request = axios.post(`/api/book_update`,newbook).then(response => response.data);

    return {
        type:'UPDATE_BOOK',
        payload:request
    }
}
export function deleteBook(id){
    const request = axios.delete(`/api/delete_book?id=${id}`).then(response => response.data)

    return {
        type:"DELETE_BOOK",
        payload:request
    }
}
export function clearBook(){
    return {
        type:"CLEAR_BOOK",
        payload:{}
    }
}
//User
export function loginUser({email,password}){
    const request = axios.post('/api/login',{email,password}).then(response => response.data)
    return {
        type:'USER_LOGIN',
        payload:request
    }
}


export function getUserPosts(userId) {
    const request = axios.get(`/api/user_reviews?user=${userId}`).then(response => response.data)
    return {
        type:'GET_USER_POSTS',
        payload:request
    }
}
export function auth(){
    const request = axios.get('/api/auth').then(response => response.data)

    return {
        type:'USER_AUTH',
        payload:request
    }
}

export function getUsers(){
    const request = axios.get('/api/users').then(response => response.data);

    return {
        type:'GET_USERS',
        payload:request
    }
}

export function registerUser(newuser,userList){
    
    const request = axios.post(`/api/register`,newuser)

    return (dispatch) => {
        request.then(({data}) => {
            let users = data.success ? [...userList,data.user] :userList;
            let response = {
                success:data.success,
                users
            }

            dispatch({
                type:'USER_REGISTER',
                payload:response
            })
        })
    }
}