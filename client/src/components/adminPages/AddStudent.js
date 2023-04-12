import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { newStudent, logoutUser } from '../../actions/authentication';

class AddStudent extends Component {

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

    onSubmit = e => {
        e.preventDefault();
        const add_student = {
            school_id: this.state.school_id,
            name: this.state.name,
            gender: this.state.gender,
            phoneNo: this.state.phoneNo,
            email: this.state.email,
            address: this.state.address,
            stu_department: this.state.stu_department,
            stu_course: this.state.stu_course,
        };
        this.props.newStudent(add_student, this.props.history);
    };
    onCancle = e => {
        this.props.history.push('/user_manage');

    }

    // componentDidMount() {

    //     const { getBookCat } = this.props;
    //     getBookCat();

    // }

    render() {

        return (
            <div className="addbooks" >
                <div className="row">
                    <div className="col-md-12">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input type="text"
                                    onChange={this.onChange}
                                    className="form-control"
                                    id="school_id"
                                    placeholder="School ID"
                                    name="school_id"
                                    value={this.state.school_id}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input type="text"
                                    onChange={this.onChange}
                                    className="form-control"
                                    id="name"
                                    placeholder="Student Name"
                                    name="name"
                                    value={this.state.name}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <select type="text"
                                    onChange={this.onChange}
                                    className="form-control"
                                    id="gender"
                                    placeholder="Gender"
                                    name="gender"
                                    value={this.state.gender}
                                    required
                                >
                                    <option value="" selected="selected">Please select gender...</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div className="form-group">
                            </div>
                            <div className="form-group">
                                <input type="tel"
                                pattern='[0-9]{10}'
                                    onChange={this.onChange}
                                    min="10"
                                    max="10"
                                    className="form-control"
                                    id="phoneNo"
                                    placeholder="Phone Number 10-Digit"
                                    name="phoneNo"
                                    value={this.state.phoneNo}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input type="email"
                                    onChange={this.onChange}
                                    className="form-control"
                                    id="email"
                                    placeholder="Email"
                                    name="email"
                                    value={this.state.email}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input type="text"
                                    onChange={this.onChange}
                                    className="form-control"
                                    id="stu_department"
                                    placeholder="Student Department"
                                    name="stu_department"
                                    value={this.state.stu_department}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input type="text"
                                    onChange={this.onChange}
                                    className="form-control"
                                    id="stu_course"
                                    placeholder="Student Course"
                                    name="stu_course"
                                    value={this.state.stu_course}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input type="text"
                                    onChange={this.onChange}
                                    className="form-control"
                                    id="address"
                                    placeholder="Student Address"
                                    name="address"
                                    value={this.state.address}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-success">Add Student</button>
                            <button type="button" onClick={this.onCancle} className="btn btn-success mgl-30">Cancle</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

AddStudent.propTypes = {
    newStudent: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    books: state.books
});


export default connect(
    mapStateToProps,
    { newStudent, logoutUser }
)(withRouter(AddStudent));