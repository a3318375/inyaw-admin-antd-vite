import { useState } from "react";
import {
    ProForm, ProFormSelect, ProFormSwitch,
    ProFormText,
} from '@ant-design/pro-components';
import { Form, message } from 'antd';
import { MdEditor } from "md-editor-rt";
import 'md-editor-rt/lib/style.css';
import http from "@/services/axios.ts";

type SelectType = {
    label: string,
    value: number,
    obj: TagType
};
type TagType = {
    id: number,
    name: string,
};

export default function BlogAdd() {
    const [ text, setText ] = useState('');
    return (
        <ProForm
            title="新建表单"
            onFinish={async (values: any) => {
                console.log(values);
                message.success('提交成功');
                return true;
            }}
        >
            <ProFormText
                width="md"
                name="title"
                label="标题"
                tooltip="最长为 24 位"
                placeholder="请输入名称"
            />

            <ProFormText
                width="md"
                name="summary"
                label="摘要"
                placeholder="请输入名称"
            />
            <ProForm.Group>
                <ProFormSelect
                    options={[
                        {
                            value: 'chapter',
                            label: '盖章后生效',
                        },
                    ]}
                    width="md"
                    name="typeList"
                    label='分类'
                    request={async () => {
                        const tags = await http.get<TagType[]>('/api/type/list');
                        const tagResp: SelectType[] = []
                        tags.forEach((tag: TagType) => {
                            const obj = {
                                label: tag.name,
                                value: tag.id,
                                obj: tag,
                            }
                            obj.label = tag.name;
                            obj.value = tag.id;
                            obj.obj = tag;
                            tagResp.push(obj);
                        })
                        return tagResp;
                    }}
                />
                <ProFormSelect
                    width="md"
                    name="tagList"
                    label='标签'
                    mode='multiple'
                    request={async () => {
                        const tags = await http.get<TagType[]>('/api/tag/list');
                        const tagResp: SelectType[] = []
                        tags.forEach((tag: TagType) => {
                            const obj = {
                                label: tag.name,
                                value: tag.id,
                                obj: tag,
                            }
                            obj.label = tag.name;
                            obj.value = tag.id;
                            obj.obj = tag;
                            tagResp.push(obj);
                        })
                        return tagResp;
                    }}
                />
            </ProForm.Group>
            <ProForm.Group>
                <ProFormSwitch name="status" label="是否发布"/>
                <ProFormSwitch name="isHot" label="是否热门"/>
                <ProFormSwitch name="isComment" label="是否开启评论"/>
            </ProForm.Group>
            <Form.Item name={[ "article", "context" ]} label="正文" valuePropName={text}>
                <MdEditor modelValue={text} onChange={setText}/>
            </Form.Item>
        </ProForm>
    );
}