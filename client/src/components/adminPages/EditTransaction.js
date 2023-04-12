import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from "moment";
import { getBooks, getBookCat, logoutUser,getStudentUser } from '../../actions/authentication';

class editTransaction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            book_name: "",
            student_name: "",
            date_borrow: "",
            date_return: "",
            status: ""
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    componentDidMount() {
        const { getBookCat, getBooks } = this.props;
        getBookCat();
        getBooks();

        axios.get('/api/library/editTransaction/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    book_name: res.data.book_name,
                    student_name: res.data.student_name,
                    date_borrow: res.data.date_borrow,
                    date_return: res.data.date_return,
                    status: res.data.status
                });
            })
            .catch((err) => {
                console.log(err);
            })
    }
    onCancle = e => {
        this.props.history.push('/borrow_transaction_manage');

    }
    onSubmit(e) {
        e.preventDefault();
        let borrow_date = moment(this.state.date_borrow).format('YYYY-MM-DD').toString();
        let return_date = moment(this.state.date_return).format('YYYY-MM-DD').toString();
        let now = moment().format("YYYY-MM-DD").toString();
        if (moment(borrow_date).isSameOrAfter(now) && moment(return_date).isAfter(now)) {
            if (moment(return_date).isAfter(borrow_date)) {
                const viewBook = {
                    book_name: this.state.book_name,
                    student_name: this.state.student_name,
                    date_borrow: borrow_date,
                    date_return: return_date,
                    status: this.state.status
                };
                axios.put('/api/library/updateTransaction/' + this.props.match.params.id, viewBook)
                    .then(res => console.log(res.data));
                this.props.history.push('/borrow_transaction_manage');
            } else {
                alert("Don't pick the previous date from borrow date!");
            }
        } else {
            alert("Don't pick the previous date from today!");
        }

    }


    render() {

        const viewBook = this.props.books.viewBook;
        const { schema } = this.props.books;
        const stuCount= this.props.auth.studentData;

        return (

            <form onSubmit={this.onSubmit}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header bg-success text-white">
                                    <strong>EDIT TRANSACTION</strong>
                                </div>
                                <div className="card-body overflowAuto-474">
                                    <table className="table table-striped">
                                        <tbody>
                                            <tr>
                                                <td>BOOK NAME</td>
                                                <td>
                                                    <select type="text"
                                                        onChange={this.onChange}
                                                        className="form-control"
                                                        id="book_name"
                                                        placeholder="Book Name"
                                                        name="book_name"
                                                        value={this.state.book_name}
                                                    >
                                                        {
                                                            viewBook.length > 0 && viewBook.map((bok) => {
                                                                return <option value={bok.book_name}>{bok.book_name}</option>
                                                            })
                                                        }
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>STUDENT NAME</td>
                                                <td>
                                                    <select type="text"
                                                        onChange={this.onChange}
                                                        className="form-control"
                                                        id="student_name"
                                                        placeholder="Student Name"
                                                        name="student_name"
                                                        value={this.state.student_name}
                                                    >
                                                        {
                                                            stuCount.length > 0 && stuCount.map((bok) => {
                                                                return <option value={bok.name}>{bok.name}</option>
                                                            })
                                                        }
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Borrow Date</td>
                                                <td>
                                                    <input type="Date"
                                                        onChange={this.onChange}
                                                        className="form-control"
                                                        id="date_borrow"
                                                        placeholder="Borrow Date"
                                                        name="date_borrow"
                                                        value={this.state.date_borrow}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Return Date</td>
                                                <td>
                                                    <input type="date"
                                                        onChange={this.onChange}
                                                        className="form-control"
                                                        id="date_return"
                                                        placeholder="RETURN DATE"
                                                        name="date_return"
                                                        value={this.state.date_return}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Status</td>
                                                <td>
                                                    <select type="text"
                                                        onChange={this.onChange}
                                                        className="form-control"
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
                                                </td>
                                            </tr>
                                            {/* <tr>
                                                <td>STATUS</td>
                                                <td>
                                                    <select type="text" 
                                                        onChange={this.onChange}
                                                        className="form-control" 
                                                        id="status"
                                                        name="status"
                                                        value={this.state.status}
                                                    >
                                                        <option>true</option> 
                                                        <option>false</option>  
                                                    </select>
                                                </td>
                                            </tr> */}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="admin-updateBtn">
                                <button type="submit" className="btn btn-success">Update Book</button>
                                <button type="button" onClick={this.onCancle} className="btn btn-success mgl-30">Cancle</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
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
    { getBooks, getBookCat, logoutUser,getStudentUser }
)(withRouter(editTransaction));