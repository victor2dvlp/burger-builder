import React, { Component } from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BurgerControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spiner/Spiner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import * as actionTypes from '../../store/actions';


class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        purchase: false,
        loading: false

    };
    updatePursache(ingredients) {
        const sum = Object.keys(ingredients).map(ingKey => ingredients[ingKey])
            .reduce( (sum, elem) => {
                sum += elem;
                return sum;
            }, 0);
        return sum > 0;
    };
    purchaseHandler = () => {
      this.setState({purchase: true});
    };
    closePurchase = () => {
      this.setState({purchase: false, loading: false});
    };
    continuePurchaseHandler = () => {
        this.props.history.push('/checkout');
    };
    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        };
        let orderSummary  = (
            <OrderSummary
                ingredients={this.props.ings}
                cancelPurchase={this.closePurchase}
                continuePurchase={this.continuePurchaseHandler}
                price={this.props.price.toFixed(2)}
            />
        );
        if(this.state.loading) {
           orderSummary = <Spinner/>;
        }
        return (
            <Aux>
                <Modal show={this.state.purchase} closeModal={this.closePurchase}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.props.ings} />
                <BuildControls
                    ingredientAdded={ this.props.onIngredientAdded }
                    ingredientRemoved={ this.props.onIngredientRemove }
                    disabled={disabledInfo}
                    price={this.props.price}
                    purchasable={this.updatePursache(this.props.ings)}
                    purchase={this.purchaseHandler}

                />
            </Aux>
        );
    };
};

const mapStateToProps = state => {
    console.log(state);
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemove: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));