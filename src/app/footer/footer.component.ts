import { Component, Optional } from '@angular/core';
import { hasValue } from '../shared/empty.util';
import { KlaroService } from '../shared/cookies/klaro.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'ds-footer',
  styleUrls: ['footer.component.scss'],
  templateUrl: 'footer.component.html'
})
export class FooterComponent {
  dateObj: number = Date.now();

  /**
   * A boolean representing if to show or not the top footer container
   */
  showTopFooter = true;
  showPrivacyPolicy = false;
  showEndUserAgreement = false;

  constructor(@Optional() private cookies: KlaroService) {
  }

  showCookieSettings() {
    return false;
  }
}
