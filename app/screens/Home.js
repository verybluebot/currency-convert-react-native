import React, { Component } from 'react';
import {
    StatusBar,
    KeyboardAvoidingView,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { currencySwap, currencyValueChange } from '../actions/currencies';

import Container from '../components/Container';
import Logo from '../components/Logo';
import { InputWithButton } from '../components/Input';
import { ButtonSwitch } from '../components/Buttons'
import { SmallText } from '../components/Text';
import { Header } from '../components/Header';

class Home extends Component {
    static propTypes = {
        navigation: PropTypes.object,
        dispatch: PropTypes.func,
        baseCurrency: PropTypes.string,
        quoteCurrency: PropTypes.string,
        amount: PropTypes.number,
        conversionRate: PropTypes.number,
        isFetching: PropTypes.bool,
        conversionLastUpdate: PropTypes.object
    };

    onMainPress() {
        this.props.navigation.navigate('CurrencyList', {title: 'Main Currency'})
    }

    onQuotePress() {
        this.props.navigation.navigate('CurrencyList', {title: 'Quote Currency'})
    }

    onType(value) {
        value = isNaN(value) ? 1 : value;
        this.props.dispatch(currencyValueChange(value || 1));
    }

    onReverse() {
       this.props.dispatch(currencySwap());
    }

    onOptions() {
        this.props.navigation.navigate('Options')
    }

    render() {
        let quotePrice = (this.props.amount * this.props.conversionRate).toFixed(2);
        if (this.props.isFetching) {
            quotePrice = '...'
        }

        return(
            <Container>
                <StatusBar translucent={false} barStyle='light-content' />
                <Header
                    onPress={() => this.onOptions()}
                />
                <KeyboardAvoidingView behavior='padding' style={{alignItems: 'center'}}>
                    <Logo />
                    <InputWithButton
                        buttonText={this.props.baseCurrency}
                        editable={true}
                        onPress={() => this.onMainPress()}
                        defaultValue={this.props.amount.toString()}
                        keyboardType='numeric'
                        onChangeText={(text) => this.onType(text)}
                    />
                    <InputWithButton
                        buttonText={this.props.quoteCurrency}
                        editable={false}
                        onPress={() => this.onQuotePress()}
                        value={quotePrice}
                    />
                    <SmallText
                        main={this.props.baseCurrency}
                        quote={this.props.quoteCurrency}
                        date={this.props.conversionLastUpdate}
                        conversionValue={this.props.conversionRate}
                    />
                    <ButtonSwitch
                        onPress={() => this.onReverse()}
                        text='Reverse Currencies'  />
                </KeyboardAvoidingView>
            </Container>
        )
    }
}

const mapSateToProps = (state) => {
    const baseCurrency = state.currencies.baseCurrency;
    const quoteCurrency = state.currencies.quoteCurrency;

    const conversionSelector = state.currencies.conversions[baseCurrency] || {};
    const rates = conversionSelector.rates || {};

    return {
        baseCurrency,
        quoteCurrency,
        amount: state.currencies.amount,
        conversionRate: rates[quoteCurrency] || 0,
        isFetching: conversionSelector.isFetching,
        conversionLastUpdate: conversionSelector.date ? new Date(conversionSelector.date) : new Date()
    }
};

export default connect(mapSateToProps)(Home);