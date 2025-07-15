const initialState = {
  events: [
    { 
      id: 1, 
      title: 'Town Council Meeting', 
      date: 'July 15, 2024', 
      description: 'Monthly town council meeting with agenda items covering community development, budget approvals, and public safety initiatives.' 
    },
    { 
      id: 2, 
      title: 'Summer Concert Series', 
      date: 'July 20, 2024', 
      description: 'Free outdoor concerts in the town square featuring local bands and artists every Friday evening throughout July.' 
    },
    { 
      id: 3, 
      title: 'Community Clean-Up Day', 
      date: 'August 5, 2024', 
      description: 'Volunteer event to clean public spaces, parks, and neighborhoods. Gloves, bags, and refreshments provided.' 
    },
    { 
      id: 4, 
      title: 'Back to School Fair', 
      date: 'August 12, 2024', 
      description: 'Annual event offering free school supplies, health screenings, and resources for families preparing for the new school year.' 
    }
  ],
  news: [
    { 
      id: 1, 
      date: 'June 28, 2024', 
      title: 'New Park Opens in Central District', 
      content: 'The new community park features modern playgrounds, walking trails, and picnic areas. This project was funded through the municipal improvement initiative and aims to provide more green space in our urban center.' 
    },
    { 
      id: 2, 
      date: 'June 25, 2024', 
      title: 'Road Closure on Elm Street', 
      content: 'Elm Street will be closed for essential infrastructure upgrades from July 1st to July 15th. Detour routes will be clearly marked, and local access will be maintained for residents.' 
    },
    { 
      id: 3, 
      date: 'June 20, 2024', 
      title: 'Summer Concert Series Announced', 
      content: 'Enjoy free concerts every Friday evening in the town square throughout July. This year\'s lineup features diverse musical genres from jazz to rock, with food vendors and family activities.' 
    }
  ],
  contactSubmissions: []
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SUBMIT_CONTACT_FORM':
      return {
        ...state,
        contactSubmissions: [...state.contactSubmissions, action.payload]
      }
    default:
      return state
  }
}

export default rootReducer