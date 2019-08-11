import React, { PureComponent } from 'react'
import { connect} from 'react-redux';
import { Link } from 'react-router-dom'
import { getBook,updateBook,clearBook,deleteBook } from '../../actions'

class editBook extends PureComponent {
    state = {
        formdata:{
            _id:this.props.match.params.id,
            name:'',
            author:'',
            review:'',
            pages:'',
            rating:'1',
            price:''
        }
    }
    handleInput = (event,name) => {
        const newFormData = {
            ...this.state.formdata
        }
        newFormData[name] = event.target.value

        this.setState({
            formdata:newFormData
        })
    }
    submitForm = (event) => {
        event.preventDefault();
        this.props.dispatch(updateBook(this.state.formdata))
        
    
    }

    deletePost = (event) => {
        this.props.dispatch(deleteBook(this.props.match.params.id))
    }

    redirectUser = () => {
        setTimeout(()=>{
            this.props.history.push('/user-reviews')
        },1000)
    }
    componentWillMount(){
        this.props.dispatch(getBook(this.props.match.params.id))

    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        let book = nextProps.books.BookNow;
        
        this.setState({
            formdata:{
                _id:book._id,
                name:book.name,
                author:book.review,
                pages:book.pages,
                rating:book.rating,
                price:book.price
            }
        })
    }
    
    componentWillUnmount(){
        this.props.dispatch(clearBook())
    }
    

    render() {
        
        return (
            <div className="rl_container article">
                {
                    this.props.books.updateBook ?  
                    <div className="edit_confirm"> 
                        post updates, <Link to={`/books/${this.props.books.BookNow._id}`}>
                            Click hear to see you post
                        </Link>
                    </div>:null
                    
                }
                {
                    this.props.books.postDeleted ? 
                        <div className="red_tag">
                            Post deleted
                            {this.redirectUser()}
                        </div>
                        :null    
                }
                <form onSubmit={this.submitForm}>
                    <h2> Edit a review </h2> 

                    <div className="form_element">
                        <input 
                        type="text"
                        placeholder="Enter name"
                        value={this.state.formdata.name}
                        onChange={(event) => this.handleInput(event,'name')}/>
                          
                        
                    </div> 

                    <div className="form_element">
                        <input 
                        type="text"
                        placeholder="Enter author"
                        value={this.state.formdata.author}
                        onChange={(event) => this.handleInput(event,'author')}>
                        </input>    
                    </div>    

                    <textarea 
                        value = {this.state.formdata.review}
                        onChange={(event) => this.handleInput(event,'review')}
                    />


                    <div className="form_element">
                        <input
                        type="text"
                        placeholder="Enter pages"
                        value={this.state.formdata.pages}
                        onChange={(event) => this.handleInput(event,'pages')}>
                        </input>

                    </div>

                    <div className="form_element">
                        <select
                        value={this.state.formdata.rating}
                        onChange={(event) => this.handleInput(event,'rating')}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>

                    <div className="form_element">
                        <input
                        type="number"
                        placeholder="Enter price"
                        value={this.state.formdata.price}
                        onChange={(event) => this.handleInput(event,'price')}>
                        </input>

                    </div>
                    <button
                    className="button" 
                    type="submit"
                    onSubmit={this.submitForm}> Edit review </button>

                    <div className="delete_post">
                        <div className="button"
                        onClick={this.deletePost}
                        >
                            Delete review
                        </div>
                    </div>
                </form>
                
            </div>  
        );
    }
}

const mapStateToProps = (state) => {
    return {
        books:state.books
    }
}
export default connect(mapStateToProps)(editBook)
