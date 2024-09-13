import React, { useEffect, useState } from "react";
import "./TreeNode.css";
import { TreeNodeType } from "../models/TreeNodeType";

function TreeNode(props: { node: TreeNodeType, onUpdateNode: (id: string, updates: Partial<TreeNodeType>) => void }) {
    const [expanded, setExpanded] = useState(false);
    const hasChildren = props.node.children.length > 0;

    const [read, setRead] = useState(props.node.read);

    const handleReadChange = () => {
      const newReadState = !read;
      setRead(newReadState);
      props.onUpdateNode(props.node.id, { read: newReadState });
  };

    return (
        <div className="TreeNode">
            <div className="TreeNodeRow">
                <div
                    className="TreeNodeExpand"
                    onClick={() => setExpanded(!expanded)}
                >
                    {hasChildren && (expanded ? "▼" : "▶")}
                </div>
                <div className="TreeNodeName">{props.node.name}</div>
                <div className="TreeNodeCheckbox">
                    <input type="checkbox" checked={read} onChange={handleReadChange} />
                    
                </div>
                <div className="TreeNodeCheckbox">
                    <input type="checkbox" />
                </div>
            </div>
            <div className="TreeNodeChildren">
                {hasChildren &&
                    expanded &&
                    props.node.children.map((child) => (
                        <TreeNode key={child.id} node={child} onUpdateNode={props.onUpdateNode} />
                    ))}
            </div>
        </div>
    );
}

export default TreeNode;
