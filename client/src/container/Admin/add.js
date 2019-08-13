import React, { Component } from 'react'
import { connect} from 'react-redux';
import { Link } from 'react-router-dom'
import { addReview,clearNewBook } from '../../actions'
class AddReview extends Component {
    state = {
        formdata:{
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
        this.props.dispatch(addReview({
            ...this.state.formdata,
            ownerId:this.props.user.login.id
        }))
       
        
    }

    componentWillUnmount() {
        this.props.dispatch(clearNewBook());
    }
    showNewBook = (book) => (
        book.post ? 
            <div className="conf_link">
                Cook <Link to={`/books/${book.bookId}`}> 
                    Click the link to see the post
                </Link>

            </div>
        :null
    )

    

    render() {
        return (
            <div className="rl_container article">
                <form onSubmit={this.submitForm}>
                    <h2> Add a Review</h2> 

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
                    onSubmit={this.submitForm}> Add Review </button>
                    {
                        this.props.books.newbook ? this.showNewBook(this.props.books.newbook) : null
                    }

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
export default connect(mapStateToProps)(AddReview)
