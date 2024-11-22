import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExplorerService {
  private mockData: { [key: string]: { id: string; name: string; isFolder: boolean }[] } = {
    root: [
      { id: '1', name: 'Folder 1', isFolder: true },
      { id: '2', name: 'Folder 2', isFolder: true },
      { id: '3', name: 'File 1', isFolder: false },
    ],
    '1': [
      { id: '4', name: 'Subfolder 1', isFolder: true },
      { id: '5', name: 'File 2', isFolder: false },
    ],
    '4': [
      { id: '6', name: 'Subfolder 1.1', isFolder: true },
      { id: '7', name: 'File 3', isFolder: false },
    ],
  };

  fetchData(nodeId: string): Observable<any[]> {
    const data = this.mockData[nodeId] || [];
    return of(data);
  }
}
