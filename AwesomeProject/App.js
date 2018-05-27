import React, {Component} from 'react'
import {View, ScrollView, Text, TextInput, StyleSheet, SectionList, Button} from 'react-native'
import CardItem from './card-item.js'

const handler = {
    submit () {
        console.log('submit ...')
    }
}

export default class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            keyword: '',
            articleList: [
                {
                    title: '书单',
                    data: [
                        {
                            title: '异类',
                            desc: '一棵参天大树并不仅仅因为它是最优秀的种子，它生长的时候身边没有其他大树夺取它的养分，树苗的时候没有被山羊啃食，张大时候没有被伐木工人砍伐'
                        },
                        {
                            title: '异类',
                            desc: '一棵参天大树并不仅仅因为它是最优秀的种子，它生长的时候身边没有其他大树夺取它的养分，树苗的时候没有被山羊啃食，张大时候没有被伐木工人砍伐'
                        }
                    ]
                }
            ]
        }
    }

    render () {
        return <View style={styles.container}>
            <View style={styles.top}>
                <TextInput style={{height: 40}} placeholder="请输入关键字" onChangeText={text=> this.setState({keyword})}/>
            </View>
            <ScrollView style={styles.center}>
                <SectionList sections={this.state.articleList}
                    renderItem={({item}) => <View><CardItem item={item}></CardItem></View>}
                    keyExtractor={(item,idx)=>('index'+item+idx)}
                    renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                />
            </ScrollView>
            <View style={styles.bottom}>
                <TextInput placeholder="请输入评论" onChangeText={comment=>this.setState({comment})}/>
                <Button onPress={handler.submit} title="提交" accessibilityLabel="提交"/>
            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        flexDirection: 'column'
    },
    top : {
        height: 40
    },
    cardContent : {
        width: 100
    },
    center : {
        flex: 1
    },
    bottom : {
        height: 40
    },
    sectionHeader : {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)'
    }
})