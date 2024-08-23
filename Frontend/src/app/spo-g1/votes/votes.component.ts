import { Component, OnInit } from '@angular/core';
import { VotingService } from '../Services/Voting/voting-service.service';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';

@Component({
  selector: 'ngx-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.scss']
})
export class VotesComponent implements OnInit {
  voteStatistics: any;
  issueTitle: string | null = null;
  session_token: string | null = null;
  chartData: any[] = [];
  tableData: any[] = [];  // Nouveau tableau pour les résultats

  constructor(
      private votingService: VotingService,
      private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.session_token = params.get('session_token');
      console.log("session_token", this.session_token);

      if (this.session_token) {
        this.votingService.getAllVoteResults(this.session_token).subscribe(
            data => {
              this.voteStatistics = data;
              console.log("data", data);
              this.prepareChartData();
              this.prepareTableData();
            },
            error => {
              console.error('Error fetching vote statistics', error);
            }
        );
      } else {
        console.error('Missing sessionToken in route parameters');
      }
    });
  }

  prepareTableData(): void {
    this.tableData = [];  // Réinitialiser les données du tableau

    for (const [issue, votes] of Object.entries(this.voteStatistics)) {
      // Convertir les valeurs des votes en chaînes de caractères et les afficher
      const dataValues = Object.entries(votes).map(([key, value]) => `${key}: ${value}`);

      // Calculer la moyenne des votes
      const valueCounts = Object.entries(votes).reduce((acc, [key, value]) => {
        if (acc[key]) {
          acc[key] += value; // Ajouter les occurrences si déjà existantes
        } else {
          acc[key] = value; // Initialiser la première occurrence
        }
        return acc;
      }, {} as Record<string, number>);

      const totalOccurrences = Object.values(valueCounts).reduce((acc, value) => acc + value, 0);
      const weightedSum = Object.entries(votes).reduce((sum, [key, value]) => sum + (parseFloat(key) * value), 0);
      const averageVotes = totalOccurrences > 0 ? weightedSum / totalOccurrences : 0;
      console.log("weightedSum", weightedSum, "///", "totalOccurrences", totalOccurrences, "///averageVotes", averageVotes);

      // Ajouter les données au tableau
      this.tableData.push({
        issue: issue,
        votes: dataValues, // Convertir les valeurs en chaînes de caractères avec leurs clés
        average: averageVotes.toFixed(2) // Ajouter la moyenne arrondie à 2 décimales
      });
    }
  }

  prepareChartData(): void {
    this.chartData = [];
    this.tableData = []; // Réinitialiser les données du tableau

    for (const [issue, votes] of Object.entries(this.voteStatistics)) {
      // Compter les occurrences de chaque valeur
      const valueCounts = Object.entries(votes).reduce((acc, [key, value]) => {
        if (acc[key]) {
          acc[key] += value; // Ajouter les occurrences si déjà existantes
        } else {
          acc[key] = value; // Initialiser la première occurrence
        }
        return acc;
      }, {} as Record<string, number>);

      // Obtenir les données pour le graphique
      const labels = Object.keys(valueCounts);
      const dataValues = Object.values(valueCounts);

      // Créez un identifiant unique pour chaque graphique basé sur l'issue
      const chartId = `chart-${issue.replace(/\s+/g, '-')}`;

      // Préparez les données pour le graphique
      this.chartData.push({
        id: chartId,
        label: issue,
        data: {
          labels: labels, // Valeurs uniques pour les labels du graphique
          datasets: [{
            label: 'Occurrences',
            data: dataValues, // Occurrences des valeurs
            backgroundColor: this.getChartColors(labels.length),
            borderColor: this.getChartColors(labels.length, true),
            borderWidth: 1
          }]
        }
      });

      // Préparez les données pour le tableau
      const tableVotes = Object.entries(votes).map(([key, value]) => `${key}: ${value}`);
      this.tableData.push({
        issue: issue,
        votes: tableVotes, // Convertir les valeurs en chaînes de caractères avec leurs clés
        average: 0 // Valeur par défaut; sera mise à jour dans `prepareTableData`
      });

      // Utilisez setTimeout pour créer les graphiques après que le DOM a été mis à jour
      setTimeout(() => this.createChart(chartId, this.chartData.find(chart => chart.id === chartId)?.data), 0);
    }
  }

  getChartColors(numColors: number, isBorder: boolean = false): string[] {
    const baseColors = [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)'
    ];
    const borderColors = [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)'
    ];

    return baseColors.slice(0, numColors).map((color, index) => {
      if (isBorder) {
        return borderColors[index % borderColors.length];
      }
      return color;
    });
  }

  createChart(chartId: string, chartData: any): void {
    const ctx = (document.getElementById(chartId) as HTMLCanvasElement).getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'pie', // ou 'bar' selon vos préférences
        data: chartData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'top'
            },
            title: {
              display: true,
              text: `Votes for ${chartId.replace('chart-', '').replace(/-/g, ' ')}` // Utilisez le nom de l'issue pour le titre
            }
          }
        }
      });
    } else {
      console.error(`Chart context not available for ${chartId}`);
    }
  }
}
