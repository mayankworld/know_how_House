import React, { Component } from 'react';
import { getBooks,getBookCat,getTransactions,getStudentUser } from '../../actions/authentication';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class DbAdmin extends Component {

    componentDidMount() {
        this.props.getBooks();
        this.props.getBookCat();
        this.props.getTransactions();
        this.props.getStudentUser();
    }

    render() {

        const bookCount = this.props.books.viewBook.length;
        const catCount = this.props.books.schema.length;
        const stuCount = this.props.auth.studentData.length;
        const transactionCount = this.props.books.transactions.length;

        return (
            <div className="dashboard">
                <div className="row">
                    <div className="col-md-4">
                        <div className="db1 borderRadius-12 cardBlackColour d-flex justify-content-around">
                            <p className="fas fa-book-medical fa-3x cardOrangeColour paddingTop-14"></p>
                            <div className='d-flex flex-direction-column mgt-10'>
                                <p className='cardWhiteColour adminCardDesignSetting'>{bookCount}</p>
                                <Link to="book_manage"><h6 className='cardWhiteColour'>Total No. Of Books</h6></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="db1 borderRadius-12 cardBlackColour d-flex justify-content-around">
                            <p className="fas fa-book fa-3x cardOrangeColour paddingTop-14" ></p>
                            <div className='d-flex flex-direction-column mgt-10'>
                                <p className='cardWhiteColour adminCardDesignSetting'>{catCount}</p>
                                <Link to="category_manage"><h6 className='cardWhiteColour'>Total No. Of Categories</h6></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="db1 borderRadius-12 cardBlackColour d-flex justify-content-around">
                            <p className="fas fa-graduation-cap fa-3x cardOrangeColour paddingTop-14" ></p>
                            <div className='d-flex flex-direction-column mgt-10'>
                                <p className='cardWhiteColour adminCardDesignSetting'>{stuCount}</p>
                                <Link to="user_manage"><h6 className='cardWhiteColour'>Total No. Of Students </h6></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mgt-10">
                        <div className="db1 borderRadius-12 cardBlackColour d-flex justify-content-around">
                            <p className="fas fa-users fa-3x cardOrangeColour paddingTop-14" ></p>
                            <div className='d-flex flex-direction-column mgt-10'>
                                <p className='cardWhiteColour adminCardDesignSetting'>{transactionCount}</p>
                                <Link to="borrow_transaction_manage"><h6 className='cardWhiteColour'>Total No. Of Transactions </h6></Link>
                            </div>
                        </div>
                    </div>
                    {/* <div className="col-md-4 mgt-10">
                        <div className="db1 borderRadius-12 cardBlackColour d-flex justify-content-around">
                            <p className="fas fa-id-card-alt fa-3x cardOrangeColour paddingTop-14" ></p>
                            <div className='d-flex flex-direction-column mgt-10'>
                                <p className='cardWhiteColour adminCardDesignSetting'>{bookCount}</p>
                                <Link to="user_manage"><h6 className='cardWhiteColour'>Total No. Of Essued Books </h6></Link>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    books: state.books
});


export default connect(
    mapStateToProps,
    { getBooks,getBookCat,getStudentUser,getTransactions }
)(withRouter(DbAdmin));
