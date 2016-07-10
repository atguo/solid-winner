/**
 * Created by luoop on 16-7-9.
 */
import React, {Component} from 'react';

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
        }
        
    }

    render() {
        return (
            <Card>
                <CardHeader title="我的信息" />
                <CardText>
                    <Avatar src="puu.sh/pWwS3/53b5dc7269.png" />： <TextField defaultValue="luoop" />
                </CardText>
                <CardText>
                    性别：
                    <RadioButtonGroup  defaultSelected="light">
                        <RadioButton value="light" label="男" style={styles.radioButton} />
                        <RadioButton value="not_light" label="女" style={styles.radioButton}/>
                    </RadioButtonGroup>
                </CardText>
                <CardText>
                    收货地址：<TextField defaultValue="北京邮电大学学二3606" />
                </CardText>
                <CardText>
                    电话：<TextField defaultValue="3264654798" />
                </CardText>
                <CardText>
                    邮箱：<TextField defaultValue="asd@asd.com" />
             </CardText>
            </Card>
        );
    }
}

export default Setting;