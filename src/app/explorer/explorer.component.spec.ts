import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExplorerComponent } from './explorer.component';
import { ExplorerService } from '../shared/services/explorer/explorer.service';
import { of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

describe('ExplorerComponent', () => {
  let component: ExplorerComponent;
  let fixture: ComponentFixture<ExplorerComponent>;
  let explorerService: jasmine.SpyObj<ExplorerService>;

  const mockRootData = [
    { id: '1', name: 'Folder 1', isFolder: true },
    { id: '2', name: 'File 1', isFolder: false }
  ];

  const mockChildData = [
    { id: '3', name: 'Subfolder 1', isFolder: true },
    { id: '4', name: 'File 2', isFolder: false }
  ];

  beforeEach(async () => {
    explorerService = jasmine.createSpyObj('ExplorerService', ['getNodes']);
    explorerService.getNodes.and.returnValue(of(mockRootData));

    await TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        ExplorerComponent
      ],
      providers: [
        { provide: ExplorerService, useValue: explorerService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load root data on init', () => {
    expect(explorerService.getNodes).toHaveBeenCalledWith('root');
    expect(component.treeData).toEqual(mockRootData);
  });


  it('should toggle expansion when folder already has children', () => {
    const folderNode = {
      id: '1',
      name: 'Folder',
      isFolder: true,
      children: mockChildData,
      expanded: true
    };

    component.toggleNode(folderNode);

    expect(explorerService.getNodes).not.toHaveBeenCalledWith(folderNode.id);
    expect(folderNode.expanded).toBeFalse();
  });

  it('should handle multiple toggles of the same folder', () => {
    const folderNode = {
      id: '1',
      name: 'Folder',
      isFolder: true,
      children: mockChildData,
      expanded: false
    };

    component.toggleNode(folderNode);
    expect(folderNode.expanded).toBeTrue();

    component.toggleNode(folderNode);
    expect(folderNode.expanded).toBeFalse();

    component.toggleNode(folderNode);
    expect(folderNode.expanded).toBeTrue();

    expect(explorerService.getNodes).toHaveBeenCalledTimes(1);
  });

});