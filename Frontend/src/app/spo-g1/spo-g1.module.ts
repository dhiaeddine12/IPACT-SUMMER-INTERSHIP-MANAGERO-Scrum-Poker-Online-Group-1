import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
import { AddissueComponent } from './addissue/addissue.component';
import { UpdateissueComponent } from './updateissue/updateissue.component';
<<<<<<< HEAD
import { LoginComponent } from './login/login.component';
import { WhattutoComponent } from './whattuto/whattuto.component';
import { WhytutoComponent } from './whytuto/whytuto.component';
import { TutowhatComponent } from './tutowhat/tutowhat.component';
import { TutowhyComponent } from './tutowhy/tutowhy.component';

import { AddTutowhyComponent } from './add-tutowhy/add-tutowhy.component';
import { UpdateTutowhyComponent } from './update-tutowhy/update-tutowhy.component';
import { DeleteTutowhyComponent } from './delete-tutowhy/delete-tutowhy.component';
import { CreategameComponent } from './creategame/creategame.component';
import { ForumComponent } from './forum/forum.component';
import { UpdatewhatifComponent } from './updatewhatif/updatewhatif.component';
import { SessionPrepComponent } from './session-prep/session-prep.component';
=======
import { UpdatewhatifComponent } from './updatewhatif/updatewhatif.component';
<<<<<<< Updated upstream
import { AddTutowhyComponent } from './add-tutowhy/add-tutowhy.component';
import {TutowhatComponent} from "./tutowhat/tutowhat.component";
import {TutowhyComponent} from "./tutowhy/tutowhy.component";
import {UpdateTutowhyComponent} from "./update-tutowhy/update-tutowhy.component";
import {PokerPlanningComponent} from "./poker-planning/poker-planning.component";
=======
import { SessionPrepComponent } from './session-prep/session-prep.component';
>>>>>>> Stashed changes
>>>>>>> 9a0e8d7cd80e12fd230a4077d9e5fb9446455c9a


@NgModule({
  declarations: [
    ProjectsComponent,
    UserstoriesComponent,
    AddprojectComponent,
    ConfirmationDialogComponent,
    IssuesComponent,
    UpdateprojectComponent,
    AddissueComponent,
    UpdateissueComponent,
    LoginComponent,
    WhattutoComponent,
    WhytutoComponent,
    TutowhatComponent,
    TutowhyComponent,
   
    AddTutowhyComponent,
<<<<<<< HEAD
=======
<<<<<<< Updated upstream
    UpdateTutowhyComponent,
    PokerPlanningComponent
=======
>>>>>>> 9a0e8d7cd80e12fd230a4077d9e5fb9446455c9a
        UpdateTutowhyComponent,
        DeleteTutowhyComponent,
        CreategameComponent,
        ForumComponent,
        UpdatewhatifComponent,
        SessionPrepComponent,
      
    
    
<<<<<<< HEAD
=======
>>>>>>> Stashed changes
>>>>>>> 9a0e8d7cd80e12fd230a4077d9e5fb9446455c9a
  ],
  exports: [WhytutoComponent , WhattutoComponent ],

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
    FormsModule,
  ]
})
export class SpoG1Module { }
