import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Node } from '../../models/tree-node.model';

type ExplorerData = {
  [key: string]: Node[];
}

@Injectable({
  providedIn: 'root'
})
export class ExplorerService {
  private mockData: ExplorerData = {
    'root': [
      { id: '1', name: 'Documents', isFolder: true },
      { id: '2', name: 'Images', isFolder: true },
      { id: '3', name: 'readme.txt', isFolder: false }
    ],
    '1': [
      { id: '4', name: 'Work', isFolder: true },
      { id: '5', name: 'Personal', isFolder: true }
    ],
    '2': [
      { id: '6', name: 'dog.jpg', isFolder: false },
      { id: '7', name: 'ocean.png', isFolder: false }
    ],
    '4': [
      { id: '8', name: 'report.pdf', isFolder: false },
      { id: '9', name: 'notes.txt', isFolder: false }
    ],
    '5': [
      { id: '10', name: 'important-spreadsheet.xlsx', isFolder: false }
    ]
  };

  getNodes(nodeId: string): Observable<Node[]> {
    return of(this.mockData[nodeId] || []).pipe(delay(300)); // Simulate server delay
  }
}