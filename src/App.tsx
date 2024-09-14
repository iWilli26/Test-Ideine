import React, { useEffect } from "react";
import "./App.css";
import data from "./Sectorisation.json";
import { TreeRoot } from "./models/TreeRoot";
import TreeNode from "./components/TreeNode";
import { TreeNodeType } from "./models/TreeNodeType";

function App() {
    const jsonData: TreeRoot = JSON.parse(JSON.stringify(data));
    const init = (node: TreeNodeType) => {
        node.read = false;
        node.write = false;
        node.children.forEach((child) => {
            init(child);
        });
    };

    init(jsonData.data.roots[0]);

    const [treeData, setTreeData] = React.useState(jsonData);

    const findParent = (
        data: TreeRoot,
        nodeId: string
    ): TreeNodeType | null => {
        let parent = null;
        const traverse = (
            node: TreeNodeType,
            parentNode: TreeNodeType | null = null
        ) => {
            if (node.id === nodeId) {
                parent = parentNode;
                return;
            }
            node.children.forEach((child) => {
                traverse(child, node);
            });
        };
        data.data.roots.forEach((root) => {
            traverse(root);
        });
        return parent;
    };

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
        const parent = findParent(treeData, node.id);
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
                setAllChildren(node, "read", updates.read as boolean);
                setAllChildren(node, "write", updates.write as boolean);
                updateParent(node);
            } else {
                node.children.forEach(update);
            }
        };
        update(treeData.data.roots[0]);
        setTreeData({ ...treeData });
    };

    return (
        <div className="App">
            <h1>Test Idéine</h1>
            <div className="TreeNodeRow">
                <div className="TreeNodeName"></div>
                <div className="TreeNodeCheckbox">Read</div>
                <div className="TreeNodeCheckbox">Write</div>
            </div>
            {treeData.data.roots.map((root) => {
                return (
                    <TreeNode
                        key={root.id}
                        node={root}
                        onUpdateNode={updateNode}
                    ></TreeNode>
                );
            })}
        </div>
    );
}

export default App;
