import {Component, Input, OnInit, SimpleChanges} from "@angular/core";
import {getRandomColor, hashCode} from "./utilities";

@Component({
  selector: "ngx-boring-avatar-ring",
  template: `
    <svg
        [attr.viewBox]="'0 0 ' + size + ' ' + size"
        fill="none"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        [attr.width]="width"
        [attr.height]="width"
    >
      <title>{{ name }}</title>
      <mask
        [id]="'mask__ring_' + size + '_' + square"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        [attr.width]="size"
        [attr.height]="size"
      >
        <rect [attr.width]="size" [attr.height]="size" [attr.rx]="square == undefined ? size * 2 : square" fill="#fff"></rect>
      </mask>
      <g [attr.mask]="'url(#mask__ring_' + size + '_' + square + ')'">
        <path d="M0 0h90v45H0z" [attr.fill]="properties[0]" />
        <path d="M0 45h90v45H0z" [attr.fill]="properties[1]" />
        <path d="M83 45a38 38 0 00-76 0h76z" [attr.fill]="properties[2]" />
        <path d="M83 45a38 38 0 01-76 0h76z" [attr.fill]="properties[3]" />
        <path d="M77 45a32 32 0 10-64 0h64z" [attr.fill]="properties[4]" />
        <path d="M77 45a32 32 0 11-64 0h64z" [attr.fill]="properties[5]" />
        <path d="M71 45a26 26 0 00-52 0h52z" [attr.fill]="properties[6]" />
        <path d="M71 45a26 26 0 01-52 0h52z" [attr.fill]="properties[7]" />
        <circle cx="45" cy="45" r="23" [attr.fill]="properties[8]" />
      </g>
    </svg>
  `,
  styles: [
  ]
})
export class BoringAvatarRingComponent implements OnInit {
  @Input() name: string = "Default";
  @Input() size: number = 90;
  @Input() elements: number = 5;
  @Input() width: number = 80;
  @Input() square: number | undefined;
  @Input() colors: string[] = ["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"];

  properties: string[] = [];

  generateColors(name: string, colors: string[]): string[] {
    const numFromName = hashCode(name);
    const range = colors && colors.length;
    const colorsShuffle = Array.from({ length: this.elements }, (_, i) =>
      getRandomColor(numFromName + i, colors, range),
    );
    const colorsList = [];
    colorsList[0] = colorsShuffle[0];
    colorsList[1] = colorsShuffle[1];
    colorsList[2] = colorsShuffle[1];
    colorsList[3] = colorsShuffle[2];
    colorsList[4] = colorsShuffle[2];
    colorsList[5] = colorsShuffle[3];
    colorsList[6] = colorsShuffle[3];
    colorsList[7] = colorsShuffle[0];
    colorsList[8] = colorsShuffle[4];

    return colorsList;
  }

  ngOnInit(): void {
    this.properties = this.generateColors(this.name, this.colors);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["name"].currentValue !== changes["name"].previousValue
      || changes["colors"].currentValue !== changes["colors"].previousValue) {
      this.properties = this.generateColors(this.name, this.colors);
    }
  }
}
