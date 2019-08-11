import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { getUsers,registerUser } from '../../actions'
class register extends PureComponent {
    state = {
        name:'',
        lastname:'',
        email:'',
        password:'',
        error:''
    }
    componentDidMount(){
        this.props.dispatch(getUsers())
    }
    handleInputEmail = (event) => {
        this.setState(
            {email:event.target.value}
        )
    }

    handleInputPassword = (event) => {
        this.setState(
            {password:event.target.value}
        )
    }

    handleInputName = (event) => {
        this.setState(
            {name:event.target.value}
        )
    }

    handleInputLastName = (event) => {
        this.setState(
            {lastname:event.target.value}
        )
    }

    submitForm = (event) => {
        event.preventDefault();
        this.setState({error:''})
    }
    showUsers = (users) => (
        users? users.map(item => (
            <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.lastname}</td>
                <td>{item.email}</td>
            </tr>
        )):null
    )
    submitForm = (e) => {
        e.preventDefault();
        this.setState({error:''})
        this.props.dispatch(registerUser({
            email:this.state.email,
            password:this.state.password,
            name:this.state.name,
            lastname:this.state.lastname
        },this.props.user.users))
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.user.register === false){
            this.setState({error:'Error,try agin'})
        }else{
            this.setState({
                name:'',
                lastname:'',
                email:'',
                password:'',
            })
        }
    }
    render() {
       
        return (
            <div className="rl_container">
                <form onSubmit={this.submitForm}>
                    <h2>Add user</h2>

                    <div className="form_element">
                        <input
                        type="text"
                        placeholder="Enter name"
                        value={this.state.name}
                        onChange={this.handleInputName}>
                        </input>
                    </div>

                    <div className="form_element">
                        <input
                        type="text"
                        placeholder="Enter lastname"
                        value={this.state.lastname}
                        onChange={this.handleInputLastName}/>
                        
                    </div>

                    <div className="form_element">
                        <input
                        type="email"
                        placeholder="Enter email"
                        value={this.state.email}
                        onChange={this.handleInputEmail}>
                        </input>
                    </div>

                    <div className="form_element">
                        <input
                        type="password"
                        placeholder="Enter password"
                        value={this.state.password}
                        onChange={this.handleInputPassword}>
                        </input>
                    </div>

                    <button type="submit" > Add User</button>

                    <div className="error">
                        {this.state.error}
                    </div>

                </form>
                <div className="current_users">
                    <h4>Current users:</h4>

                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>LastName</th>
                                <th>Email</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.showUsers(this.props.user.users)}
                        </tbody>
                    </table>
                </div>


            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(register)