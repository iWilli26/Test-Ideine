import React, { useEffect, useState } from "react";
import "./TreeNode.css";
import { TreeNodeType } from "../models/TreeNodeType";

function TreeNode(props: {
    node: TreeNodeType;
    onUpdateNode: (id: string, updates: Partial<TreeNodeType>) => void;
}) {
    const [expanded, setExpanded] = useState(false);
    const hasChildren = props.node.children.length > 0;

    const [read, setRead] = useState(props.node.read);
    const [write, setWrite] = useState(props.node.write);

    useEffect(() => {
        setWrite(props.node.write);
        setRead(props.node.read);
    }, [props.node.read, props.node.write]);

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
                    <input
                        type="checkbox"
                        checked={read}
                        onChange={(e) => {
                            props.onUpdateNode(props.node.id, { read: !read });
                        }}
                    />
                </div>
                <div className="TreeNodeCheckbox">
                    <input
                        type="checkbox"
                        checked={write}
                        onChange={(e) => {
                            props.onUpdateNode(props.node.id, {
                                write: !write,
                            });
                        }}
                    />
                </div>
            </div>
            <div className="TreeNodeChildren">
                {hasChildren &&
                    expanded &&
                    props.node.children.map((child) => (
                        <TreeNode
                            key={child.id}
                            node={child}
                            onUpdateNode={props.onUpdateNode}
                        />
                    ))}
            </div>
        </div>
    );
}

export default TreeNode;
