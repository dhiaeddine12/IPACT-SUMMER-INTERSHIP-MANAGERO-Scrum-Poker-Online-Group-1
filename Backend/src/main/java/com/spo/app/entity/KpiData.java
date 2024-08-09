package com.spo.app.entity;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class KpiData {
    private long totalVotes;
    private long totalIssues;
    private long totalSessions;
    private double averageIssuesPerSession;

}
