import React from 'react'
import { Link } from 'react-router-dom'



const BookItem = (item) => {
    return (
        <Link to={`/books/${item._id}`} className="book_item">
            <div className="book_header">
                <h2>{item.name}</h2>
            </div>
            <div className="book_items">
                <div className="book_author">Author: {item.author}</div>
                <div className="book_bubble"> <strong> Prices: {item.price}</strong></div>
                <div className="book_bubble"> <strong> Pages: {item.pages}</strong></div>
                <div className="book_bubble rating"> <strong>Rating: {item.rating}</strong></div>
            </div>
        </Link>
    )
}

export default BookItem