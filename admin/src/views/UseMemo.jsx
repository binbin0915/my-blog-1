import React, { Fragment } from 'react'
import TopNav from '@/components/TopNav'

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            count: 0
        }


    }
    static getDerivedStateFromProps (props, state) {
        console.log(props, state)
    }
    componentDidMount () {
        var obj = {
            d: 10,
            abc: {
                d: 32
            }
        }
        var res = obj?.abc?.d || 90;
        console.log(res)
    }

    clear () {
        this.setState({
            count: 0
        })
    }
    render () {
        const { history, query, $env } = this.props;
        return (
            <Fragment>
                <TopNav title={'classDemo页'} />

                <img style={{ width: '140px' }} src={require('@/assets/img/logo.svg')} alt="" />

                <div>
                    <button onClick={() => {
                        this.setState((pre) => {
                            return pre.count++
                        })
                    }}>+</button>
                    <button onClick={() => {
                        this.setState({
                            count: this.state.count - 1
                        })
                    }}>-</button>
                    <button onClick={() => {
                        this.clear()
                    }}>clear</button>
                    <br />
                    count:{this.state.count}

                    <br />
                    <br />
                    <br />
                    <button onClick={() => {
                        history.goBack()
                    }}>goBack</button>
                </div>
                <hr />
                <div>
                    获取url参数：
                    {
                        JSON.stringify(query)
                    }
                </div>
                <div> runEnv:{$env.runEnv} </div>
                <div> runEnv:{process.env.REACT_APP_RUN_ENV} </div>
                <div>{process.env.REACT_APP_BASE_URL}</div>

            </Fragment>

        )
    }
}



export default Home;
