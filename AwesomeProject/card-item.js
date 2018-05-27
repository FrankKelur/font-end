import React, {Component} from 'react'
import {View, Text, TextInput, StyleSheet} from 'react-native'

export default class CardItem extends Component {
    render () {
        return <View>
            <View>
                <Text style={styles.title}>{this.props.item.title}</Text>
            </View>
            <View style={styles.cardContent}>
                <Text>{this.props.item.desc}</Text>
            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        height: 32,
//        boxShadow: '0 2px 2px gray'
    },
    cardContent: {
//        boxShadow: '0 2px 2px gray'
    }
})