import {Component, Input, OnChanges} from '@angular/core';
import {ISession} from '../shared';


@Component({
  selector: 'session-list',
  templateUrl: './session-list.component.html',
})
export class SessionListComponent implements OnChanges {
  @Input()
  sessions: ISession[];
  @Input()
  filterBy: string;
  @Input()
  sortBy: string;

  visibleSessions: ISession[] = [];

  ngOnChanges() {
    if (this.sessions){
      this.filterSessions(this.filterBy);
      this.sortBy === 'name' ? this.visibleSessions.sort(sortByNameAsc) : this.visibleSessions.sort(sortByVotesDesc);
    }
  }

  private filterSessions(filter) {
    if (filter === 'all') {
      this.visibleSessions = this.sessions.slice(0);
    } else {
      this.visibleSessions = this.sessions.filter(session => {
        return session.level.toLocaleLowerCase() === filter;
      });
    }
  }
}

function sortByNameAsc(firstSession: ISession, secondSession: ISession) {
  if (firstSession.name > secondSession.name) { return 1; }
  else if (firstSession.name === secondSession.name) { return 0; }
  else { return -1; }
}

function sortByVotesDesc(firstSession: ISession, secondSession: ISession) {
  return secondSession.voters.length - firstSession.voters.length;
}
