import { REGEX_MATCH_NON_EMPTY_TEXT, TEST_ENTITY_PUBLICATION } from 'cypress/support/e2e';
import { testA11y } from 'cypress/support/utils';
import '../support/commands';

describe('Site Statistics Page', () => {
    it('should load if you click on "Statistics" from homepage', () => {
        cy.visit('/');
        cy.get('ds-navbar ds-link-menu-item a[title="Statistics"]').click();
        cy.location('pathname').should('eq', '/statistics');
    });

    it('should pass accessibility tests', () => {
        // generate 2 view events on an Item's page
        cy.generateViewEvent(TEST_ENTITY_PUBLICATION, 'item');
        cy.generateViewEvent(TEST_ENTITY_PUBLICATION, 'item');

        cy.visit('/statistics');

        // <ds-site-statistics-page> tag must be visable
        cy.get('ds-site-statistics-page').should('be.visible');

        // Analyze <ds-site-statistics-page> for accessibility issues
        testA11y('ds-site-statistics-page');
    });
});
