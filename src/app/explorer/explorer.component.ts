import { Component } from '@angular/core';
import { ExplorerService } from '../shared/services/explorer/explorer.service';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html'
})
export class ExplorerComponent {
  treeData: any[] = [];

  constructor(private explorerService: ExplorerService) {}

  ngOnInit() {
    // Load root level data
    this.explorerService.getNodes('root').subscribe(data => {
      this.treeData = data;
    });
  }

  toggleNode(node: any) {
    if (!node.isFolder) return;
    
    if (!node.children && !node.expanded) {
      // Load children only if they haven't been loaded yet
      this.explorerService.getNodes(node.id).subscribe(data => {
        node.children = data;
        node.expanded = true;
      });
    } else {
      // Toggle if children are already loaded
      node.expanded = !node.expanded;
    }
  }
}