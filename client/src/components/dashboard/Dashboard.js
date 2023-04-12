import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authentication';
import { withRouter } from 'react-router-dom';
import Sidebar from '../layout/Sidebar';
import AddBook from '../adminPages/AddBook';
import { HashRouter, Route, Switch } from "react-router-dom";
import DbAdmin from "../adminPages/DbAdmin";
import BookCategory from '../adminPages/BookCat'; 
import ViewBook from "../adminPages/ViewBook";
import BookManage from '../adminPages/BookManage';
import BorowTransactionManage from '../adminPages/TransactionManage';
import EditBook from '../adminPages/EditBook';
import CategoryManage from '../adminPages/CategoryManage';
import ViewBookCat from '../adminPages/ViewBookCat';
import EditBookCat from '../adminPages/EditBookCat';
import EditStudent from '../adminPages/EditStudent';
import ViewBookDetail from '../adminPages/ViewBookDetail';
import ViewTransactionDetail from '../adminPages/ViewTransactionDetail';
import ViewCatDetail from '../adminPages/ViewCatDetail';
import ViewStudentDetail from '../adminPages/ViewStudentDetail';
import UserManage from '../adminPages/StudentManage';
import ViewUserBooks from '../adminPages/ViewUserBooks';
import AddTransaction from "../adminPages/AddTransaction";
import AddStudent from "../adminPages/AddStudent";
import EditTransaction from "../adminPages/EditTransaction";
    
class Dashboard extends Component {


    render(){

        return(
                <div className="container-fluid pl-0">
                    <HashRouter>
                    <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <div className="dashboard-rightbar">
                            <div className="mgb-10"></div>
                            <Switch>
                                <Route exact path='/' component={DbAdmin}/>
                                <Route path='/addBook' component={AddBook} />  
                                <Route path='/addStudent' component={AddStudent} />  
                                <Route path='/addTransaction' component={AddTransaction} />  
                                <Route path='/addCategory' component={BookCategory} /> 
                                <Route path='/viewBook' component={ViewBook} />
                                <Route path='/book_manage' component={BookManage} />
                                <Route path='/borrow_transaction_manage' component={BorowTransactionManage} />
                                <Route path='/category_manage' component={CategoryManage} />
                                <Route path='/editBook/:id' component={EditBook} />
                                <Route path='/editStudent/:id' component={EditStudent} />
                                <Route path='/viewBookCat' component={ViewBookCat} />
                                <Route path='/editBookCat/:id' component={EditBookCat} />
                                <Route path='/editTransaction/:id' component={EditTransaction} />
                                <Route path='/viewBookDetail/:id' component={ViewBookDetail} />
                                <Route path='/viewStudentDetail/:id' component={ViewStudentDetail} />
                                <Route path='/viewTransactionDetail/:id' component={ViewTransactionDetail} />
                                <Route path='/viewCatDetail/:id' component={ViewCatDetail} />
                                <Route path='/user_manage' component={UserManage} />
                                <Route path='/issuedBooks/:id' component={ViewUserBooks} />
                            </Switch>
                        </div>
                    </div>
                    
                </div>
                </HashRouter>
            </div>
        );
    }
}

Dashboard.propTypes = {
   // newbooks: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps,{logoutUser})(withRouter(Dashboard));