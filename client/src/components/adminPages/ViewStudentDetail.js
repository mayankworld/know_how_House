import React, { Component } from 'react';
// import {Link} from 'react-router-dom';
import { getTransactions } from '../../actions/authentication';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class ViewStudentDetail extends Component {
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

    onCancle = e => {
        this.props.history.push('/user_manage');

    }

    componentDidMount() {
        axios.get('/api/library/viewStudentDetail/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    school_id: res.data.school_id,
                    name: res.data.name,
                    gender: res.data.gender,
                    email:res.data.email,
                    phoneNo: res.data.phoneNo,
                    address: res.data.address,
                    stu_department:res.data.stu_department,
                    stu_course:res.data.stu_course
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
                            <div className="card-header bg-success text-white"><strong>VIEW STUDENT DETAILS</strong></div>
                            <div className="card-body">
                                <table className="table table-striped">
                                    <tbody>
                                        <tr>
                                            <td>SCHOOL ID</td>
                                            <td>{this.state.school_id}</td>
                                        </tr>
                                        <tr>
                                            <td>STUDENT NAME</td>
                                            <td>{this.state.name}</td>
                                        </tr>
                                        <tr>
                                            <td>GENDER</td>
                                            <td>{this.state.gender}</td>
                                        </tr>
                                        <tr>
                                            <td>STUDENT EMAIL</td>
                                            <td>{this.state.email}</td>
                                        </tr>
                                        <tr>
                                            <td>STUDENT PHONE</td>
                                            <td>{this.state.phoneNo}</td>
                                        </tr>
                                        <tr>
                                            <td>STUDENT ADDRESS</td>
                                            <td>{this.state.address}</td>
                                        </tr>
                                        <tr>
                                            <td>STUDENT DEPARTMENT</td>
                                            <td>{this.state.stu_department}</td>
                                        </tr>
                                        <tr>
                                            <td>STUDENT COURSE</td>
                                            <td>{this.state.stu_course}</td>
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
    { getTransactions }
)(withRouter(ViewStudentDetail));