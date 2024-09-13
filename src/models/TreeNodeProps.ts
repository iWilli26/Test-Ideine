import { TreeNodeType } from "./TreeNodeType";
export type TreeNodeProps = {
    node: TreeNodeType;
    onReadChange: (node: TreeNodeType, checked: boolean) => void;
    onWriteChange: (node: TreeNodeType, checked: boolean) => void;
};
