import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getBooks, getBookCat, logoutUser } from '../../actions/authentication';

class editStudent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            school_id: "",
            name: "",
            gender: "",
            phoneNo: "",
            email: "",
            address: "",
            stu_department: "",
            stu_course: ""
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

        axios.get('/api/library/editStudent/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    school_id: res.data.school_id,
                    name: res.data.name,
                    gender: res.data.gender,
                    phoneNo: res.data.phoneNo,
                    email: res.data.email,
                    address: res.data.address,
                    stu_department: res.data.stu_department,
                    stu_course: res.data.stu_course
                });
            })
            .catch((err) => {
                console.log(err);
            })
    }

    onSubmit(e) {
        e.preventDefault();
        const viewStudent = {
            school_id: this.state.school_id,
            name: this.state.name,
            gender: this.state.gender,
            phoneNo: this.state.phoneNo,
            email: this.state.email,
            address: this.state.address,
            stu_department: this.state.stu_department,
            stu_course: this.state.stu_course
        };
        axios.put('/api/library/updateStudent/' + this.props.match.params.id, viewStudent)
            .then(res => console.log(res.data));
        this.props.history.push('/user_manage');
    }
    onCancle = e => {
        this.props.history.push('/user_manage');

    }

    render() {

        return (

            <form onSubmit={this.onSubmit}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header bg-success text-white">
                                    <strong>EDIT STUDENT</strong>
                                </div>
                                <div className="card-body overflowAuto-424">
                                    <table className="table table-striped">
                                        <tbody>
                                            <tr>
                                                <td>SCHOOL ID</td>
                                                <td>
                                                    <input type="text"
                                                        onChange={this.onChange}
                                                        className="form-control"
                                                        id="school_id"
                                                        placeholder="School ID"
                                                        name="school_id"
                                                        value={this.state.school_id}
                                                        required
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>STUDENT NAME</td>
                                                <td>
                                                    <input type="text"
                                                        onChange={this.onChange}
                                                        className="form-control"
                                                        id="name"
                                                        placeholder="Student Name"
                                                        name="name"
                                                        value={this.state.name}
                                                        required
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>GENDER</td>
                                                <td>
                                                    <select type="text"
                                                        onChange={this.onChange}
                                                        className="form-control"
                                                        id="gender"
                                                        placeholder="Gender"
                                                        name="gender"
                                                        value={this.state.gender}
                                                        required
                                                    >
                                                        <option value="Male">Male</option>
                                                        <option value="Female">Female</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>PHONE NO.</td>
                                                <td>
                                                    <input type="tel"
                                                        onChange={this.onChange}
                                                        min="10"
                                                        max="10"
                                                        pattern='[0-9]{10}'
                                                        className="form-control"
                                                        id="phoneNo"
                                                        placeholder="Phone Number 10-Digits"
                                                        name="phoneNo"
                                                        value={this.state.phoneNo}
                                                        required
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>EMAIL</td>
                                                <td>
                                                    <input type="email"
                                                        onChange={this.onChange}
                                                        className="form-control"
                                                        id="email"
                                                        placeholder="Email"
                                                        name="email"
                                                        value={this.state.email}
                                                        required
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>STUDENT DEPARTMENT</td>
                                                <td>
                                                    <input type="text"
                                                        onChange={this.onChange}
                                                        className="form-control"
                                                        id="stu_department"
                                                        placeholder="Student Department"
                                                        name="stu_department"
                                                        value={this.state.stu_department}
                                                        required
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>STUDENT COURSE</td>
                                                <td>
                                                    <input type="text"
                                                        onChange={this.onChange}
                                                        className="form-control"
                                                        id="stu_course"
                                                        placeholder="Student Course"
                                                        name="stu_course"
                                                        value={this.state.stu_course}
                                                        required
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>ADDRESS</td>
                                                <td>
                                                    <input type="text"
                                                        onChange={this.onChange}
                                                        className="form-control"
                                                        id="address"
                                                        placeholder="Student Address"
                                                        name="address"
                                                        value={this.state.address}
                                                        required
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="admin-updateBtn">
                            <button type="submit" className="btn btn-success">Update Student</button>
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
    { getBooks, getBookCat, logoutUser }
)(withRouter(editStudent));