import React, { useEffect } from "react";
import "./App.css";
import data from "./Sectorisation.json";
import { TreeRoot } from "./models/TreeRoot";
import TreeNode from "./components/TreeNode";
import { TreeNodeType } from "./models/TreeNodeType";

function App() {
    const jsonData: TreeRoot = JSON.parse(JSON.stringify(data));
    const init = (node:TreeNodeType) => {
        node.read = false;
        node.write = false;
        node.children.forEach((child) => {
            init(child);
        });
    };
    init(jsonData.data.roots[0]);    

    const [treeData, setTreeData] = React.useState(jsonData);

    const updateNode = (id: string, updates: Partial<TreeNodeType>) => {
      const update = (node: TreeNodeType) => {
          if (node.id === id) {
              Object.assign(node, updates);
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
                <div className="TreeNodeCheckbox">
                  Read
                </div>
                <div className="TreeNodeCheckbox">
                  Write
                </div>
            </div>
            {treeData.data.roots.map((root) => {
                return <TreeNode key={root.id} node={root} onUpdateNode={updateNode} ></TreeNode>;
            })}
        </div>
    );
}

export default App;
