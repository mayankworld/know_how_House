import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ViewUsers from './ViewUsers';

class UserManage extends Component {

    render() {

        return (

            <div className="container">
                <div className="row">
                    <div className="col-md-12 bookadd">
                        <div className='flex-spacebetween' >
                            <h1>STUDENT LIST</h1>
                            <Link to='/addStudent'
                                className="fas fa-plus btn btn-primary float-right">
                                ADD STUDENT
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <ViewUsers />
                    </div>
                </div>
            </div>
        )
    }
}

export default UserManage;