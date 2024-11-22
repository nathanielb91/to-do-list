import { Component } from '@angular/core';
import { ExplorerService } from '../shared/services/explorer/explorer.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  standalone: true,
  imports: [
    MatIconModule
  ]
})
export class ExplorerComponent {
  treeData: any[] = [];

  constructor(private explorerService: ExplorerService) {}

  ngOnInit() {
    this.explorerService.getNodes('root').subscribe(data => {
      this.treeData = data;
    });
  }

  toggleNode(node: any) {
    if (!node.isFolder) return;
    
    if (!node.children && !node.expanded) {
      this.explorerService.getNodes(node.id).subscribe(data => {
        node.children = data;
        node.expanded = true;
      });
    } else {
      node.expanded = !node.expanded;
    }
  }
}