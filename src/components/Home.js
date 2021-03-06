import React from 'react'
import styled, { ThemeProvider } from "styled-components"
import theme from "./theme.js"

import PropTypes from 'prop-types'
import IconC3po from './Icons/IconC3po.js'
import IconVader from './Icons/IconVader.js'
import IconBb8 from './Icons/IconBb8.js'
import IconFett from './Icons/IconFett.js'
import Characters from './Characters.js'
import Tabs from './Tabs.js'

import axios from 'axios'

const TabContent = styled.div`
    background-color: transparent;
    margin: 0 auto;
`

const Spacer = styled.p`
    line-height: 2em;
    margin-bottom: 2em;
    display: inline-block;
    color: ${ props => props.dark ? props.theme.colors.panelColorDark : props.theme.colors.panelColor };
`

class Home extends React.Component {
    // not totally required for this class
    static propTypes = {
        currentTab: PropTypes.number,
        width: PropTypes.number,
        goMobile: PropTypes.bool,
        tabText: PropTypes.string,
        characters: PropTypes.array
    }

    static defaultProps = {
        currentTab: 1,
        width: window.innerWidth,
        goMobile: false,
        tabText: '',
        characters: []
    }

    state = {
        currentTab: this.props.currentTab || 1
    }

    componentDidMount () {
        axios.get('data.json')
            .then(res => {
                this.setState({
                    characters: res.data
                })
            })
            .catch(function (error) {
                console.log("The Axios call returned this error: " + error)
            })
    }

    changeTab = tab => {
        this.setState({ currentTab: tab.id })
    }

    render () {

        const items = this.state.characters;

        return (
            <ThemeProvider theme={theme}>
                <div className='c_tabsSwitcher'>
                    <Tabs
                        currentTab={this.state.currentTab}
                        changeTab={this.changeTab}
                        data={items}
                        className={this.state.goMobile ? 'nav--is-hidden' : ''}
                    />
                    <TabContent>
                        {!this.state.goMobile
                            ? <Characters
                                data={items}
                                currentTab={this.state.currentTab}
                            />
                            : <span>
                                <IconC3po />
                                <IconVader />
                                <IconBb8 />
                                <IconFett />
                            </span>}
                    </TabContent>

                    <Spacer>Default Theme</Spacer>

                    <Tabs
                        currentTab={this.state.currentTab}
                        changeTab={this.changeTab}
                        data={items}
                        dark
                        className={this.state.goMobile ? 'nav--is-hidden' : ''}
                    />
                    <TabContent>
                        {!this.state.goMobile
                            ? <Characters
                                dark
                                data={items}
                                currentTab={this.state.currentTab}
                            />
                            : <span>
                                <IconC3po />
                                <IconVader />
                                <IconBb8 />
                                <IconFett />
                            </span>}
                    </TabContent>

                    <Spacer dark>Dark Theme</Spacer>
                </div>
            </ThemeProvider>
        )
    }
}

export default Home
