import React from 'react';
import MaterialTable from 'material-table';
import { connect } from 'react-redux'
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { isEmpty } from 'lodash'
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';


const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        userList: state.ticket.users,
        tickets: state.ticket.tickets,
        loading: state.ticket.isLoading,

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        listUsers: (token) => dispatch({ type: 'LIST_USERS_REQUEST', payload: { token } }),
        listTicket: (token) => dispatch({ type: 'LIST_TICKET_REQUEST', payload: { token } }),
        editTicket: (token) => dispatch({ type: 'EDIT_TICKET_REQUEST', payload: { token } }),
        deleteTicket: (token) => dispatch({ type: 'DELETE_TICKET_REQUEST', payload: { token } }),
        createTicket: (token) => dispatch({ type: 'CREATE_TICKET_REQUEST', payload: { token } }),
        assignTicket: (token) => dispatch({ type: 'ASSIGN_TICKET_REQUEST', payload: { token } }),
    }
}


class TicketList extends React.Component {
    constructor(props) {
        super(props);
        // No llames this.setState() aquí!
        this.state = {
            columns: [
                { title: 'Nombre', field: 'name' },
                { title: 'Ticket', field: 'ticket' },
                { title: 'Tomado', field: 'taken', type: 'datetime' }
            ],
            data: [
                { name: 'Usuario1', ticket: 63, taken: Date(Date.now()).toString() },
                { name: 'Usuario2', ticket: 64, taken: Date(Date.now()).toString() },
            ]
        }
    }

    componentDidMount() {
        const token = this.props.user ? this.props.user.token : 2
        this.props.listTicket(token)
    }

    render() {
        const state = this.state
        const setState = (asdf) => this.setState(asdf);
        const user = this.props.user
        const loading = this.props.loading
        if (isEmpty(user)) {
            return <Redirect to="/" />;
        }
        if(loading){
            return <CircularProgress></CircularProgress>
        }
        return (
            <Container component="main" >
                <CssBaseline />
                <MaterialTable
                    title="Tickets"
                    columns={state.columns}
                    data={state.data}
                    editable={{
                        onRowAdd: newData =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    const data = [...state.data];
                                    data.push(newData);
                                    setState({ ...state, data });
                                }, 600);
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    const data = [...state.data];
                                    data[data.indexOf(oldData)] = newData;
                                    setState({ ...state, data });
                                }, 600);
                            }),
                        onRowDelete: oldData =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    const data = [...state.data];
                                    data.splice(data.indexOf(oldData), 1);
                                    setState({ ...state, data });
                                }, 600);
                            }),
                    }}
                />
            </Container>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketList);


