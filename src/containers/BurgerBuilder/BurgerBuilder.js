import React, { Component } from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BurgerControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spiner/Spiner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import * as burgerBuilderActions from '../../store/actions';
import axios from '../../axios-orders';

class BurgerBuilder extends Component {
    state = {
        purchase: false
    };

    componentDidMount () {
        this.props.onInitIngredients()
    };

    updatePursache(ingredients) {
        let sum = 0;
        if (ingredients) {
            sum = Object.keys(ingredients).map(ingKey => ingredients[ingKey])
                .reduce( (sum, elem) => {
                    sum += elem;
                    return sum;
                }, 0);
        }

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
        const { ings, error } = this.props;
        let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner />;
        let orderSummary  = null;
        const disabledInfo = {
            ...this.props.ings
        };

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        };

        if (ings) {
            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ings}
                    cancelPurchase={this.closePurchase}
                    continuePurchase={this.continuePurchaseHandler}
                    price={this.props.price.toFixed(2)}
                />
            );

            burger = (
                <Aux>
                    <Burger ingredients={ings}/>
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
        }

        return (
            <Aux>
                <Modal show={this.state.purchase} closeModal={this.closePurchase}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    };
};

const mapStateToProps = state => {
    console.log(state);
    return {
        ings: state.ingredients,
        price: state.totalPrice,
        error: state.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemove: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));