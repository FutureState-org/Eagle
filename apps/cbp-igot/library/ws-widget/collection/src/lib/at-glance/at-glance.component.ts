import { Component, OnInit, Input } from '@angular/core'
import { NsWidgetResolver, WidgetBaseComponent } from '@ws-widget/resolver'
import { IAtGlanceComponentData } from './at-glance.model'
@Component({
  selector: 'ws-widget-at-glance',
  templateUrl: './at-glance.component.html',
  styleUrls: ['./at-glance.component.scss'],
})
export class AtGlanceComponent extends WidgetBaseComponent
  implements OnInit, NsWidgetResolver.IWidgetData<IAtGlanceComponentData.IData> {
  @Input() widgetData!: IAtGlanceComponentData.IData
  containerClass = ''

  ngOnInit() {

  }
  getPreviewLink() {
    if (this.widgetData && this.widgetData.contentId) {
      return `/author/toc/${this.widgetData.contentId}/single-page-view`
    }
    return null
  }
}