/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

/// <reference types="cypress" />

import {
  SEARCH_RELEVANCE_PLUGIN_NAME,
  SAMPLE_INDEX,
} from '../../../utils/plugins/search-relevance-dashboards/constants';
import { BASE_PATH } from '../../../utils/base_constants';

const SAMPLE_SEARCH_TEXT = 'basic';
const SAMPLE_QUERY_TEXT = `{"query":{"match":{"products.product_name":"%SearchText%"}}}`;
const NO_RESULTS = `0 results`;

describe('Compare queries', () => {
  beforeEach(() => {
    // Visit Search Relevance OpenSearch Dashboards
    cy.visit(`${BASE_PATH}/app/${SEARCH_RELEVANCE_PLUGIN_NAME}/`);
  });

  it('Should get comparison results', () => {
    // Type search text in search box
    cy.get('input[type="search"]').type(SAMPLE_SEARCH_TEXT, {
      force: true,
    });

    // Select index 1
    cy.get('div.search-relevance-config:nth-child(1) select').select(
      SAMPLE_INDEX
    );
    // Select index 2
    cy.get('div.search-relevance-config:nth-child(2) select').select(
      SAMPLE_INDEX
    );

    // Type query 1
    cy.get(
      'div.search-relevance-config:nth-child(1) div[data-test-subj="codeEditorContainer"]'
    ).type(SAMPLE_QUERY_TEXT, {
      parseSpecialCharSequences: false,
    });
    // Type query 2
    cy.get(
      'div.search-relevance-config:nth-child(2) div[data-test-subj="codeEditorContainer"]'
    ).type(SAMPLE_QUERY_TEXT, {
      parseSpecialCharSequences: false,
    });

    // Click search button
    cy.get('.search-relevance-flex button.euiButton--primary').click({
      force: true,
    });

    // Confirm get results on both result panel
    cy.get(
      '.search-relevance-result-panel:nth-child(1) > div > div:nth-child(2) > h2'
    ).should('not.equal', NO_RESULTS);
    cy.get(
      '.search-relevance-result-panel:nth-child(2) > div > div:nth-child(2) > h2'
    ).should('not.equal', NO_RESULTS);
  });
});
