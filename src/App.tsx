import React from "react";
import "./App.css";
import data from "./Sectorisation.json";
import { TreeRoot } from "./models/TreeRoot";
import TreeNode from "./components/TreeNode";

function App() {
    const jsonData: TreeRoot = JSON.parse(JSON.stringify(data));

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
            {jsonData.data.roots.map((root) => {
                return <TreeNode key={root.id} props={root}></TreeNode>;
            })}
        </div>
    );
}

export default App;
