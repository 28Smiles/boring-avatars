import {Component, Input, OnInit, SimpleChanges} from "@angular/core";
import {getRandomColor, getUnit, hashCode} from "./utilities";

interface MarbleAvatar {
  color: string,
  translateX: number,
  translateY: number,
  rotate: number,
  scale: number
}

@Component({
  selector: "ngx-boring-avatar-marble",
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
        [id]="'mask__beam_' + size + '_' + square"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        [attr.width]="size"
        [attr.height]="size"
      >
        <rect [attr.width]="size" [attr.height]="size" [attr.rx]="square == undefined ? size * 2 : square" fill="#fff"></rect>
      </mask>
      <g [attr.mask]="'url(#mask__beam_' + size + '_' + square + ')'">
        <rect [attr.width]="size" [attr.height]="size" [attr.fill]="properties[0].color"/>
        <path
          filter="url(#prefix__filter0_f)"
          d="M32.414 59.35L50.376 70.5H72.5v-71H33.728L26.5 13.381l19.057 27.08L32.414 59.35z"
          [attr.fill]="properties[1].color"
          [attr.transform]="'translate(' + properties[1].translateX + ' ' + properties[1].translateY + ') rotate(' + properties[1].rotate + ' ' + (size / 2) + ' ' + (size / 2) + ') scale(' + properties[2].scale + ')'"
        />
        <path
          filter="url(#prefix__filter0_f)"
          style="mix-blend-mode: overlay"
          d="M22.216 24L0 46.75l14.108 38.129L78 86l-3.081-59.276-22.378 4.005 12.972 20.186-23.35 27.395L22.215 24z"
          [attr.fill]="properties[2].color"
          [attr.transform]="'translate(' + properties[2].translateX + ' ' + properties[2].translateY + ') rotate(' + properties[2].rotate + ' ' + (size / 2) + ' ' + (size / 2) + ') scale(' + properties[2].scale + ')'"
        />
      </g>
      <defs>
        <filter
          id="prefix__filter0_f"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feGaussianBlur stdDeviation="7" result="effect1_foregroundBlur"/>
        </filter>
      </defs>
    </svg>
  `,
  styles: [
  ]
})
export class BoringAvatarMarbleComponent implements OnInit {
  @Input() name: string = "Default";
  @Input() size: number = 80;
  @Input() elements: number = 3;
  @Input() width: number = 80;
  @Input() square: number | undefined;
  @Input() colors: string[] = ["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"];

  properties: MarbleAvatar[] = [];

  generateColors(name: string, colors: string[]): MarbleAvatar[] {
    const numFromName = hashCode(name);
    const range = colors && colors.length;

    return Array.from({length: this.elements}, (_, i) => ({
      color: getRandomColor(numFromName + i, colors, range),
      translateX: getUnit(numFromName * (i + 1), this.size / 10, 1),
      translateY: getUnit(numFromName * (i + 1), this.size / 10, 2),
      scale: 1.2 + getUnit(numFromName * (i + 1), this.size / 20) / 10,
      rotate: getUnit(numFromName * (i + 1), 360, 1),
    }));
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
