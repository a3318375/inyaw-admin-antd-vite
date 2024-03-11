import { theme } from "antd";
import Item from '@/layout/components/Item'
import React from "react";

export default function List(props: { title: string; style?: React.CSSProperties }) {
    const { token } = theme.useToken();
    return (
        <div
            style={{
                width: '100%',
                ...props.style,
            }}
        >
            <div
                style={{
                    fontSize: 16,
                    color: token.colorTextHeading,
                    lineHeight: '24px',
                    fontWeight: 500,
                    marginBlockEnd: 16,
                }}
            >
                {props.title}
            </div>
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                }}
            >
                {new Array(6).fill(1).map((_, index) => {
                    return <Item key={index}>具体的解决方案-{index}</Item>;
                })}
            </div>
        </div>
    )
}