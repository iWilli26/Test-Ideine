export type TreeNodeType = {
    depth: number;
    id: string;
    type: string;
    external_reference: string;
    name: string;
    model_code: string;
    parent: TreeNodeType | null;
    read: boolean;
    write: boolean;
    children: TreeNodeType[];
};
