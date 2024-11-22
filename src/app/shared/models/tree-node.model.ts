export interface TreeNode {
  id: number,
  name: string,
  hasChildren: boolean;
  children?: TreeNode[];
}