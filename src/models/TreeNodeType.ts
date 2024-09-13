export type TreeNodeType = {
    id: string;
    type: string;
    external_reference: string;
    name: string;
    model_code: string;
    parent: string;
    children: TreeNodeType[];
};
