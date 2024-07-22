import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpoG1RoutingModule } from './spo-g1-routing.module';
import { SessionPrepComponent } from './session-prep/session-prep.component';
import { ChronometreComponent } from './chronometre/chronometre.component';
import {FormsModule} from "@angular/forms";
import { FibunaciCardsComponent } from './fibunaci-cards/fibunaci-cards.component';



import { VotesComponent } from './votes/votes.component';
import { ForumComponent } from './forum/forum.component';
import { CreategameComponent } from './creategame/creategame.component';

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


@NgModule({
  declarations: [
    VotesComponent,

    ProjectsComponent,
    UserstoriesComponent,
    AddprojectComponent,
    ConfirmationDialogComponent,
    IssuesComponent,
    UpdateprojectComponent,
    AddissueComponent,
    UpdateissueComponent,
    UpdatewhatifComponent,
    SessionPrepComponent,
    ChronometreComponent,
    FibunaciCardsComponent,
    ForumComponent,
    CreategameComponent,
    AddTutowhyComponent,
    TutowhatComponent,
    TutowhyComponent,
    AddTutowhyComponent,
<<<<<<< Updated upstream
    UpdateTutowhyComponent,
    PokerPlanningComponent
=======
        UpdateTutowhyComponent,
        DeleteTutowhyComponent,
        CreategameComponent,
        ForumComponent,
        UpdatewhatifComponent,
        SessionPrepComponent,
      
    
    
>>>>>>> Stashed changes
  ],
  imports: [
    FormsModule,
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
