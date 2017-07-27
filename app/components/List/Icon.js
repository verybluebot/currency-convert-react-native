import React from 'react';
import { View, Image } from 'react-native';
import styles from './styles';

import PropTypes from 'prop-types';

const Icon = ({ checkmark, visible }) => {
    let iconStyle = [styles.checkmarkIconWrapper];
    if (visible) {
        iconStyle.push(styles.checkmarkVisible);
    }
    return (
        <View style={iconStyle}>
            {checkmark ? <Image
                style={styles.checkmarkIcon}
                resizeMode='contain'
                source={require('./images/check.png')}
            /> : null}
        </View>
    )
};

Icon.propTypes = {
    checkmark: PropTypes.bool,
    visible: PropTypes.bool
};

export default Icon;
