import React from "react";
import "./TreeRoot.css";
import data from "../../Sectorisation.json";
import { TreeRootType } from "../../models/TreeRootType";
import TreeNode from "../TreeNode/TreeNode";
import { TreeNodeType } from "../../models/TreeNodeType";
import ListPerm from "../ListPerm/ListPerm";

function TreeRoot() {
    const jsonData: TreeRootType = JSON.parse(JSON.stringify(data));

    const findParent = (
        data: TreeRootType,
        nodeId: string
    ): TreeNodeType | null => {
        let parent: TreeNodeType | null = null;
        const traverse = (
            node: TreeNodeType,
            parentNode: TreeNodeType | null = null,
            depth: number = 0
        ) => {
            node.depth = depth;
            if (node.id === nodeId && parentNode !== null) {
                parent = parentNode;
                return parent;
            }
            node.children.forEach((child) => {
                traverse(child, node, depth + 1);
            });
        };
        data.data.roots.forEach((root) => {
            traverse(root);
        });
        return parent;
    };

    const init = (node: TreeNodeType) => {
        node.read = node.read ?? false;
        node.write = node.write ?? false;
        node.parent = findParent(jsonData, node.id);
        node.children.forEach((child) => {
            init(child);
        });
    };

    init(jsonData.data.roots[0]);

    const [treeData, setTreeData] = React.useState(jsonData);

    const setAllChildren = (
        node: TreeNodeType,
        type: "read" | "write",
        checked: boolean
    ) => {
        node.children.forEach((child) => {
            child[type] = checked;
            setAllChildren(child, type, checked);
        });
    };

    const updateParent = (node: TreeNodeType) => {
        const parent = node.parent;
        if (parent === null) return;
        let allBrothersRead = true;
        let allBrothersWrite = true;
        parent.children.forEach((child) => {
            if (!child.read) {
                allBrothersRead = false;
            }
            if (!child.write) {
                allBrothersWrite = false;
            }
        });
        parent.read = allBrothersRead;
        parent.write = allBrothersWrite;
        updateParent(parent);
    };

    const updateNode = (id: string, updates: Partial<TreeNodeType>) => {
        const update = (node: TreeNodeType) => {
            if (node.id === id) {
                Object.assign(node, updates);
                if (updates.read !== undefined)
                    setAllChildren(node, "read", updates.read);

                if (updates.write !== undefined)
                    setAllChildren(node, "write", updates.write);
                updateParent(node);
            } else {
                node.children.forEach(update);
            }
        };
        update(treeData.data.roots[0]);
        setTreeData({ ...treeData });
    };

    return (
        <div className="TreeRoot">
            <h1>Test Idéine</h1>
            <table>
                <thead>
                    <tr className="TableRow">
                        <th className="TreeNodeHeader"></th>
                        <th className="TreeNodeHeader">Read</th>
                        <th className="TreeNodeHeader">Write</th>
                    </tr>
                </thead>
                <tbody>
                    {treeData.data.roots.map((root) => {
                        return (
                            <TreeNode
                                key={root.id}
                                node={root}
                                onUpdateNode={updateNode}
                            ></TreeNode>
                        );
                    })}
                </tbody>
            </table>
            <ListPerm treeData={treeData}></ListPerm>
        </div>
    );
}

export default TreeRoot;
