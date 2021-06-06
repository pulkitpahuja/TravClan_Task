# Travclan Task Assignment- Pulkit Pahuja

Task Assignment submission by Pulkit Pahuja. The task can be found below.

## Steps To Follow

In the project directory, you can run:

### 1. `npm install` 

Installs all the dependencies required for the app to run.


### 2. `npm start` OR `yarn test`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.



# Task
Develop a Single page application with following mentioned features
but not necessarily limited to it.
### Must:
1. Display a list of customers (with pagination).
2. Each customer bas several bids, by default only the maximum bid
should be displayed. Also add a toggle button so that on switching
toggle only the minimum bid is displayed.
3. Enable sorting of customer list by bid amount.
4. Front-end part should be developed as SPA with ES6, React(Hooks).
### Good to have:
1. Using Context Api or Custom Hooks will be a big plus.
2. Clicking on any row should redirect to a separate url where all the
selected customer's bids should be displayed. (use your creativity on
how to display the data).

3. Styling is not a priority but using Material Ui(https://material-
ui.com) entirely will be a plus.

Use following API to retrieve the data - `https://intense-tor-
76305.herokuapp.com/merchants`

## Data structure example
Customer {
id: string,
firstname: string,
lastname: string,
avatarUrl: string,
email: string,
phone: string,
hasPremium: boolean,
bids: Array<Bid>
}
Bid {
id: string,
carTitle: string,
amount: number,
created: string
}
## Table expected
___________________________________________________________________
| Customer name (with avtar) | Email | Phone | Premium | Max/Min bid |
___________________________________________________________________
