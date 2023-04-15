import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {getBooks,getTransactions,deleteTransaction} from '../../actions/authentication';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class ViewTransaction extends Component{

    constructor(props){
        super(props);
        this.state ={
            search: '',
            status: true
        }
    }

    updateSearch(event){

        this.setState({
            search: event.target.value.toLowerCase().substr(0,20)
        });
    }

    deleteTransaction(event,_id,book_name) {
        event.preventDefault();
        if (
            window.confirm(
                `Do you want to delete  ${book_name} book transaction permanently?`,
            )
        ){   
            this.props.deleteTransaction(_id);
            this.props.getTransactions();
       } 
    }

    componentDidMount(){
        const {getTransactions} = this.props;
        getTransactions();

    }

    render() {
        const viewBook = this.props.books.transactions.filter(
            (el) =>
            {
                // return Object.keys(el).some(key =>
                //     el[key].toString().toLowerCase().includes(this.state.search.toLowerCase())
                //   );
                return Object.keys(el).some(key => el[key].toString().toLowerCase().search(this.state.search.toLowerCase()) !== -1);
            }
        );

        return(

                <div>
                    
                    <input type="text"
                    className="float-right searchBox"
                    placeholder="Search for..."
                    value={this.state.search}
                    onChange = {this.updateSearch.bind(this)}
                    />
                        
                    <table className="table table-hover table-bordered view-book">
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>BooK Name</th>
                                <th>Issued Date</th>
                                <th>Return Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr> 
                        </thead>
                        <tbody>
                        
                            {viewBook.map((el) => {
                            return  <tr className="firstrow" key={el._id}>
                                        <td className="sno"></td>
                                        <td>{el.book_name.charAt(0).toUpperCase() + el.book_name.substring(1)}</td>
                                        <td>{el.date_borrow}</td>
                                        <td>{el.date_return}</td>
                                        <td>{el.status}</td>
                                        <td><Link   to={"/editTransaction/" + el._id} 
                                                    className="far fa-edit editBook"
                                                    title="Edit Transaction"
                                            >
                                            </Link>
                                            <Link to='/' 
                                                onClick={ (event) => this.deleteTransaction(event,el._id, el.book_name) } 
                                                className="far fa-trash-alt deleteBook"
                                                title="Delete Transaction"
                                            >
                                            </Link>
                                            <Link to={"/viewTransactionDetail/" + el._id} 
                                                className="fas fa-address-book detailBook"
                                                title="Transaction Detail"
                                            >
                                            </Link>
                                            {/* <button  
                                                onClick={ (event) => this.activeBook(event,el._id,el.status) } 
                                                className={el.status === true ? "fas fa-eye activeElement": "fas fa-eye-slash activeElement"}
                                                title={el.status === true ? "Active" : "Deactive"}
                                            >
                                            </button> */}
                                        </td>
                                    </tr>
                            })}
                                        
                        </tbody>
                    </table>
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
    {getBooks,getTransactions,deleteTransaction}
  )(withRouter(ViewTransaction));