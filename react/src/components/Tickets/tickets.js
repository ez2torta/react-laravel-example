import React from 'react';
import MaterialTable from 'material-table';
import { connect } from 'react-redux'
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { isEmpty, map } from 'lodash'
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        userList: state.ticket.users,
        tickets: state.ticket.tickets,
        loadingUsers: state.ticket.isLoadingUsers,
        loadingTickets: state.ticket.isLoadingTickets,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        listUsers: (payload) => dispatch({ type: 'LIST_USERS_REQUEST', payload: payload }),
        listTicket: (payload) => dispatch({ type: 'LIST_TICKET_REQUEST', payload: payload }),
        editTicket: (payload) => dispatch({ type: 'EDIT_TICKET_REQUEST', payload: payload }),
        deleteTicket: (payload) => dispatch({ type: 'DELETE_TICKET_REQUEST', payload: payload }),
        createTicket: (payload) => dispatch({ type: 'CREATE_TICKET_REQUEST', payload: payload }),
        assignTicket: (payload) => dispatch({ type: 'ASSIGN_TICKET_REQUEST', payload: payload }),
    }
}


class TicketList extends React.Component {
    constructor(props) {
        super(props);
        // No llames this.setState() aquí!
        this.state = {
            columns: this.columnParser(),
            data: [
                { user: { name: 'Usuario1', id: 1 }, ticket: 63, taken: Date(Date.now()).toString(), wea_id: 3 },
                { user: { name: 'Usuario2', id: 2 }, ticket: 64, taken: Date(Date.now()).toString() },
            ]
        }
    }

    columnParser() {
        // const userList = this.props.userList
        const userList = [
            { name: 'Usuario1', id: 1 },
            { name: 'Usuario2', id: 2 },
            { name: 'Usuario3', id: 3 }
        ]
        return [
            {
                title: 'Usuario',
                field: 'user',
                // editable: 'onAdd',
                render: rowData => <span>{rowData.user.name}</span>, // ver lookup?
                editComponent: props => (
                    <Select value={props.value ? props.value : {}}
                        renderValue={user => user.name}
                        onChange={e => props.onChange(e.target.value)}>
                        {userList.map(user =>
                            <MenuItem value={user}
                                key={user.id}>
                                {user.name}
                            </MenuItem>)
                        }
                    </Select>
                )
            },
            { title: 'Ticket', field: 'ticket', type: 'numeric' },
            { title: 'Tomado', field: 'taken', type: 'datetime' }
        ]
    }

    componentDidMount() {
        const token = this.props.user && this.props.user.token ? this.props.user.token : 2
        this.props.listTicket(token)
    }

    actions() {
        // si no es admin
        if (false) {
            return [
                {
                    icon: 'check',
                    tooltip: 'Tomar Ticket',
                    onClick: (event, rowData) => alert("You saved " + rowData.name)
                }
            ]
        }
        else {
            return []
        }
    }

    editable() {
        const state = this.state
        const setState = (data) => this.setState(data);
        const token = this.props.user.token
        if (false) {
            return {
            }
        }
        else {
            return {
                onRowAdd: newData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            this.props.createTicket({ token: token, ticketData: newData })
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            this.props.editTicket({ token: token, ticketData: newData })
                        }, 600);
                    }),
                onRowDelete: oldData => {
                    console.log(oldData)
                    return new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            const ticketId = oldData.ticket
                            this.props.deleteTicket({ token: token, ticketId: ticketId })
                        }, 600);
                    })
                },
            }
        }

    }

    render() {
        const state = this.state
        const user = this.props.user
        const loading = this.props.loading
        if (isEmpty(user)) {
            return <Redirect to="/" />;
        }
        if (loading) {
            return <CircularProgress></CircularProgress>
        }
        return (
            <Container component="main" >
                <CssBaseline />
                <MaterialTable
                    title="Tickets"
                    columns={state.columns}
                    data={state.data}
                    actions={this.actions.bind(this)(user)}
                    editable={this.editable.bind(this)(user)}
                />
            </Container>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketList);


