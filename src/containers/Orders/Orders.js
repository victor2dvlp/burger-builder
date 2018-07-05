import React, {Component} from 'react';
import axios from '../../axios-orders';
import WithErrorHandling from '../../hoc/WithErrorHandler/WithErrorHandler';
import Spiner from '../../components/UI/Spiner/Spiner';

import Order from '../../components/Order/Order';

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    };

    componentDidMount() {
        axios.get('orders.json').then(res => {
            const fetchedOrders = [];
            for(let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                })
            }

            this.setState({loading: false, orders: fetchedOrders})
        })
            .catch(error => {
                this.setState({loading: false})
            })
    }

    render() {
        let ordersOutput = null;
        if(this.state.loading) {
            ordersOutput = (<Spiner/>);
        } else {
            ordersOutput = this.state.orders.map(order => (
                <Order
                    key={order.id}
                    price={order.price}
                    ingredients={order.ingredients}
                />
            ))
        }
        return (
            <div>
                {ordersOutput}
            </div>
        );
    }
}

export default WithErrorHandling(Orders, axios);