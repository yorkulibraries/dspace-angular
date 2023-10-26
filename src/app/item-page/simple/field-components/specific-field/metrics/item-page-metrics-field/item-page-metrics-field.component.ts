import { Component, Input, Inject, OnInit } from '@angular/core';
import { Item } from 'src/app/core/shared/item.model';
import { AppConfig, APP_CONFIG } from 'src/config/app-config.interface';
declare var document: any;

@Component({
  selector: 'ds-item-page-metrics-field',
  templateUrl: './item-page-metrics-field.component.html',
})
export class ItemPageMetricsFieldComponent implements OnInit {

  @Input() item: Item;
  itemIdentifier: {name: string, value: string};

  constructor(@Inject(APP_CONFIG) private appConfig: AppConfig) {}

  ngOnInit() {
    this.itemIdentifier = this.gettingIdentifier().find(item => item.value !== null);
    
    this.loadExternalScript(this.appConfig.ui.altmetric)
    .catch(error => console.error('Script loading error:', error));
    this.loadExternalScript(this.appConfig.ui.plumx)
    .catch(error => console.error('Script loading error:', error));
  }

  private getIndetifierValue(inputString: string, regex: RegExp): string | null {
    if (inputString !==undefined && regex.test(inputString)) {
      return new URL(inputString).pathname;
    } else {
      return null;
    }
  }

  private gettingIdentifier(): any[] {
    return [
      {
        name: 'data-doi',
        value: this.getIndetifierValue(this.item.firstMetadataValue('dc.identifier.doi'), /https?:\/\/(dx\.)?doi\.org\//gi),
      },
      {
        name: 'data-doi',
        value: this.getIndetifierValue(this.item.firstMetadataValue('dc.identifier.uri'),/https?:\/\/(dx\.)?doi\.org\//gi),
      },
      {
        name: 'data-handle',
        value: this.getIndetifierValue(this.item.firstMetadataValue('dc.identifier.uri'),/http?:\/\/hdl\.handle\.net\//gi),
      },
    ];
  }

  private loadExternalScript(scriptUrl: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = scriptUrl;
        script.onload = () => {
          console.log('External script has been loaded: ' + scriptUrl);
          resolve();
        };
        script.onerror = (error) => {
          reject(error);
        };
        document.body.appendChild(script);
      });
  }
}
