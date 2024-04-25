import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown } from 'antd';
import { useRef } from 'react';
import http from "@/services/axios.ts";
import { useNavigate } from "react-router-dom";

type BasePageResp = {
    totalElements: number;
    content: GithubIssueItem[];
};

type GithubIssueItem = {
    url: string;
    id: number;
    number: number;
    title: string;
    labels: {
        name: string;
        color: string;
    }[];
    state: string;
    comments: number;
    created_at: string;
    updated_at: string;
    closed_at?: string;
};

const columns: ProColumns<GithubIssueItem>[] = [
    {
        dataIndex: 'index',
        valueType: 'indexBorder',
        width: 48,
    },
    {
        title: '标题',
        dataIndex: 'title',
        ellipsis: true,
        tooltip: '标题过长会自动收缩',
        formItemProps: {
            rules: [
                {
                    required: true,
                    message: '此项为必填项',
                },
            ],
        },
    },
    {
        disable: true,
        title: '状态',
        dataIndex: 'status',
        filters: true,
        onFilter: true,
        ellipsis: true,
        valueType: 'select',
        valueEnum: {
            false: {
                text: '未发布',
                status: 'Error',
            },
            true: {
                text: '已发布',
                status: 'Success',
                disabled: true,
            },
        },
    },
    {
        title: '分类',
        dataIndex: 'type[name]',
        ellipsis: true,
    },
    {
        title: '创建时间',
        key: 'showTime',
        dataIndex: 'createTime',
        valueType: 'date',
        sorter: true,
        hideInSearch: true,
    },
    {
        title: '创建时间',
        dataIndex: 'created_at',
        valueType: 'dateRange',
        hideInTable: true,
        search: {
            transform: (value) => {
                return {
                    startTime: value[0],
                    endTime: value[1],
                };
            },
        },
    },
    {
        title: '操作',
        valueType: 'option',
        key: 'option',
        render: (_text, record, _, action) => [
            <a
                key="editable"
                onClick={() => {
                    action?.startEditable?.(record.id);
                }}
            >
                编辑
            </a>,
            <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
                查看
            </a>,
            <TableDropdown
                key="actionGroup"
                onSelect={() => action?.reload()}
                menus={[
                    { key: 'copy', name: '复制' },
                    { key: 'delete', name: '删除' },
                ]}
            />,
        ],
    },
];

export default function Blog() {
    const actionRef = useRef<ActionType>();
    const navigate = useNavigate()
    return (
        <ProTable<GithubIssueItem>
            columns={columns}
            actionRef={actionRef}
            cardBordered
            request={async (params, sort, filter) => {
                console.log(sort, filter);
                const data = await http.get<BasePageResp>('/api/blog/list/page',{ params: params });
                return {
                    data: data.content,
                    // success 请返回 true，
                    // 不然 table 会停止解析数据，即使有数据
                    success: true,
                    // 不传会使用 data 的长度，如果是分页一定要传
                    total: data.totalElements,
                }
            }}
            editable={{
                type: 'multiple',
            }}
            columnsState={{
                persistenceKey: 'pro-table-singe-demos',
                persistenceType: 'localStorage',
                defaultValue: {
                    option: { fixed: 'right', disable: true },
                },
                onChange(value) {
                    console.log('value: ', value);
                },
            }}
            rowKey="id"
            search={{
                labelWidth: 'auto',
            }}
            options={{
                setting: {
                    listsHeight: 400,
                },
            }}
            form={{
                // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
                syncToUrl: (values, type) => {
                    if (type === 'get') {
                        return {
                            ...values,
                            created_at: [ values.startTime, values.endTime ],
                        };
                    }
                    return values;
                },
            }}
            pagination={{
                pageSize: 5,
                onChange: (page) => console.log(page),
            }}
            dateFormatter="string"
            headerTitle="高级表格"
            toolBarRender={() => [
                <Button
                    key="button"
                    icon={<PlusOutlined />}
                    onClick={() => {
                        navigate('/article/blog/add')
                    }}
                    type="primary"
                >
                    新建
                </Button>,
                <Dropdown
                    key="menu"
                    menu={{
                        items: [
                            {
                                label: '1st item',
                                key: '1',
                            },
                            {
                                label: '2nd item',
                                key: '1',
                            },
                            {
                                label: '3rd item',
                                key: '1',
                            },
                        ],
                    }}
                >
                    <Button>
                        <EllipsisOutlined />
                    </Button>
                </Dropdown>,
            ]}
        />
    );
}