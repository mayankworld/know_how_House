import React, { Component } from 'react';
// import {Link} from 'react-router-dom';
import { getTransactions } from '../../actions/authentication';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class ViewTransactionDetail extends Component {
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

    onCancle = e => {
        this.props.history.push('/user_manage');

    }

    componentDidMount() {
        axios.get('/api/library/viewTransactionDetail/' + this.props.match.params.id)
            .then(res => {
                console.log(res.data.book_name,"res.data.book_name");
                this.setState({
                    book_name: res.data.book_name,
                    student_name: res.data.student_name,
                    date_borrow: res.data.date_borrow,
                    date_return:res.data.date_return,
                    status:res.data.status
                });
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render() {

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header bg-success text-white"><strong>VIEW TRANSACTION DETAILS</strong></div>
                            <div className="card-body">
                                <table className="table table-striped">
                                    <tbody>
                                        <tr>
                                            <td>BOOK NAME</td>
                                            <td>{this.state.book_name}</td>
                                        </tr>
                                        <tr>
                                            <td>STUDENT NAME</td>
                                            <td>{this.state.student_name}</td>
                                        </tr>
                                        <tr>
                                            <td>BORROW DATE</td>
                                            <td>{this.state.date_borrow}</td>
                                        </tr>
                                        <tr>
                                            <td>RETURN DATE</td>
                                            <td>{this.state.date_return}</td>
                                        </tr>
                                        <tr>
                                            <td>STATUS</td>
                                            <td>{this.state.status}</td>
                                        </tr>
                                        <button type="button" onClick={this.onCancle} className="btn btn-success mgt-20">Cancle</button>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state, props) => ({
    auth: state.auth,
    errors: state.errors,
    books: state.books
});


export default connect(
    mapStateToProps,
    { getTransactions }
)(withRouter(ViewTransactionDetail));