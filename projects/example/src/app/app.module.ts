import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BoringAvatarBauhausModule} from "../../../ngx-boring-avatars/src/lib/boring-avatar-bauhaus.module";
import {BoringAvatarBeamModule} from "../../../ngx-boring-avatars/src/lib/boring-avatar-beam.module";
import {BoringAvatarMarbleModule} from "../../../ngx-boring-avatars/src/lib/boring-avatar-marble.module";
import {BoringAvatarPixelModule} from "../../../ngx-boring-avatars/src/lib/boring-avatar-pixel.module";
import {BoringAvatarRingModule} from "../../../ngx-boring-avatars/src/lib/boring-avatar-ring.module";
import {BoringAvatarSunsetModule} from "../../../ngx-boring-avatars/src/lib/boring-avatar-sunset.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BoringAvatarBauhausModule,
    BoringAvatarBeamModule,
    BoringAvatarMarbleModule,
    BoringAvatarPixelModule,
    BoringAvatarRingModule,
    BoringAvatarSunsetModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
