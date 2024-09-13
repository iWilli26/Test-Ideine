import React, { useState } from "react";
import "./TreeNode.css";
import { TreeNodeType } from "../models/TreeNodeType";

function TreeNode({ props }: { props: TreeNodeType }) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = props.children.length > 0;
  const [checkedRead, setCheckedRead] = useState(false);
  const [checkedWrite, setCheckedWrite] = useState(false);
  return (
        <div className="TreeNode">
            <div className="TreeNodeRow">
                <div className="TreeNodeExpand" onClick={() => setExpanded(!expanded)}>
                    {hasChildren && (expanded ? "▼" : "▶")}
                </div>
                <div className="TreeNodeName">{props.name}</div>
                <div className="TreeNodeCheckbox">
                    <input type="checkbox"></input>
                </div>
                <div className="TreeNodeCheckbox">
                    <input type="checkbox"></input>
                </div>
            </div>
            <div className="TreeNodeChildren">
                {hasChildren &&
                    expanded &&
                    props.children.map((child) => {
                        return (
                            <TreeNode key={child.id} props={child}></TreeNode>
                        );
                    })}
            </div>
        </div>
    );
}

export default TreeNode;
