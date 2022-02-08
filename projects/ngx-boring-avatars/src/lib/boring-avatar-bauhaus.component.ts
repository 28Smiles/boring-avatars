import {Component, Input, OnInit} from '@angular/core';
import {getBoolean, getRandomColor, getUnit, hashCode} from "./utilities";

interface BauhausAvatar {
  color: string,
  translateX: number,
  translateY: number,
  rotate: number,
  isSquare: boolean
}

@Component({
  selector: "ngx-boring-avatar-bauhaus",
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
        [id]="'mask__bauhaus_' + size + '_' + square"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        [attr.width]="size"
        [attr.height]="size"
      >
        <rect [attr.width]="size" [attr.height]="size" [attr.rx]="square == undefined ? size * 2 : square" fill="#fff"></rect>
      </mask>
      <g [attr.mask]="'url(#mask__bauhaus_' + size + '_' + square + ')'">
        <rect [attr.width]="size" [attr.height]="size" [attr.fill]="properties[0].color"/>
        <rect
          [attr.x]="(size - 60) / 2"
          [attr.y]="(size - 20) / 2"
          [attr.width]="size"
          [attr.height]="properties[1].isSquare ? size : size / 8"
          [attr.fill]="properties[1].color"
          [attr.transform]="'translate(' + properties[1].translateX + ' ' + properties[1].translateY + ') rotate(' + properties[1].rotate + ' ' + (size / 2) + ' ' + (size / 2) + ')'"/>
        <circle
          [attr.cx]="size / 2"
          [attr.cy]="size / 2"
          [attr.fill]="properties[2].color"
          [attr.r]="size / 5"
          [attr.transform]="'translate(' + properties[2].translateX + ' ' + properties[2].translateY + ')'"
        />
        <line
            x1="0"
            [attr.y1]="size / 2"
            [attr.x2]="size"
            [attr.y2]="size / 2"
            stroke-width="2"
            [attr.stroke]="properties[3].color"
            [attr.transform]="'translate(' + properties[3].translateX + ' ' + properties[3].translateY + ') rotate(' + properties[3].rotate + ' ' + (size / 2) + ' ' + (size / 2) + ')'"
        />
      </g>
    </svg>
  `,
  styles: [
  ]
})
export class BoringAvatarBauhausComponent implements OnInit {
  @Input() name: string = "Default";
  @Input() size: number = 80;
  @Input() width: number = 80;
  @Input() elements: number = 4;
  @Input() square: number | undefined;
  @Input() colors: string[] = ['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90'];

  properties: BauhausAvatar[] = [];

  generateColors(name: string, colors: string[]): BauhausAvatar[] {
    const numFromName = hashCode(name);
    const range = colors && colors.length;

    return Array.from({length: this.elements}, (_, i) => ({
      color: getRandomColor(numFromName + i, colors, range),
      translateX: getUnit(numFromName * (i + 1), this.size / 2 - (i + 17), 1),
      translateY: getUnit(numFromName * (i + 1), this.size / 2 - (i + 17), 2),
      rotate: getUnit(numFromName * (i + 1), 360),
      isSquare: getBoolean(numFromName, 2),
    }));
  }

  ngOnInit(): void {
    this.properties = this.generateColors(this.name, this.colors);
  }
}
