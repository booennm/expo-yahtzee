import React from 'react';
import { Text, View } from 'react-native';
import styles from '../styles/Style';

export default function Footer() {
    return(
        <View style={styles.footer}>
            <Text style={styles.author}>Author: Enna-Liina Böök</Text>
        </View>
    )
}