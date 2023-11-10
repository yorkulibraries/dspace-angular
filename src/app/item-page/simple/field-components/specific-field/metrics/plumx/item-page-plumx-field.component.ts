import { AfterViewInit, Component, Input } from '@angular/core';
import { ExternalScriptLoaderService } from 'src/app/shared/utils/scripts-loader/external-script-loader.service';
import {
  ExternalScriptsNames,
  ExternalScriptsStatus,
} from 'src/app/shared/utils/scripts-loader/external-script.model';
import { Item } from '../../../../../../core/shared/item.model';

@Component({
  selector: 'ds-item-page-plumx-field',
  templateUrl: './item-page-plumx-field.component.html',
})
export class ItemPagePlumxFieldComponent implements AfterViewInit {
  @Input() item: Item;

  constructor(private scriptLoader: ExternalScriptLoaderService) {}

  ngAfterViewInit() {
    this.scriptLoader
      .load(ExternalScriptsNames.PLUMX)
      .then((data) => this.reloadBadge(data))
      .catch((error) => console.error(error));
  }

  /**
   * We ensure that the badge is visible after the script is loaded
   * @param data The data returned from the promise
   */
  private reloadBadge(data: any[]) {
    if (data.find((element) => this.isLoaded(element))) {
      const initMethod = '__plumX.widgets.init';
      window[initMethod]();
    }
  }

  /**
   * Check if the script has been previously loaded in the DOM
   * @param element The resolve element from the promise
   * @returns true if the script has been already loaded, false if not
   */
  private isLoaded(element: any): unknown {
    return (
      element.script === ExternalScriptsNames.PLUMX &&
      element.status === ExternalScriptsStatus.ALREADY_LOADED
    );
  }
}
