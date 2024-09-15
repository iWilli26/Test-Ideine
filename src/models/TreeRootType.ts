import { TreeNodeType } from "./TreeNodeType";

export type TreeRootType = {
    data: {
        roots: TreeNodeType[];
    };
    is_success: Boolean;
    error_code: String;
    error_message: String;
};
