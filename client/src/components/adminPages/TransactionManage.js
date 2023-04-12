import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ViewTransaction from './ViewBorrowTransaction';

class BorrowManage extends Component {

    render() {

        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 bookadd">
                        <div className='flex-spacebetween' >
                    <h1>BORROW & TRANSACTION LIST</h1>
                        <Link to='/addTransaction' 
                            className="fas fa-plus btn btn-primary float-right">
                                ADD BORROW
                        </Link>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <ViewTransaction />
                    </div>
                </div>
            </div>
        )
    }
}

export default BorrowManage;