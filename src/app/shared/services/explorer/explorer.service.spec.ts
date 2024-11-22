import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ExplorerComponent } from 'src/app/explorer/explorer.component';
import { ExplorerService } from './explorer.service';
import { of } from 'rxjs';
import { Node } from '../../models/tree-node.model';
import { MatIconModule } from '@angular/material/icon';

describe('ExplorerComponent', () => {
  let component: ExplorerComponent;
  let fixture: ComponentFixture<ExplorerComponent>;
  let explorerService: jasmine.SpyObj<ExplorerService>;

  const mockRootNodes: Node[] = [
    { id: '1', name: 'Documents', isFolder: true },
    { id: '2', name: 'Images', isFolder: true },
    { id: '3', name: 'readme.txt', isFolder: false }
  ];

  const mockChildNodes: Node[] = [
    { id: '4', name: 'Work', isFolder: true },
    { id: '5', name: 'Personal', isFolder: true }
  ];

  beforeEach(async () => {
    explorerService = jasmine.createSpyObj('ExplorerService', ['getNodes']);
    explorerService.getNodes.and.returnValue(of(mockRootNodes));

    await TestBed.configureTestingModule({
      declarations: [ ExplorerComponent ],
      imports: [
        MatIconModule,
      ],
      providers: [
        { provide: ExplorerService, useValue: explorerService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load root nodes on init', fakeAsync(() => {
    component.ngOnInit();
    tick(300);

    expect(explorerService.getNodes).toHaveBeenCalledWith('root');
    expect(component.treeData).toEqual(mockRootNodes);
  }));

  it('should load children when expanding a folder for the first time', fakeAsync(() => {
    const folderNode: Node = { id: '1', name: 'Documents', isFolder: true };
    explorerService.getNodes.and.returnValue(of(mockChildNodes));

    component.toggleNode(folderNode);
    tick(300);

    expect(explorerService.getNodes).toHaveBeenCalledWith('1');
  }));
});