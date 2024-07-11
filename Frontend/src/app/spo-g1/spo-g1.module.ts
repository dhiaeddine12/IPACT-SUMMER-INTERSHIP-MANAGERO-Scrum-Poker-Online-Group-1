import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpoG1RoutingModule } from './spo-g1-routing.module';
import { ProjectsComponent } from './projects/projects.component';
import { UserstoriesComponent } from './userstories/userstories.component';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule, NbSelectModule} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../@theme/theme.module';
import { AddprojectComponent } from './addproject/addproject.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { IssuesComponent } from './issues/issues.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateprojectComponent } from './updateproject/updateproject.component';

@NgModule({
  declarations: [
    ProjectsComponent,
    UserstoriesComponent,
    AddprojectComponent,
    ConfirmationDialogComponent,
    IssuesComponent,
    UpdateprojectComponent,
    
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SpoG1RoutingModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    NbSelectModule,
    ThemeModule,
  ]
})
export class SpoG1Module { }
