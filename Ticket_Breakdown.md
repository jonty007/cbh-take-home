# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

# Informed Guesses:

1. Same Agent can work in multiple facilities in a quarter and can have different custom agent id for each of the facility.
2. Custom id should ideally be something more readbale, so archer or string should be the apt datatype here.
3. There is a possibility that agent can change custom id over course of time for the same facility. In case if this happens multiple times in single quarter, we will use the latest one. We will also keep versions of each custom id of agent for audit purpose.
4. In case if there is not custom id present, we will use the existing agent id for the purpose.

# Overall Approach

There will be a new Mapping component, which will be used for the custom ids logic, so that the exisitng logic is least hampered. This new mapping API will be used to interact with facility to store the customs ids for the agents. While report generation, this new mapping table will be used to fetch the new custom id for the agents if present.

# Tasks:

## 1. Create Mapping Table for custom ids:

Description: The Mapping table should have five columns facility id, agent id, custom id, start date and end date (last two for audit purpose). Here the Facility id and Agent id will be foreign key to the existing Facility and Agent table. The data type for the custom id will be of type string or var-char.

### Acceptance Criteria:

AC1: new table with expected schema

AC2: foreign key are updated in existing schema’s

Expected Effort:
4hrs

## 2. Create Custom Mapping Service:

Description: The Mapping Service will take facility id, agent id and custom id as input to the API. It is expected to have proper checks around input (like ids would not be null or empty, Or the custom id is already the current valid id for the agent and facility). The API should throw errors for these scenarios accordingly. This API will require integrations with DAO layer & hence have dependency on task #3

### Acceptance Criteria:

AC1: New Service & API needs to have access control (only authorised person should be able to make the changes)

AC2: Input validation failure should throw relevant exceptions

Expected Effort:
2 days

## 3. Mapping Service DAO Layer to interact with DB

Description: This task would require creating DAO layer that will interact with DB to insert/update the data into the new table. The sql logic around adding adding new record and invalidating existing one should be under same transaction block, so that rollback can also be done easily, in case any error occurs.

### Acceptance Criteria:

AC1: In case of successful transaction, a new valid records should be inserted in the table.

AC2: If there is already an existing valid entry present in table for the agent and facility id combination, it should be invalidated.

AC3: In case of a failure, table should be rollback to last stable state.

AC4: Integration tests should be written

Expected Effort:
2 days

## 4. Change to existing Report Generation Service:

Description: The SQL Logic around report generation will have another join on the custom mapping table with join on facility id and agent id and the end time, to pick the latest. Incase if the custom id value is null, we will pick the existing agent id.

### Acceptance Criteria:

AC1: If there is a valid custom id present for the agent for that facility, it should be displayed in the report.

AC2: If there is no valid custom id present for the agent for the facility, then the actual agent id should be displayed in the report.

Expected Effort:
1 day
