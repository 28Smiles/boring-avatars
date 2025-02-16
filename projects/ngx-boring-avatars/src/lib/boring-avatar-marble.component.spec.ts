import {ComponentFixture, TestBed} from "@angular/core/testing";
import {BoringAvatarMarbleComponent} from "./boring-avatar-marble.component";
import * as React from "react";
import Avatar from "boring-avatars";
import {render} from "@testing-library/react";

describe("BoringAvatarMarbleComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [
        BoringAvatarMarbleComponent
      ],
    }).compileComponents();
  });

  it("should create the app", () => {
    const fixture = TestBed.createComponent(BoringAvatarMarbleComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'example'`, () => {
    const fixture = TestBed.createComponent(BoringAvatarMarbleComponent);
    const app = fixture.componentInstance;

    app.name = "example"

    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('title')?.textContent).toContain("example");
  });

  it("should update title", () => {
    const fixture = TestBed.createComponent(BoringAvatarMarbleComponent);
    const app = fixture.componentInstance;

    ["example", "examples", "examplus"].forEach(name => {
      app.name = name;

      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('title')?.textContent).toContain(name);
    });
  });
});

describe("BoringAvatarMarbleComponentReactCompare", () => {
  let angularFixture: ComponentFixture<BoringAvatarMarbleComponent>;
  let angularApp: BoringAvatarMarbleComponent;
  let reactContainer: Element;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [
        BoringAvatarMarbleComponent
      ],
    }).compileComponents();
    angularFixture = TestBed.createComponent(BoringAvatarMarbleComponent);
    angularApp = angularFixture.componentInstance;
    reactContainer = document.createElement("div")
    document.body.appendChild(reactContainer);
  });

  [
    ["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"],
    ["#2552c1", "#4e585b", "#ad9978", "#258310", "#C20D90"],
    ["#a5c692", "#14297c", "#993df0", "#c27871", "#C20D90"],
  ].forEach((colors, colorsIdx) => {
    [
      "Mary Baker",
      "Amelia Earhart",
      "Mary Roebling",
      "Sarah Winnemucca",
      "Margaret Brent",
      "Lucy Stone",
      "Mary Edwards",
      "Margaret Chase"
    ].forEach(name => {
      [ true, false ].forEach(square => {
        it(`compare to react color${colorsIdx}, square '${square}' and name '${name}'`, () => {
          const avatar: React.ReactElement = Avatar({
            name: name,
            variant: "marble",
            size: 80,
            colors: colors,
            square: square
          })!!;
          render(avatar, {container: reactContainer});

          angularApp.name = avatar.props.name;
          angularApp.size = avatar.props.size;
          angularApp.colors = avatar.props.colors;
          angularApp.square = avatar.props.square ? 0 : undefined;
          angularFixture.detectChanges();

          const svgReact: Element = reactContainer.children[0] as Element;
          const svgAngular: Element = angularFixture.nativeElement.children[0] as Element;

          function equalAttribute(a: Element, b: Element, attr: string) {
            expect(a.getAttribute(attr)).toBeTruthy();
            expect(b.getAttribute(attr)).toBeTruthy();
            expect(a.getAttribute(attr)).toEqual(b.getAttribute(attr));
          }

          equalAttribute(svgReact, svgAngular, "viewBox");
          equalAttribute(svgReact, svgAngular, "width");
          equalAttribute(svgReact, svgAngular, "height");

          const maskReact = svgReact.querySelector("mask") as Element;
          const maskAngular = svgAngular.querySelector("mask") as Element;

          equalAttribute(maskReact, maskAngular, "maskUnits");
          equalAttribute(maskReact, maskAngular, "x");
          equalAttribute(maskReact, maskAngular, "y");
          equalAttribute(maskReact, maskAngular, "width");
          equalAttribute(maskReact, maskAngular, "height");

          const maskRectReact = svgReact.querySelector("rect") as Element;
          const maskRectAngular = svgAngular.querySelector("rect") as Element;

          expect(maskRectReact.getAttribute("rx"))
            .toEqual(maskRectAngular.getAttribute("rx"));
          equalAttribute(maskRectReact, maskRectAngular, "width");
          equalAttribute(maskRectReact, maskRectAngular, "height");

          const gReact = svgReact.querySelector("g") as Element;
          const gAngular = svgAngular.querySelector("g") as Element;

          const gAngularPaths = gAngular.querySelectorAll("path");
          gReact.querySelectorAll("path").forEach((gReactPath, i) => {
            const gAngularPath = gAngularPaths[i];

            equalAttribute(gReactPath, gAngularPath, "d");
            equalAttribute(gReactPath, gAngularPath, "filter");
            equalAttribute(gReactPath, gAngularPath, "fill");
            equalAttribute(gReactPath, gAngularPath, "transform");
          });

          const rectReact = gReact.querySelector("rect") as Element;
          const rectAngular = gAngular.querySelector("rect") as Element;

          equalAttribute(rectReact, rectAngular, "width");
          equalAttribute(rectReact, rectAngular, "height");
          equalAttribute(rectReact, rectAngular, "fill");

          const defsReact = svgReact.querySelector("defs") as Element;
          const defsAngular = svgAngular.querySelector("defs") as Element;

          expect(defsReact.innerHTML).toEqual(defsAngular.innerHTML);
        });
      });
    });
  });
});
