/**
 * Created by luoop on 16-7-9.
 */
import React, {Component} from 'react';
import call from '../api'
import {store} from '../app'
import {setTitle} from '../action/navigation'

import {Card,
    CardText,
    CardHeader} from 'material-ui/Card';
import TextField from 'material-ui/TextField'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import Avatar from 'material-ui/Avatar'

const styles = {
    radioButton: {
        marginBottom: 16,
    }
}

class Setting extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            hasData: false,
        }
    }
    
    getUseMsg() {
        call("userMsg",
            {ID:"userID"},
            (data, err) => {
                if(data !==null) {
                    this.userMsg=data;
                    console.log("userMsg:   ", this.userMsg);
                    this.setState({hasData:true})
                }
            }
        )
    }

    componentWillMount() {
        this.getUseMsg();
        store.dispatch(setTitle('设置'));
    }

    render() {
        if(this.state.hasData) {
            return (
                <Card>
                    <CardHeader title="我的信息" />
                    <CardText>
                        <Avatar src="puu.sh/pWwS3/53b5dc7269.png" />： <TextField defaultValue={this.userMsg.name} />
                    </CardText>
                    <CardText>
                        性别：
                        <RadioButtonGroup  defaultSelected="light">
                            <RadioButton value="light" label="男" style={styles.radioButton} />
                            <RadioButton value="not_light" label="女" style={styles.radioButton}/>
                        </RadioButtonGroup>
                    </CardText>
                    <CardText>
                        收货地址：<TextField defaultValue={this.userMsg.收货地址} />
                    </CardText>
                    <CardText>
                        电话：<TextField defaultValue={this.userMsg.电话} />
                    </CardText>
                    <CardText>
                        邮箱：<TextField defaultValue={this.userMsg.邮箱} />
                    </CardText>
                </Card>
            );
        }
        else {
            return <p>加载数据</p>;
        }
    }
}

export default Setting;