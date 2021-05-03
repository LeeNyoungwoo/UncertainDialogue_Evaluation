import React, { Component } from 'react';
import _ from 'lodash'
import { Button, Dropdown, Radio, Form, Label } from 'semantic-ui-react'
import './RightGrid.css';

export default class RightGrid extends Component{

    render() {
        const { conv_addIdx, conv_subIdx, data_idx, chatData_length, mode,
            conv_changePrev, conv_changeNext, prev_status, next_status, stateOptions,
            conv_changeDataset, conv_setMode, modeOptions, chatData, 
            conv_setQ1, conv_setQ2, q1_rating, q2_rating
        } = this.props;

        const downloadTxtFile = (file, name) => {
            const element = document.createElement("a");
            element.href = URL.createObjectURL(file);
            element.download = name;
            document.body.appendChild(element); // Required for this to work in FireFox
            element.click();
        }

        const setDone = () => {
            console.log(q1_rating)
            console.log(q2_rating)
            
            if (mode === 0){
                downloadTxtFile(new Blob([q1_rating.join()], {type: 'text/plain'}), 'q1_results.txt')
            }
            downloadTxtFile(new Blob([q2_rating.join()], {type: 'text/plain'}), 'q2_results.txt')
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

        const changeMode = (e, data) => {
            if (data.value === 0){
                conv_setMode(0)
            } else if (data.value === 1){
                conv_setMode(1)
            }
        }

        const getOptions = (number) =>
            _.times(number, (index) => ({
                key: index,
                text: `${index+1}`,
                value: index,
        }))

        const changeRateQ1 = (e, data) => {
            const pair = {
                idx: data_idx,
                value: data.value
            }
            conv_setQ1(pair)
        }

        const changeRateQ2 = (e, data) => {
            const pair = {
                idx: data_idx,
                value: data.value
            }
            conv_setQ2(pair)
        }

        const section = (data_idx+1) + ' / ' + (chatData_length+1)
    
        return (
            <div className="RightGrid">
                <div className="RightTagGrid">
                    <Dropdown
                        placeholder='Select the mode'
                        selection
                        options={modeOptions}
                        onChange={changeMode}
                    />
                    <div style={{height:'5%'}}></div>
                    <Dropdown
                        placeholder='Select the dataset'
                        selection
                        options={stateOptions}
                        onChange={changeDataset}
                    />
                </div>
                <div className="RightQuestionGrid">
                    { mode === 0
                        ?   <div className="RightSubQuestionGrid" style={{height:"30%"}}>
                                <span>다음 단어들 중 <b style={{color: 'blue'}}>모르는 단어</b>는 몇 개인가요?</span>
                                <div>
                                    {chatData[data_idx]['changed'].map((word_token) => (
                                    <Label key={word_token}>
                                        {word_token}
                                    </Label>
                                    ))}
                                </div>
                                <Dropdown
                                    placeholder='Answer'
                                    compact
                                    selection
                                    options={getOptions(chatData[data_idx]['changed'].length)}
                                    value={q1_rating[data_idx]}
                                    onChange={changeRateQ1}
                                />
                            </div>
                        :   null
                    }
                    <div className="RightSubQuestionGrid" style={{height:"30%"}}>
                        <span>왼쪽 대화에 대해 가장 <b style={{color: 'blue'}}>적절한</b> 답변은 무엇인가요?</span>
                        <Form>
                            <Form.Group grouped>
                                {chatData[data_idx]['candidates'].map(
                                    (content, i) => (
                                        <Form.Field>
                                            <Radio
                                                label={content}
                                                name='radioGroup'
                                                value={i}
                                                checked={q2_rating[data_idx] === i}
                                                onChange={changeRateQ2}
                                            />
                                        </Form.Field>
                                    )
                                )}
                            </Form.Group>
                        </Form>
                    </div>
                </div>
                <div className="RightTextGrid">
                    <span className="RightTag">{section}</span>
                </div>
                <div className="RightButtonGrid">
                    { prev_status
                        ?   <Button onClick={setPrevStatus} style={{width:'90%', height:'40%', fontSize:'2vh'}} fluid color='red'>PREV</Button>
                        :   <Button disabled onClick={setPrevStatus} style={{width:'90%', height:'40%', fontSize:'2vh'}} fluid color='red'>PREV</Button>
                    }
                    <div style={{height:'5%'}}></div>
                    { next_status
                        ?   <Button onClick={setNextStatus} style={{width:'90%', height:'40%', fontSize:'2vh'}} fluid color='blue'>NEXT</Button>
                        :   <Button positive onClick={setDone} style={{width:'90%', height:'40%', fontSize:'2vh'}} fluid>DONE</Button>
                    }
                </div>
            </div>
        );
    }
}