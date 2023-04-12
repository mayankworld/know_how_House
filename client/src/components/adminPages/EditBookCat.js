import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchBookCat } from '../../actions/authentication';

class EditBookCat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            book_cat: "",
            book_cat_desc: ""
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

        axios.get('/api/library/editBookCat/' + this.props.match.params.id)
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
    onCancle = e => {
        this.props.history.push('/category_manage');

    }
    onSubmit(e) {
        e.preventDefault();
        const viewBookCat = {
            book_cat: this.state.book_cat,
            book_cat_desc: this.state.book_cat_desc
        };
        axios.put('/api/library/updateBookCat/' + this.props.match.params.id, viewBookCat)
            .then(res => console.log(res.data));

        this.props.history.push('/category_manage');
    }


    render() {

        return (

            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <input type="text"
                        onChange={this.onChange}
                        className="form-control"
                        id="book_cat"
                        placeholder="Book Category"
                        name="book_cat"
                        value={this.state.book_cat}
                    />
                </div>
                <div className="form-group">
                    <textarea type="text"
                        onChange={this.onChange}
                        rows={7}
                        className="form-control"
                        id="book_cat_desc"
                        placeholder="Please Enter Book Category Description"
                        name="book_cat_desc"
                        value={this.state.book_cat_desc}
                    />
                </div>
                <button type="submit" className="btn btn-success">Update Book Category</button>
                <button type="button" onClick={this.onCancle} className="btn btn-success mgl-30">Cancle</button>
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
    { fetchBookCat }
)(withRouter(EditBookCat));