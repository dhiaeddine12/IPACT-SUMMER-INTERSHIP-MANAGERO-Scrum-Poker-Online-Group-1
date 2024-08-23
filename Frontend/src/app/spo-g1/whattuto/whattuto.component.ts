import { Component , OnInit } from '@angular/core';
import { WhattutoService , WhatTuto } from '../services/whattuto/whattuto.service';
@Component({
  selector: 'ngx-whattuto',
  templateUrl: './whattuto.component.html',
  styleUrls: ['./whattuto.component.scss']
})
export class WhattutoComponent {
  whatTutos: WhatTuto[] = [];
  constructor(private whattutoService: WhattutoService) { }

  ngOnInit(): void {
    this.fetchWhattutos();
  }

  fetchWhattutos(): void {
    this.whattutoService.getWhattuto().subscribe(
      (data) => {
        this.whatTutos = data;
      },
      (error) => {
        console.error('Error fetching WhatTutos:', error);
      }
    );
  }

  updateWhatTuto(whatTuto: WhatTuto): void {
    this.whattutoService.updateWhattuto(whatTuto).subscribe(
      (data) => {
        console.log('Updated WhatTuto:', data);
        this.fetchWhattutos(); // Refresh list after update
      },
      (error) => {
        console.error('Error updating WhatTuto:', error);
      }
    );
  }
}
