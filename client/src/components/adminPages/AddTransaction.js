import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment'
import { borrowTransaction, getBookCat, getBooks, logoutUser ,getStudentUser } from '../../actions/authentication';

class AddTransaction extends Component {

    constructor(props) {
        super(props);

        this.state = {
            book_name: "",
            student_name: "",
            date_borrow: "",
            date_return: "",
            status: ""
        }
    }

    onChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    onCancle = e => {
        this.props.history.push('/borrow_transaction_manage');

    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    onSubmit = e => {
        e.preventDefault();
        let borrow_date = moment(this.state.date_borrow).format("YYYY-MM-DD").toString();
        let return_date = moment(this.state.date_return).format("YYYY-MM-DD").toString();
        let now = moment().format("YYYY-MM-DD").toString();
        if (moment(borrow_date).isSameOrAfter(now) && moment(return_date).isAfter(now)) {
            if (moment(return_date).isAfter(borrow_date)) {
            const add_transaction = {
                book_name: this.state.book_name,
                student_name: this.state.student_name,
                date_borrow: borrow_date,
                date_return: return_date,
                status: this.state.status
            };
            this.props.borrowTransaction(add_transaction, this.props.history);
            } else {
                alert("Don't pick the previous date from borrow date!");
            }
        } else {
            alert("Don't pick the previous date from today!");
        }
    };

    componentDidMount() {
        const { getBookCat, getBooks,getStudentUser } = this.props;
        getBookCat();
        getBooks();
        getStudentUser();

    }

    render() {
        const { schema } = this.props.books;
        const viewBook = this.props.books.viewBook;
        const stuCount = this.props.auth.studentData;

        return (
            <div className="addbooks" >
                <div className="row">
                    <div className="col-md-12">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group d-flex ">
                                <label for="book_name col-3">Book Name:</label>
                                <select type="text"
                                    onChange={this.onChange}
                                    className="form-control col-8 mgl-40"
                                    id="book_name"
                                    placeholder="Book Name"
                                    name="book_name"
                                    value={this.state.book_name}
                                    required
                                >
                                    <option value="" selected="selected">Please select book...</option>
                                    {
                                        viewBook.length > 0 && viewBook.map((bok) => {
                                            return <option value={bok.book_name}>{bok.book_name}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-group d-flex">
                                <label for="book_name col-3">Book Category:</label>
                                <select type="text"
                                    onChange={this.onChange}
                                    className="form-control col-8 mgl-20"
                                    id="student_name"
                                    placeholder="Student Name"
                                    name="student_name"
                                    value={this.state.student_name}
                                    required
                                >
                                    <option value="" selected="selected">Please select student...</option>
                                    {
                                        stuCount.length > 0 && stuCount.map((bok) => {
                                            return <option value={bok.name}>{bok.name}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-group d-flex">
                                <label for="book_name col-3">Borrow Date:</label>
                                <input
                                    type="date"
                                    onChange={this.onChange}
                                    className="form-control col-8 mgl-30"
                                    id="date_borrow"
                                    placeholder="Borrow Date"
                                    name="date_borrow"
                                    value={this.state.date_borrow}
                                    required
                                />
                            </div>
                            <div className="form-group d-flex">
                                <label for="book_name col-3">Return Date:</label>
                                <input
                                    type="date"
                                    onChange={this.onChange}
                                    className="form-control col-8 mgl-35"
                                    id="date_return"
                                    placeholder="Return Date"
                                    name="date_return"
                                    value={this.state.date_return}
                                    required
                                />
                            </div>
                            <div className="form-group d-flex">
                                <label for="status col-3">Status:</label>
                                <select type="text"
                                    onChange={this.onChange}
                                    className="form-control col-8 mgl-90"
                                    id="status"
                                    placeholder="Status"
                                    name="status"
                                    value={this.state.status}
                                    required
                                >
                                    <option value="" selected="selected">Please select status...</option>
                                    <option value="Incompelete" selected="selected">Incompelete</option>
                                    <option value="Pending" selected="selected">Pending</option>
                                    <option value="Compelete" selected="selected">Compelete</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-success">Add Transaction</button>
                            <button type="button" onClick={this.onCancle} className="btn btn-success mgl-30">Cancle</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

AddTransaction.propTypes = {
    getBookCat: PropTypes.func.isRequired,
    getBooks: PropTypes.func.isRequired,
    borrowTransaction: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    books: state.books
});


export default connect(
    mapStateToProps,
    { borrowTransaction, logoutUser, getBookCat, getBooks,getStudentUser }
)(withRouter(AddTransaction));