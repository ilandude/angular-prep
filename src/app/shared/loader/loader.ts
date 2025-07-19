import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: false,
  templateUrl: './loader.html',
  styleUrl: './loader.scss'
})
export class Loader implements OnChanges{
   
   @Input() loading! : boolean;

   ngOnChanges(changes: SimpleChanges): void {
     console.log(this.loading);
   }


}
