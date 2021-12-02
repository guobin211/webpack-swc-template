import React, { CSSProperties } from 'react';
import AutoSizer from 'react-virtualized/dist/es/AutoSizer';
import CellMeasurer, { CellMeasurerCache } from 'react-virtualized/dist/es/CellMeasurer';
import List, { ListRowRenderer } from 'react-virtualized/dist/es/List';
import type { TreeProps, TreeRef, TreeState } from './TreeProps';
import type { FlatNode } from './TreeData';
import { TreeCache } from './TreeCache';
import { mergeClasses } from './TreeStyleUtils';
import { CustomNodeRenderer, TreeRowRenderer, TreeExpanded, TreeLoading, TreeSelection } from './TreeRenderer';

export default class VirtualizedTree extends React.Component<TreeProps, TreeState> implements TreeRef {

    cache: TreeCache;
    cellCache = new CellMeasurerCache({
        fixedWidth: true,
        minHeight: 30
    });
    listRef = React.createRef<List>();

    constructor(props: TreeProps) {
        super(props);
        this.cache = new TreeCache(props.treeData);
        this.state = {
            pathInfoList: this.cache.pathInfos,
            isLoading: true,
            selectedNodes: []
        };
    }

    handleSelectClick = (updateNode: FlatNode) => {
        this.cache.updateNodeSelection(updateNode);
        this.listRef.current && this.listRef.current.forceUpdateGrid();
    };

    handleExpandClick = (updateNode: FlatNode) => {
        const {index} = updateNode;
        const pathInfoList = this.cache.updateNodeExpanded(updateNode, index);
        this.setState(Object.assign({}, this.state, {pathInfoList}));
    };

    renderNodeContent: CustomNodeRenderer = (withNode) => {
        const {showNodeLoading} = this.props;
        const {node, isScrolling} = withNode;
        if (isScrolling && showNodeLoading) {
            return (
                <span>Loading</span>
            );
        }
        return (
            <span>{node.id}</span>
        );
    };

    renderSelection: CustomNodeRenderer = (withNode) => {
        return (
            <TreeSelection {...withNode} handleSelectClick={this.handleSelectClick}/>
        );
    };

    renderExpanded: CustomNodeRenderer = (withNode) => {
        const {node: {depth}} = withNode;
        const {isLazyNode, loadData} = this.props;
        const style: CSSProperties = {
            ...withNode.style,
            marginLeft: depth * 20
        };
        return (
            <TreeExpanded {...withNode}
                          isLazyNode={isLazyNode}
                          loadData={loadData}
                          style={style}
                          handleExpandClick={this.handleExpandClick}/>
        );
    };

    renderNode: CustomNodeRenderer = (withNode) => {
        return (
            <>
                {this.renderSelection(withNode)}
                {this.renderExpanded(withNode)}
                {this.renderNodeContent(withNode)}
            </>
        );
    };

    cellRenderer: TreeRowRenderer = (row) => {
        const {className} = this.props;
        const {style, index, isScrolling, isVisible} = row;
        const flatNode = this.cache.getNodeByPathIndex(index);
        const withNode = {
            className,
            isScrolling,
            isVisible,
            node: flatNode
        };
        return (
            <div className={mergeClasses('tree-row', className)} style={style}>
                <div className={mergeClasses('tree-node', className)} style={{height: style.height}}>
                    {
                        this.renderNode(withNode)
                    }
                </div>
            </div>
        );
    };

    rowRenderer: ListRowRenderer = (row) => {
        const {key, index, parent, style, isScrolling, isVisible} = row;
        return (
            <CellMeasurer cache={this.cellCache}
                          columnIndex={0}
                          key={key}
                          rowIndex={index}
                          parent={parent}
                          children={cell => this.cellRenderer({
                              ...cell,
                              isVisible,
                              isScrolling,
                              style,
                              index,
                              key
                          })}/>
        );
    };

    render() {
        const {className, treeHeight} = this.props;
        const parentStyle: CSSProperties = {
            height: treeHeight,
            position: 'relative'
        };
        const {pathInfoList, isLoading} = this.state;
        return (
            <div className={mergeClasses(className)} style={parentStyle}>
                <AutoSizer>
                    {({height, width: autoWidth}) => (
                        <List
                            deferredMeasurementCache={this.cellCache}
                            ref={this.listRef}
                            height={height}
                            rowCount={pathInfoList.length}
                            rowHeight={this.cellCache.rowHeight}
                            rowRenderer={this.rowRenderer}
                            width={autoWidth}
                        />
                    )}
                </AutoSizer>
                <TreeLoading isLoading={isLoading} className={className}/>
            </div>
        );
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            isLoading: false
        });
    }

    componentWillUnmount() {
        this.cache.destroy();
    }
}
