import { NgModule } from '@angular/core'
import { CardHomeTopComponent } from './card-home-top.component'
import { CardBadgeComponent } from './card-badges/card-badges.component'
import { CardActivityComponent } from './card-activity/card-activity.component'
import { CardCompetencyComponent } from './card-competency/card-competency.component'
import { CardGoalComponent } from './card-goal/card-goal.component'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { BrowserModule } from '@angular/platform-browser'
import { AvatarPhotoModule } from '../_common/avatar-photo/avatar-photo.module'
import { CardLearningStatusComponent } from './card-learning-status/card-learning-status.component'
import { CardNetworkHomeComponent } from './card-network-home/card-network-home.component'
import { StarRatingComponent } from './star-rating/star-rating.component'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatGridListModule } from '@angular/material/grid-list'
import { HorizontalScrollerModule, PipeNameTransformModule } from '@ws-widget/utils'
import {
  MatButtonModule, MatCardModule, MatChipsModule, MatDividerModule, MatExpansionModule,
  MatIconModule, MatProgressSpinnerModule, MatFormFieldModule,
} from '@angular/material'

@NgModule({
  declarations: [CardHomeTopComponent, StarRatingComponent, CardActivityComponent,
    CardBadgeComponent, CardCompetencyComponent, CardGoalComponent, CardLearningStatusComponent, CardNetworkHomeComponent],
  imports: [AvatarPhotoModule, BrowserModule, MatButtonModule, MatCardModule, MatChipsModule, MatDividerModule, MatGridListModule,
    MatExpansionModule, MatIconModule, MatProgressSpinnerModule, MatProgressBarModule, MatFormFieldModule,
    MatTooltipModule, HorizontalScrollerModule, PipeNameTransformModule],
  entryComponents: [CardHomeTopComponent],
})
export class CardHomeTopModule {

}
