import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getBooks } from '../actions'

import BookItem from '../widgets/book_item'

class HomeContainer extends Component {
    componentWillMount(){
        this.props.dispatch(getBooks(3,0,'asc'))
    }

    renderItems = (books) => (
        books.list ?
            books.list.map( (item,i) => {
               return <BookItem {...item} key={item._id}/>
            }):null
    )

    loadmore = () => {
        let count = this.props.books.list.length;
        this.props.dispatch(getBooks(3,count,'desc',this.props.books.list))
    }
    render() {
        return (
        
          <div>
              {this.renderItems(this.props.books)}
              <div className="loadmore" onClick={this.loadmore}> Loadmore</div>
          </div>  
        );
    }
}

function mapStateToProps (state){
    return {
        books: state.books
    }
}
export default connect(mapStateToProps)(HomeContainer);