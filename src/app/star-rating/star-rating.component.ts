import {Component, EventEmitter, OnInit, Output, Input} from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnInit {
  faStar = faStar;
  @Input() rating;
  @Output() ratingChanged = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  changeRating(newRating: number): void {
    this.ratingChanged.emit(newRating);
  }

  onHover(event): void {
    // debugger;
  }
}
