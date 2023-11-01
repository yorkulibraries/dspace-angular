import { Component, Input, Inject, OnInit, ElementRef } from '@angular/core';
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

  constructor(@Inject(APP_CONFIG) private appConfig: AppConfig, private elementRef: ElementRef) {}

  ngOnInit() {
    this.itemIdentifier = this.gettingIdentifier().find(item => item.value !== null);
    
    this.loadExternalScript(this.appConfig.ui.plumx)
    .catch(error => console.error('Script loading error:', error));
    this.loadExternalScript(this.appConfig.ui.altmetric)
    .catch(error => console.error('Script loading error:', error));
  }

  private getIndetifierValue(identifier_doi: string | string[], regex: RegExp): string | null {
    let identifier = Array.isArray(identifier_doi) ? identifier_doi.find(value => regex.test(value)) : identifier_doi;
    if (identifier !==undefined && regex.test(identifier)) {
      return new URL(identifier).pathname;
    } else {
      return null;
    }
  }

  private gettingIdentifier(): any[] {
    const regExp = /https?:\/\/(dx\.)?doi\.org\//gi;
    return [
      {
        name: 'data-doi',
        value: this.getIndetifierValue(this.item.allMetadataValues('dc.identifier.doi'), regExp),
      },
      {
        name: 'data-doi',
        value: this.getIndetifierValue(this.item.allMetadataValues('dc.identifier.uri'), regExp),
      },
      {
        name: 'data-doi',
        value: this.getIndetifierValue(this.item.firstMetadataValue('dc.identifier.doi'), regExp),
      },
      {
        name: 'data-doi',
        value: this.getIndetifierValue(this.item.firstMetadataValue('dc.identifier.uri'), regExp),
      },
    ];
  }

  private loadExternalScript(scriptUrl: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const script = this.elementRef.nativeElement.ownerDocument.createElement('script');
      script.src = scriptUrl;
      this.elementRef.nativeElement.ownerDocument.body.appendChild(script);
      });
  }
}
