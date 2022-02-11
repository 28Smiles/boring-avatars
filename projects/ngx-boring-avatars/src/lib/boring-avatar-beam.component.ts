import {Component, Input, OnInit, SimpleChanges} from "@angular/core";
import {getBoolean, getContrast, getRandomColor, getUnit, hashCode} from "./utilities";

interface BeamAvatar {
  wrapperColor: string,
  faceColor: string,
  backgroundColor: string,
  wrapperTranslateX: number,
  wrapperTranslateY: number,
  wrapperRotate: number,
  wrapperScale: number,
  isMouthOpen: boolean
  isCircle: boolean
  eyeSpread: number,
  mouthSpread: number,
  faceRotate: number,
  faceTranslateX: number,
  faceTranslateY: number
}

@Component({
  selector: "ngx-boring-avatar-beam",
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
        <rect [attr.width]="size"
              [attr.height]="size"
              [attr.rx]="square === undefined ? size * 2 : (square === 0 ? undefined : square)"
              fill="#fff"/>
      </mask>
      <g [attr.mask]="'url(#mask__beam_' + size + '_' + square + ')'">
        <rect [attr.width]="size" [attr.height]="size" [attr.fill]="properties?.backgroundColor"/>
        <rect
          [attr.x]="0"
          [attr.y]="0"
          [attr.width]="size"
          [attr.height]="size"
          [attr.transform]="'translate(' + properties?.wrapperTranslateX + ' ' + properties?.wrapperTranslateY + ') rotate(' + properties?.wrapperRotate + ' ' + (size / 2) + ' ' + (size / 2) + ') scale(' + properties?.wrapperScale + ')'"
          [attr.fill]="properties?.wrapperColor"
          [attr.rx]="properties?.isCircle ? size : size / 6"/>
        <g [attr.transform]="'translate(' + properties?.faceTranslateX + ' ' + properties?.faceTranslateY + ') rotate(' + properties?.faceRotate + ' ' + (size / 2) + ' ' + (size / 2) + ')'">
          <path
            [attr.d]="properties?.isMouthOpen ? 'M15 ' + (19 + (properties?.mouthSpread ?? 0)) + 'c2 1 4 1 6 0' : 'M13,' + (19 + (properties?.mouthSpread ?? 0)) + ' a1,0.75 0 0,0 10,0'"
            [attr.stroke]="properties?.faceColor"
            [attr.fill]="properties?.isMouthOpen ? 'none' : properties?.faceColor"
            [attr.stroke-linecap]="properties?.isMouthOpen ? 'round' : undefined"
          />
          <rect
            [attr.x]="14 - (properties?.eyeSpread ?? 0)"
            y="14"
            width="1.5"
            height="2"
            rx="1"
            stroke="none"
            [attr.fill]="properties?.faceColor"/>
          <rect
            [attr.x]="20 + (properties?.eyeSpread ?? 0)"
            y="14"
            width="1.5"
            height="2"
            rx="1"
            stroke="none"
            [attr.fill]="properties?.faceColor"/>
        </g>
      </g>
    </svg>
  `,
  styles: [
  ]
})
export class BoringAvatarBeamComponent implements OnInit {
  @Input() name: string = "Default";
  @Input() size: number = 36;
  @Input() width: number = 80;
  @Input() square: number | undefined;
  @Input() colors: string[] = ["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"];

  properties: BeamAvatar | undefined = undefined;

  generateData(name: string, colors: string[]): BeamAvatar {
    const numFromName = hashCode(name);
    const range = colors && colors.length;
    const wrapperColor = getRandomColor(numFromName, colors, range);
    const preTranslateX = getUnit(numFromName, 10, 1);
    const wrapperTranslateX = preTranslateX < 5 ? preTranslateX + this.size / 9 : preTranslateX;
    const preTranslateY = getUnit(numFromName, 10, 2);
    const wrapperTranslateY = preTranslateY < 5 ? preTranslateY + this.size / 9 : preTranslateY;

    return {
      wrapperColor: wrapperColor,
      faceColor: getContrast(wrapperColor),
      backgroundColor: getRandomColor(numFromName + 13, colors, range),
      wrapperTranslateX: wrapperTranslateX,
      wrapperTranslateY: wrapperTranslateY,
      wrapperRotate: getUnit(numFromName, 360),
      wrapperScale: 1 + getUnit(numFromName, this.size / 12) / 10,
      isMouthOpen: getBoolean(numFromName, 2),
      isCircle: getBoolean(numFromName, 1),
      eyeSpread: getUnit(numFromName, 5),
      mouthSpread: getUnit(numFromName, 3),
      faceRotate: getUnit(numFromName, 10, 3),
      faceTranslateX:
        wrapperTranslateX > this.size / 6 ? wrapperTranslateX / 2 : getUnit(numFromName, 8, 1),
      faceTranslateY:
        wrapperTranslateY > this.size / 6 ? wrapperTranslateY / 2 : getUnit(numFromName, 7, 2),
    };
  }

  ngOnInit(): void {
    this.properties = this.generateData(this.name, this.colors);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["name"].currentValue !== changes["name"].previousValue
      || changes["colors"].currentValue !== changes["colors"].previousValue) {
      this.properties = this.generateData(this.name, this.colors);
    }
  }
}
