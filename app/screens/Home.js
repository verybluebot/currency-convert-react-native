import React, { Component } from 'react';
import {
    StatusBar,
    KeyboardAvoidingView,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

import Container from '../components/Container';
import Logo from '../components/Logo';
import { InputWithButton } from '../components/Input';
import { ButtonSwitch } from '../components/Buttons'
import { SmallText } from '../components/Text';
import { Header } from '../components/Header';

const TEMP_MAIN_CURRENCY    = 'USD';
const TEMP_QUOTE_CURRENCY   = 'GBP';
const TEMP_MAIN_VALUE       = '100';
const TEMP_QUOTE_VALUE      = '76.9';
const TEMP_CONVERSION_RATE  = 76.879;
const TEMP_CONVERSION_DATE  = new Date();


EStyleSheet.build({
    $primary: '#4F6D7F',
    $white: '#fff',
    $border: '#E2E2E2',
    $textMain: '#797979',
    $lightGrey: '#F0F0F0',
});

export default class Home extends Component {
    onQuotePress() {

    }

    onMainPress() {

    }

    onType(text) {

    }

    onReverse() {

    }

    onOptions() {

    }

    render() {
        return(
            <Container>
                <StatusBar translucent={false} barStyle='light-content' />
                <Header
                    onPress={() => this.onOptions()}
                />
                <KeyboardAvoidingView behavior='padding' style={{alignItems: 'center'}}>
                    <Logo />
                    <InputWithButton
                        buttonText={TEMP_MAIN_CURRENCY}
                        editable={true}
                        onPress={() => this.onMainPress()}
                        defaultValue={TEMP_MAIN_VALUE}
                        keyboardType='numeric'
                        onChangeText={(text) => this.onType(text)}
                    />
                    <InputWithButton
                        buttonText={TEMP_QUOTE_CURRENCY}
                        editable={false}
                        onPress={() => this.onQuotePress()}
                        value={TEMP_QUOTE_VALUE}
                    />
                    <SmallText
                        main={TEMP_MAIN_CURRENCY}
                        quote={TEMP_QUOTE_CURRENCY}
                        date={TEMP_CONVERSION_DATE}
                        conversionValue={TEMP_CONVERSION_RATE}
                    />
                    <ButtonSwitch
                        onPress={() => this.onReverse()}
                        text='Reverse Currencies'  />
                </KeyboardAvoidingView>
            </Container>
        )
    }
};