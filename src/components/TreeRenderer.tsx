/* eslint-disable @typescript-eslint/prefer-optional-chain */
import type { AnyElement, IsLazyNode, LoadData, TreeRendererProps } from './TreeProps';
import type { FlatNode } from './TreeData';
import React, { CSSProperties, useState } from 'react';
import { mergeClasses } from './TreeStyleUtils';
import { updateChildrenNodeState } from './TreeCache';

export interface SelectionProps extends TreeRendererProps {
  handleSelectClick: (node: FlatNode) => void;
}

/**
 * 选择器
 * @param props
 * @constructor
 *
 * 1. 初始化数据
 * 2. cache更新后
 * 3. 重绘后
 *
 */
export const TreeSelection: React.FC<SelectionProps> = (props) => {
  const { handleSelectClick, style, node } = props;
  const { state } = node;
  const { checked, halfChecked } = state;
  const className = mergeClasses('tree-icon', 'selection', {
    none: !checked && !halfChecked,
    half: halfChecked,
    all: checked,
  }, props.className);

  const handleClick = () => {
    const updateState = {
      ...node.state,
      checked: !checked,
      halfChecked: false,
    };
    const updateNode = {
      ...node,
      state: updateState,
    };
    handleSelectClick(updateNode);
  };

  return (
      <span className={ className } style={ style } onClick={ handleClick }>
            { props.children }
        </span>
  );
};

export interface ExpandedProps extends TreeRendererProps {
  handleExpandClick: (node: FlatNode) => void;
  isLazyNode?: IsLazyNode;
  loadData?: LoadData;
}

export const TreeExpanded: React.FC<ExpandedProps> = (props) => {
  const { isLazyNode, loadData, handleExpandClick, style, node } = props;

  const { state, children, index } = node;
  const { expanded } = state;

  const [loading, setLoading] = useState(false);

  const hasChildren = children && children.length > 0;
  const hasLazy = isLazyNode && isLazyNode(node) && loadData;
  const canLoadChildren = hasChildren || hasLazy;

  const className = mergeClasses('tree-icon', 'expanded', {
    close: canLoadChildren && !expanded,
    open: canLoadChildren && expanded,
    loading,
  }, props.className);

  const handleClick = () => {
    if (loading) {
      return;
    }
    if (canLoadChildren) {
      const update: FlatNode = {
        ...node,
        state: {
          ...node.state,
          expanded: !expanded,
        },
      };
      if (hasChildren) {
        handleExpandClick(update);
      } else if (hasLazy && update.state.expanded) {
        setLoading(true);
        loadData(node)
          .then((childList) => {
            update.children = childList
              .map(el => updateChildrenNodeState(el, { checked: update.state.checked })) as any;
            handleExpandClick(update);
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
      }
    }
  };

  return (
      <span data-index={ index } className={ className } style={ style } onClick={ handleClick }>
            { props.children }
        </span>
  );
};

export interface TreeLoadingProps {
  isLoading: boolean;
  className?: string;
  style?: CSSProperties;
}

export const TreeLoading = (props: TreeLoadingProps) => {
  const { isLoading, className, style } = props;
  return (
      <div className={ mergeClasses('tree-loading', { show: isLoading }, className) } style={ style }>
        <div className={ mergeClasses('tree-loading-content') }>
          <h1>Loading</h1>
        </div>
      </div>
  );
};

interface RowInfo {
  isScrolling: boolean;
  isVisible: boolean;
  style: CSSProperties;
  index: number;
  key: string;
  readonly measure: () => void;
  readonly registerChild?: (element?: React.ReactNode) => void;
}

export type TreeRowRenderer = (row: RowInfo) => AnyElement;


