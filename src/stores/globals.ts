import { defineStore } from 'pinia'

export const useGlobalsStore = defineStore('globals', {
    state: () => {
        return {
            // localUrl: "https://web2-labs.onrender.com",
            localUrl: "https://lab2-server.onrender.com",
            deployUrl: "https://localhost:4080",
            commentsData: [],
            tableData: {},
            fixturesData: {},
            resultsData: {},
            userRole: "",
        }
    },
    actions: {

    },
})