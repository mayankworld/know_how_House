import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ViewBook from './ViewBook';

class BookManage extends Component {

    render() {

        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 bookadd">
                        <div className='flex-spacebetween' >
                    <h1>BOOKS LIST</h1>
                        <Link to='/addBook' 
                            className="fas fa-plus btn btn-primary float-right">
                                ADD BOOK
                        </Link>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <ViewBook />
                    </div>
                </div>
            </div>
        )
    }
}

export default BookManage;