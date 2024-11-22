import { Component } from '@angular/core';
import { ExplorerService } from '../shared/services/explorer.service';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss'],
})
export class ExplorerComponent {
  treeData: any[] = [];
  loadingNodes: Set<string> = new Set();

  constructor(private explorerService: ExplorerService) {}

  ngOnInit() {
    this.loadData('root');
  }

  loadData(nodeId: string) {
    if (this.loadingNodes.has(nodeId)) return;
    this.loadingNodes.add(nodeId);

    this.explorerService.fetchData(nodeId).subscribe((data) => {
      const parentNode = this.findNode(this.treeData, nodeId);
      if (parentNode) {
        parentNode.children = data;
      } else {
        this.treeData = data;
      }
      this.loadingNodes.delete(nodeId);
    });
  }

  toggleNode(node: any) {
    if (!node.isFolder) return;

    if (node.children) {
      node.expanded = !node.expanded;
    } else {
      node.expanded = true;
      this.loadData(node.id);
    }
  }

  private findNode(tree: any[], id: string): any | null {
    for (const node of tree) {
      if (node.id === id) return node;
      if (node.children) {
        const found = this.findNode(node.children, id);
        if (found) return found;
      }
    }
    return null;
  }
}
