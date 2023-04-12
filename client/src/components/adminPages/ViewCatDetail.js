import React, { Component } from 'react';
// import {Link} from 'react-router-dom';
import { fetchBookCat } from '../../actions/authentication';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class ViewCatDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            book_cat: "",
            book_cat_desc: ""
        }
    }
    
    onCancle = e => {
        this.props.history.push('/category_manage');

    }
    componentDidMount() {

        axios.get('/api/library/viewCatDetail/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    book_cat: res.data.book_cat,
                    book_cat_desc: res.data.book_cat_desc
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
                            <div className="card-header bg-success text-white"><strong>VIEW CATEGORY DETAILS</strong></div>
                            <div className="card-body">
                                <table className="table table-striped">
                                    <tbody>
                                        <tr>
                                            <td>CATEGORY NAME</td>
                                            <td>{this.state.book_cat}</td>
                                        </tr>
                                        <tr>
                                            <td>CATEGORY DESCRIPTION</td>
                                            <td>{this.state.book_cat_desc}</td>
                                        </tr>
                                        <button type="button" onClick={this.onCancle} className="btn btn-success ">Cancle</button>
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
    { fetchBookCat }
)(withRouter(ViewCatDetail));