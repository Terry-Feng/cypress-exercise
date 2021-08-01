Feature: Edit user profile

  Some description here

  Scenario: test 1
    Given My bank accounts page is opened
      | email                  | password     |
      | terry.jxfeng@gmail.com | Xerotest#123 |
    When I add an ANZ bank account
    Then I can see the header "Let your bank send transactions to Xero"
