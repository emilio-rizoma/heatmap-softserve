import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.scss']
})
export class HeatmapComponent implements OnInit {
  data = [
    [ 10, 25, 50, 20, 22, 23, 33 ],
    [ 25, 134, 50, 25, 100, 98, 110 ],
    [ 500, 300.50, 200, 100, 150, 220, 300  ],
    [ 100, 230, 220, 120, 140, 150, 180 ]
  ];
  min = 0;
  max = 1;

  constructor () {
  }

  ngOnInit(): void {
    // First step: Flatten the data to a one dimention array.
    const flat = this.data.reduce((acc, val) => acc.concat(val), []);

    //  Second step: Extract the min and max value from the flat data.
    this.min = flat.reduce((a, b) => a <= b ? a : b);
    this.max = flat.reduce((a, b) => a >= b ? a : b);
  }

  //  Function for mapping a value from an input interval to an output interval.
  normalizeData(val: number, inMin: number, inMax: number, outMin: number = 0, outMax: number = 1) {
    //  Ratio of the deltas for out & in
    const ratio = (outMax - outMin) / (inMax - inMin);
    // Displacements are needed in order to adjust the result
    // since the lower and upper values could begin in a different place.
    return (val - inMin) * ratio + outMin;  
  }
}
