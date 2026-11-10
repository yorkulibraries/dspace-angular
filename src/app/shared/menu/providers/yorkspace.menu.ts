/**
 * The contents of this file are subject to the license and copyright
 * detailed in the LICENSE and NOTICE files at the root of the source
 * tree and available online at
 *
 * http://www.dspace.org/license/
 */

import { Injectable } from '@angular/core';
import {
  Observable,
  of,
} from 'rxjs';

import { ExternalLinkMenuItemModel } from '../menu-item/models/external-link.model';
import { TextMenuItemModel } from '../menu-item/models/text.model';
import { MenuItemType } from '../menu-item-type.model';
import { PartialMenuSection } from '../menu-provider.model';
import { AbstractExpandableMenuProvider } from './helper-providers/expandable-menu-provider';

/**
 * Menu provider to create the "About YorkSpace" menu section in the public navbar
 */
@Injectable()
export class YorkSpaceMenuProvider extends AbstractExpandableMenuProvider {
  getTopSection(): Observable<PartialMenuSection> {
    return of(
      {
        model: {
          type: MenuItemType.TEXT,
          text: 'menu.section.about',
        } as TextMenuItemModel,
        icon: 'info-circle',
        visible: true,
      },
    );
  }

  getSubSections(): Observable<PartialMenuSection[]> {
    return of([
      {
        model: {
          type: MenuItemType.EXTERNAL,
          text: 'menu.section.about_yorkspace',
          href: 'https://www.library.yorku.ca/web/collections/yorkspace/',
        } as ExternalLinkMenuItemModel,
        visible: true,
      },
      {
        model: {
          type: MenuItemType.EXTERNAL,
          text: 'menu.section.yorkspace_procedures',
          href: 'https://www.library.yorku.ca/web/collections/yorkspace/yorkspace-procedures/',
        } as ExternalLinkMenuItemModel,
        visible: true,
      },
      {
        model: {
          type: MenuItemType.EXTERNAL,
          text: 'menu.section.yorkspace_licence',
          href: 'https://www.library.yorku.ca/web/collections/yorkspace/yorkspace-license/',
        } as ExternalLinkMenuItemModel,
        visible: true,
      },
      {
        model: {
          type: MenuItemType.EXTERNAL,
          text: 'menu.section.yorkspace_deposit_form',
          href: 'https://forms.office.com/r/iHbJxcttkU',
        } as ExternalLinkMenuItemModel,
        visible: true,
      },
      {
        model: {
          type: MenuItemType.EXTERNAL,
          text: 'menu.section.yorkspace_help_resources',
          href: 'https://www.library.yorku.ca/web/collections/yorkspace/yorkspace-help-resources/',
        } as ExternalLinkMenuItemModel,
        visible: true,
      },
    ]);
  }

}
