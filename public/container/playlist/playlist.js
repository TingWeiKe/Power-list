import React, { Component } from 'react'
import { Search, Grid, Header, Segment, Image } from 'semantic-ui-react'
import Feature from './feature/feature'
import HotBoard from './hotBoard/hotboard'
import Category from './category/category'
export default class playlist extends Component {

    render() {
        return (
            <div className="header">
                <h1>歌單</h1>
                <Search open={false}></Search>
                <Feature/>
                <h2>排行榜</h2>
                <HotBoard/>
                <h2>歌單分類</h2>
                <Category/>
            </div>
        )
    }
}
