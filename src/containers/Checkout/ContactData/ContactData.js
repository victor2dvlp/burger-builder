import React, {Component} from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spiner/Spiner';

import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        adress: {
            street: '',
            postalCode: ''
        },
        loading: false
    };

    orderHandler = (e) => {
        e.preventDefault();
        console.log(this.props.ingredients);
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Viktor Sapozhnyk',
                address: {
                    street: 'Test Street 1',
                    zipCode: '43435',
                    country: 'Ukraine'
                },
                email: 'test@test.com',
            },
            deliveryMethod: 'fastest'
        };
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({loading: false});
                this.props.history.push('/')
            })
            .catch(error => {
                this.setState({loading: false});
            });
    };

    render() {
        let form = (
            <form>
                <input
                    className={classes.Input}
                    type="text"
                    name="name"
                    placeholder="Your Name"
                />
                <input
                    className={classes.Input}
                    type="text"
                    name="email"
                    placeholder="Your Email"
                />
                <input
                    className={classes.Input}
                    type="text"
                    name="street"
                    placeholder="Street"
                />
                <input
                    className={classes.Input}
                    type="text"
                    name="postal"
                    placeholder="Postal Code"
                />
                <Button
                    btnType="Success"
                    clicked={this.orderHandler}
                >
                    ORDER
                </Button>
            </form>
        );
        if(this.state.loading) {
            form = (<Spinner/>);
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;