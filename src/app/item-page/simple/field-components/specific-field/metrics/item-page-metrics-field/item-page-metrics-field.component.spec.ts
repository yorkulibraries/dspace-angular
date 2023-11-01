import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Item } from 'src/app/core/shared/item.model';
import { of as observableOf } from 'rxjs';
import { ItemPageMetricsFieldComponent } from './item-page-metrics-field.component';
import { APP_CONFIG } from 'src/config/app-config.interface';

describe('ItemPageMetricsFieldComponent', () => {
  let component: ItemPageMetricsFieldComponent;
  let fixture: ComponentFixture<ItemPageMetricsFieldComponent>;
  const URI = '/123456789/123';

  const appConfigProvider = {
    provide: APP_CONFIG,
    useValue: { ui: { altmetric: 'https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js', plumx: 'https://cdn.plu.mx/widget-popup.js' } }
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ItemPageMetricsFieldComponent],
      providers: [appConfigProvider],
    });

    fixture = TestBed.createComponent(ItemPageMetricsFieldComponent);
    component = fixture.componentInstance;

    const mockItem: Item = Object.assign(new Item(), {
      bundles: observableOf({}),
      metadata: {
        'dc.title': [
          {
            language: 'en_US',
            value: 'This is just another title',
          },
        ],
        'dc.identifier.uri': [{ value: 'http://dx.doi.org' + URI }],
      },
    });

    component.item = mockItem;

    fixture.detectChanges();
  });

  it('should set data-doi attribute correctly', () => {
    const doiAttribute = fixture.nativeElement.querySelector('.altmetric-embed').getAttribute('data-doi');
    expect(doiAttribute).toBe(URI);
  });

  it('should generate a valid anchor element', () => {
    const metricsFieldElement = fixture.nativeElement;
    const anchorElement = metricsFieldElement.querySelector('a');
    expect(anchorElement).not.toBeNull();

    const expectedHref = 'https://plu.mx/plum/a/?doi=' + URI;
    expect(anchorElement.getAttribute('href')).toBe(expectedHref);
  });
});
