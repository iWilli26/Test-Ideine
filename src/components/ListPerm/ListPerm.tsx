import React, { useEffect, useState } from "react";
import { TreeRootType } from "../../models/TreeRootType";
import { TreeNodeType } from "../../models/TreeNodeType";
import "./ListPerm.css";

export default function ListPerm(props: { treeData: TreeRootType }) {
    const [listRead, setListRead] = useState([] as string[]);
    const [listWrite, setListWrite] = useState([] as string[]);

    const init = (node: TreeNodeType) => {
        if (node.read) {
            setListRead((prev) => [...prev, node.id]);
        }
        if (node.write) {
            setListWrite((prev) => [...prev, node.id]);
        }
        node.children.forEach((child) => {
            init(child);
        });
    };

    useEffect(() => {
        setListRead([]);
        setListWrite([]);
        init(props.treeData.data.roots[0]);
    }, [props.treeData]);

    return (
        <div className="lists">
            <div className="readList">
                {listRead.length > 0 && (
                    <div>
                        <h2 className="Title">Read</h2>
                        <ul>
                            {listRead.map((id) => (
                                <li key={id}>{id}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div className="writeList">
                {listWrite.length > 0 && (
                    <div>
                        <h2 className="Title">Write</h2>
                        <ul>
                            {listWrite.map((id) => (
                                <li key={id}>{id}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
