import React, { Component } from 'react';
import _ from 'lodash'
import { Button, Dropdown, Radio, Form, List } from 'semantic-ui-react'
import './RightGrid.css';

export default class RightGrid extends Component{

    render() {

        const { conv_addIdx, conv_subIdx, data_idx, chatData_length, 
            conv_changePrev, conv_changeNext, prev_status, next_status, stateOptions,
            conv_changeDataset, chatData, r_type, conv_setRtype,
        } = this.props;

        const downloadTxtFile = (file, name) => {
            var encodedUri = encodeURI(file);
            var element = document.createElement("a");
            element.setAttribute("href", encodedUri);
            element.setAttribute("download", name);
            document.body.appendChild(element);
            element.click();
        }

        const setDone = () => {
            console.log(r_type)
            let csvContent = "data:text/csv;charset=utf-8," + r_type.map(e => e.join(",")).join("\n");
            downloadTxtFile(csvContent, "my_data.csv")
        }
        
        const setNextStatus = () => {
            if (!prev_status){
                conv_changePrev()
            }
            if (data_idx < chatData_length){
                if (chatData_length === data_idx + 1){
                    conv_changeNext()
                }
                conv_addIdx()
            }
        }

        const setPrevStatus = () => {
            if (!next_status){
                conv_changeNext()
            }
            if (0 < data_idx){
                if (data_idx - 1 === 0){
                    conv_changePrev()
                }
                conv_subIdx()
            }
        }

        const changeDataset = (e, data) => {
            conv_changeDataset(data.value)
        }

        const getOptions = (number) =>
            _.times(number, (index) => ({
                key: index,
                text: `${index+1}`,
                value: index,
        }))

        const changeRType = (e, data) => {
            const pair = {
                d_idx: data_idx,
                r_idx: data.value.r_idx,
                type: data.value.type
            }
            conv_setRtype(pair)
        }

        const section = (data_idx+1) + ' / ' + (chatData_length+1)
    
        return (
            <div className="RightGrid">
                <div className="RightTagGrid">
                    <Dropdown
                        placeholder='Select the dataset'
                        selection
                        options={stateOptions}
                        onChange={changeDataset}
                    />
                </div>
                <div className="RightQuestionGrid">
                    <div className="RightSubQuestionGrid">
                        <List>
                            {chatData[data_idx]['negatives'].map(
                                (candidate, i) => (
                                    <div key={i}>
                                        <List.Item>{i+1}. {candidate}</List.Item>
                                        <div style={{height:'1.5vh'}}></div>
                                        <Form>
                                            <Form.Field>
                                            <Radio
                                                label='Random Negative'
                                                name='radioGroup'
                                                value={{r_idx: i, type: 0}}
                                                checked={r_type[data_idx][i] === 0}
                                                onChange={changeRType}
                                            />
                                            </Form.Field>
                                            <Form.Field>
                                            <Radio
                                                label='Hard Negative'
                                                name='radioGroup'
                                                value={{r_idx: i, type: 1}}
                                                checked={r_type[data_idx][i] === 1}
                                                onChange={changeRType}
                                            />
                                            </Form.Field>
                                            <Form.Field>
                                            <Radio
                                                label='False Negative'
                                                name='radioGroup'
                                                value={{r_idx: i, type: 2}}
                                                checked={r_type[data_idx][i] === 2}
                                                onChange={changeRType}
                                            />
                                            </Form.Field>
                                        </Form>
                                    </div>
                                )
                            )}
                        </List>
                    </div>
                </div>
                <div className="RightTextGrid">
                    <span className="RightTag">{section}</span>
                </div>
                <div className="RightButtonGrid">
                    {   prev_status
                            ?   <Button onClick={setPrevStatus} style={{width:'90%', height:'40%', fontSize:'2vh'}} fluid color='red'>PREV</Button>
                            :   <Button disabled onClick={setPrevStatus} style={{width:'90%', height:'40%', fontSize:'2vh'}} fluid color='red'>PREV</Button>
                    }
                    <div style={{height:'5%'}}></div>
                    {   next_status
                            ?   <Button onClick={setNextStatus} style={{width:'90%', height:'40%', fontSize:'2vh'}} fluid color='blue'>NEXT</Button>
                            :   <Button positive onClick={setDone} style={{width:'90%', height:'40%', fontSize:'2vh'}} fluid>DONE</Button>
                    }
                </div>
            </div>
        );
    }
}