import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-display',
  templateUrl: './post-display.component.html',
  styleUrls: ['./post-display.component.css']
})
export class PostDisplayComponent implements OnInit {

  @Input("data-name") userName: string | undefined;
  @Input("data-title") title: string | undefined;
  @Input("data-time") date:string|undefined;
  @Input("data-message") message: string | undefined;

  following: boolean = false;

  onFollowPressed(){
    this.following = !this.following;
  }


  constructor() { }

  ngOnInit(): void {
  }

}
