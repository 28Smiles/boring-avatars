import {Component, Input, OnInit, SimpleChanges} from "@angular/core";
import {getRandomColor, hashCode} from "./utilities";

@Component({
  selector: "ngx-boring-avatar-pixel",
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
        [id]="'mask__pixel_' + size + '_' + square"
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
      <g [attr.mask]="'url(#mask__pixel_' + size + '_' + square + ')'">
        <rect width="10" height="10" [attr.fill]="properties[0]"/>
        <rect x="20" width="10" height="10" [attr.fill]="properties[1]" />
        <rect x="40" width="10" height="10" [attr.fill]="properties[2]" />
        <rect x="60" width="10" height="10" [attr.fill]="properties[3]" />
        <rect x="10" width="10" height="10" [attr.fill]="properties[4]" />
        <rect x="30" width="10" height="10" [attr.fill]="properties[5]" />
        <rect x="50" width="10" height="10" [attr.fill]="properties[6]" />
        <rect x="70" width="10" height="10" [attr.fill]="properties[7]" />
        <rect y="10" width="10" height="10" [attr.fill]="properties[8]" />
        <rect y="20" width="10" height="10" [attr.fill]="properties[9]" />
        <rect y="30" width="10" height="10" [attr.fill]="properties[10]" />
        <rect y="40" width="10" height="10" [attr.fill]="properties[11]" />
        <rect y="50" width="10" height="10" [attr.fill]="properties[12]" />
        <rect y="60" width="10" height="10" [attr.fill]="properties[13]" />
        <rect y="70" width="10" height="10" [attr.fill]="properties[14]" />
        <rect x="20" y="10" width="10" height="10" [attr.fill]="properties[15]" />
        <rect x="20" y="20" width="10" height="10" [attr.fill]="properties[16]" />
        <rect x="20" y="30" width="10" height="10" [attr.fill]="properties[17]" />
        <rect x="20" y="40" width="10" height="10" [attr.fill]="properties[18]" />
        <rect x="20" y="50" width="10" height="10" [attr.fill]="properties[19]" />
        <rect x="20" y="60" width="10" height="10" [attr.fill]="properties[20]" />
        <rect x="20" y="70" width="10" height="10" [attr.fill]="properties[21]" />
        <rect x="40" y="10" width="10" height="10" [attr.fill]="properties[22]" />
        <rect x="40" y="20" width="10" height="10" [attr.fill]="properties[23]" />
        <rect x="40" y="30" width="10" height="10" [attr.fill]="properties[24]" />
        <rect x="40" y="40" width="10" height="10" [attr.fill]="properties[25]" />
        <rect x="40" y="50" width="10" height="10" [attr.fill]="properties[26]" />
        <rect x="40" y="60" width="10" height="10" [attr.fill]="properties[27]" />
        <rect x="40" y="70" width="10" height="10" [attr.fill]="properties[28]" />
        <rect x="60" y="10" width="10" height="10" [attr.fill]="properties[29]" />
        <rect x="60" y="20" width="10" height="10" [attr.fill]="properties[30]" />
        <rect x="60" y="30" width="10" height="10" [attr.fill]="properties[31]" />
        <rect x="60" y="40" width="10" height="10" [attr.fill]="properties[32]" />
        <rect x="60" y="50" width="10" height="10" [attr.fill]="properties[33]" />
        <rect x="60" y="60" width="10" height="10" [attr.fill]="properties[34]" />
        <rect x="60" y="70" width="10" height="10" [attr.fill]="properties[35]" />
        <rect x="10" y="10" width="10" height="10" [attr.fill]="properties[36]" />
        <rect x="10" y="20" width="10" height="10" [attr.fill]="properties[37]" />
        <rect x="10" y="30" width="10" height="10" [attr.fill]="properties[38]" />
        <rect x="10" y="40" width="10" height="10" [attr.fill]="properties[39]" />
        <rect x="10" y="50" width="10" height="10" [attr.fill]="properties[40]" />
        <rect x="10" y="60" width="10" height="10" [attr.fill]="properties[41]" />
        <rect x="10" y="70" width="10" height="10" [attr.fill]="properties[42]" />
        <rect x="30" y="10" width="10" height="10" [attr.fill]="properties[43]" />
        <rect x="30" y="20" width="10" height="10" [attr.fill]="properties[44]" />
        <rect x="30" y="30" width="10" height="10" [attr.fill]="properties[45]" />
        <rect x="30" y="40" width="10" height="10" [attr.fill]="properties[46]" />
        <rect x="30" y="50" width="10" height="10" [attr.fill]="properties[47]" />
        <rect x="30" y="60" width="10" height="10" [attr.fill]="properties[48]" />
        <rect x="30" y="70" width="10" height="10" [attr.fill]="properties[49]" />
        <rect x="50" y="10" width="10" height="10" [attr.fill]="properties[50]" />
        <rect x="50" y="20" width="10" height="10" [attr.fill]="properties[51]" />
        <rect x="50" y="30" width="10" height="10" [attr.fill]="properties[52]" />
        <rect x="50" y="40" width="10" height="10" [attr.fill]="properties[53]" />
        <rect x="50" y="50" width="10" height="10" [attr.fill]="properties[54]" />
        <rect x="50" y="60" width="10" height="10" [attr.fill]="properties[55]" />
        <rect x="50" y="70" width="10" height="10" [attr.fill]="properties[56]" />
        <rect x="70" y="10" width="10" height="10" [attr.fill]="properties[57]" />
        <rect x="70" y="20" width="10" height="10" [attr.fill]="properties[58]" />
        <rect x="70" y="30" width="10" height="10" [attr.fill]="properties[59]" />
        <rect x="70" y="40" width="10" height="10" [attr.fill]="properties[60]" />
        <rect x="70" y="50" width="10" height="10" [attr.fill]="properties[61]" />
        <rect x="70" y="60" width="10" height="10" [attr.fill]="properties[62]" />
        <rect x="70" y="70" width="10" height="10" [attr.fill]="properties[63]" />
      </g>
    </svg>
  `,
  styles: [
  ]
})
export class BoringAvatarPixelComponent implements OnInit {
  @Input() name: string = "Default";
  @Input() size: number = 80;
  @Input() elements: number = 64;
  @Input() width: number = 80;
  @Input() square: number | undefined;
  @Input() colors: string[] = ["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"];

  properties: string[] = [];

  generateColors(name: string, colors: string[]): string[] {
    const numFromName = hashCode(name);
    const range = colors && colors.length;

    return Array.from({length: this.elements}, (_, i) =>
      getRandomColor(numFromName % i, colors, range),
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
