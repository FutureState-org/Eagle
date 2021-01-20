import { Component, OnInit, Input, OnChanges } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'ws-app-today-event-card',
  templateUrl: './today-event-card.component.html',
  styleUrls: ['./today-event-card.component.scss'],
})
export class TodayEventCardComponent implements OnInit, OnChanges {
  @Input() data?: []
  isLive = true
  eventDetails: any
  eventTitle: any;
  description: any;
  eventDate: any;
  presentersCount: any;
  duration: any;
  identifier: any;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if(this.data != undefined) {
      this.eventDetails = this.data
      this.eventTitle = this.eventDetails.eventName;
      this.description = this.eventDetails.eventName.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
      this.eventDate = this.eventDateFormat(this.eventDetails.eventDate, this.eventDetails.eventDuration)
      console.log(this.eventDate);
      this.presentersCount = (this.eventDetails.eventjoined.includes("---")) ? '' :  this.eventDetails.eventjoined.substr(0,2);
      this.identifier = this.eventDetails.identifier
      this.isLive = this.eventDetails.status
    }
  }

  getDetails() {
    this.router.navigate([`/app/event-hub/home/${this.identifier}`])
  }

  eventDateFormat(date: any, duration: any) {
    let timeArr = date.split(" ");
    let mediumArr = timeArr[1].split(":")
    let mediumStart = (mediumArr[0] >= 12) ? 'pm' : 'am'
    const floor = Math.floor
    const hours = floor(duration / 60)
    const minutes = duration % 60
    const hoursEnd = parseInt(mediumArr[0]) + hours
    const toHours = (hoursEnd < 10) ? '0'+hoursEnd : hoursEnd
    const minutesEnd = parseInt(mediumArr[1]) + minutes
    let mediumEnd = (toHours >= 12) ? 'pm' : 'am'
    
    return `${timeArr[1]} ${mediumStart} - ${toHours}:${minutesEnd} ${mediumEnd}`

  }

}
