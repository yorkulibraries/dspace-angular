import { Component, Input, Inject, OnInit } from '@angular/core';
import { AltmetricMenuItemModel } from 'src/app/shared/menu/menu-item/models/altmetric.model';
import { Item } from 'src/app/core/shared/item.model';
import { AppConfig, APP_CONFIG } from 'src/config/app-config.interface';

@Component({
  selector: 'ds-item-page-metrics-field',
  templateUrl: './item-page-metrics-field.component.html',
})
export class ItemPageMetricsFieldComponent implements OnInit {

  @Input() metrics = { url: '', disabled: true } as AltmetricMenuItemModel;
  @Input() item: Item;

  constructor(@Inject(APP_CONFIG) private appConfig: AppConfig) {}

  ngOnInit() {
    this.metrics.url = this.item.firstMetadataValue('dc.identifier.uri') ? (new URL(this.item.firstMetadataValue('dc.identifier.uri')).pathname) : '';
    if (this.metrics.url !== '') {
      this.metrics.disabled = false;
    }

    this.loadExternalScript(this.appConfig.ui.altmetric)
    .catch(error => console.error('Script loading error:', error));

    this.loadExternalScript(this.appConfig.ui.plumx)
    .catch(error => console.error('Script loading error:', error));
  }

  private loadExternalScript(scriptUrl: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!this.metrics.disabled) {
        const script = document.createElement('script');
        script.src = scriptUrl;
        script.onload = () => {
          console.log('External script has been loaded: ' + scriptUrl);
          resolve();
        };
        script.onerror = (error) => {
          this.metrics.disabled = true;
          reject(error);
        };
        document.body.appendChild(script);
      } else {
        resolve();
      }
    });
  }
}
