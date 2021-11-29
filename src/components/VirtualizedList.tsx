import React from 'react'
import AutoSizer from 'react-virtualized/dist/es/AutoSizer'
import List from 'react-virtualized/dist/es/List'

export interface ListProps {
    /**
     * 列表数据
     */
    rows: any[];
    /**
     * 行高
     */
    rowHeight: number;
    /**
     * 行渲染
     * @param data
     * @param row {RowInfo}
     */
    rowRenderer: RowRenderer;
}

export type RowRenderer = (data: any, row: RowInfo) => JSX.Element;

export interface RowInfo {
    /**
     * 行索引
     */
    index: number;
    /**
     * 是否在滚动
     */
    isScrolling: boolean;
    /**
     * 行是否可见
     */
    isVisible: boolean;
}

export interface ListRef {
    /**
     * 滚动到指定行
     * @param index
     */
    scrollToIndex: (index: number) => void;
}

export default class VirtualizedList extends React.PureComponent<ListProps> implements ListRef {
    listRef = React.createRef<List>();

    /**
     * 滚动到指定行
     * @param index
     */
    public scrollToIndex = (index: number) => {
        const list = this.listRef.current;
        if (list) {
            list.scrollToRow(index);
        }
    }

    render() {
        const { rows, rowHeight, rowRenderer } = this.props;

        return (
            <AutoSizer>
                {({ height, width }) => (
                    <List
                        ref={this.listRef}
                        height={height}
                        width={width}
                        rowCount={rows.length}
                        rowHeight={rowHeight}
                        rowRenderer={({ index, key, style, isScrolling, isVisible }) => (
                            <div key={key} style={style}>
                                {rowRenderer(rows[index], { index, isVisible, isScrolling })}
                            </div>
                        )}
                    />
                )}
            </AutoSizer>
        );
    }
}
