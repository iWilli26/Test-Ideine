import React, { useEffect, useState } from "react";
import "./TreeNode.css";
import { TreeNodeType } from "../../models/TreeNodeType";

function TreeNode(props: {
    node: TreeNodeType;
    onUpdateNode: (id: string, updates: Partial<TreeNodeType>) => void;
}) {
    const node = props.node;
    const [expanded, setExpanded] = useState(false);
    const hasChildren = node.children.length > 0;
    const [read, setRead] = useState(node.read);
    const [write, setWrite] = useState(node.write);

    useEffect(() => {
        setWrite(node.write);
        setRead(node.read);
    }, [node.read, node.write]);

    return (
        <>
            <tr className="TreeNodeRow">
                <td className="TreeNodeCell">
                    <span
                        className="TreeNodeExpand"
                        onClick={() => setExpanded(!expanded)}
                    >
                        {Array(node.depth)
                            .fill(null)
                            .map((_, index) => (
                                <span
                                    key={index}
                                    style={{
                                        display: "inline-block",
                                        width: "1rem",
                                    }}
                                ></span>
                            ))}
                        {hasChildren && (expanded ? "▼" : "▶")}
                    </span>
                    <span className="TreeNodeName">{node.name}</span>
                </td>

                <td className="TreeNodeCheckbox">
                    <input
                        type="checkbox"
                        checked={read}
                        onChange={(e) => {
                            props.onUpdateNode(node.id, {
                                read: e.target.checked,
                            });
                        }}
                    />
                </td>
                <td className="TreeNodeCheckbox">
                    <input
                        type="checkbox"
                        checked={write}
                        onChange={(e) => {
                            props.onUpdateNode(node.id, {
                                write: e.target.checked,
                            });
                        }}
                    />
                </td>
            </tr>
            {hasChildren &&
                expanded &&
                node.children.map((child) => (
                    <TreeNode
                        key={child.id}
                        node={child}
                        onUpdateNode={props.onUpdateNode}
                    />
                ))}
        </>
    );
}

export default TreeNode;
