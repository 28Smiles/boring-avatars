import {Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {getRandomColor, hashCode} from "./utilities";

@Component({
  selector: "ngx-boring-avatar-sunset",
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
        [id]="'mask__sunset_' + size + '_' + square"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        [attr.width]="size"
        [attr.height]="size"
      >
        <rect [attr.width]="size"
              [attr.height]="size"
              [attr.rx]="square === undefined ? size * 2 : (square === 0 ? undefined : square)"
              fill="#fff"/>
      </mask>
      <g [attr.mask]="'url(#mask__sunset_' + size + '_' + square + ')'">
        <path [attr.fill]="'url(#gradient_paint0_linear_' + name + '_' + size + '_' + square + ')'" d="M0 0h80v40H0z" />
        <path [attr.fill]="'url(#gradient_paint1_linear_' + name + '_' + size + '_' + square + ')'" d="M0 40h80v40H0z" />
      </g>
      <defs>
        <linearGradient
          [attr.id]="'gradient_paint0_linear_' + name + '_' + size + '_' + square"
          [attr.x1]="size / 2"
          y1="0"
          [attr.x2]="size / 2"
          [attr.y2]="size / 2"
          gradientUnits="userSpaceOnUse">
            <stop [attr.stop-color]="properties[0]"/>
            <stop offset="1" [attr.stop-color]="properties[1]"/>
        </linearGradient>
        <linearGradient
          [attr.id]="'gradient_paint1_linear_' + name + '_' + size + '_' + square"
          [attr.x1]="size / 2"
          [attr.y1]="size / 2"
          [attr.x2]="size / 2"
          [attr.y2]="size"
          gradientUnits="userSpaceOnUse">
          <stop [attr.stop-color]="properties[2]"/>
          <stop offset="1" [attr.stop-color]="properties[3]"/>
        </linearGradient>
      </defs>
    </svg>
  `,
  styles: [
  ]
})
export class BoringAvatarSunsetComponent implements OnInit, OnChanges {
  @Input() name: string = "Default";
  @Input() size: number = 80;
  @Input() elements: number = 4;
  @Input() width: number = 80;
  @Input() square: number | undefined;
  @Input() colors: string[] = ["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"];

  properties: string[] = [];

  generateColors(name: string, colors: string[]): string[] {
    const numFromName = hashCode(name);
    const range = colors && colors.length;

    return Array.from({length: this.elements}, (_, i) =>
      getRandomColor(numFromName + i, colors, range),
    );
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
