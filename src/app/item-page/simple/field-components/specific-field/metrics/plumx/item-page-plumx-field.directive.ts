import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { Item } from 'src/app/core/shared/item.model';

/**
 * This directive adds the href attribute for the Plumx badge dependening on the first identifier found in the item
 */
@Directive({
  selector: '[dsPlumxData]',
})
export class PlumxDirective implements OnInit {
  @Input() item: Item;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnInit(): void {
    const identifier = this.obtainFirstValidID(this.initItemIdentifiers());
    if (identifier !== undefined) {
      this.renderer.setAttribute(
        this.elementRef.nativeElement,
        'href',
        'https://plu.mx/plum/a/?' + identifier.name + '=' + this.applyRegex(identifier.value, identifier.regex)
      );
    }
  }

  /**
   * This initialize an array of identifiers founded in the item.
   * It search for DOI, Handle, PMID, ISBN, ARXIV and URI.
   * Some identifiers may be stored with more text than the ID so this objects has a regex property to clean it
   */
  private initItemIdentifiers(): any[] {
    return [
      {
        name: 'doi',
        value: this.item.firstMetadataValue('dc.identifier.doi'),
        regex: /https?:\/\/(dx\.)?doi\.org\//gi,
      },
      {
        name: 'doi',
        value: this.item.allMetadataValues('dc.identifier.uri').find(value => /https?:\/\/(dx\.)?doi\.org\//i.test(value)),
        regex: /https?:\/\/(dx\.)?doi\.org\//gi,
      },
      {
        name: 'pmid',
        value: this.item.firstMetadataValue('dc.identifier.pmid'),
        regex: '',
      },
      {
        name: 'isbn',
        value: this.item.firstMetadataValue('dc.identifier.isbn'),
        regex: '',
      },
      {
        name: 'arxiv',
        value: this.item.firstMetadataValue('dc.identifier.arxiv'),
        regex: '',
      },
    ];
  }

  /**
   * This function obtains the first valid ID from the item
   * @returns Returns first valid identifier (not undefined), undefined otherwise
   */
  private obtainFirstValidID(itemIdentifiers: any[]): any {
    return itemIdentifiers.find((element) => element.value !== undefined);
  }

  /**
   * Apply the specified regex to clean the metadata and obtain only the ID
   * @param value The metadata value
   * @param regex The regex to apply
   * @returns The result is the ID clean
   */
  private applyRegex(value: string, regex: string): string {
    return value.replace(regex, '');
  }
}
