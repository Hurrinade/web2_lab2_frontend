import { defineStore } from 'pinia'

export const useGlobalsStore = defineStore('globals', {
    state: () => {
        return {
            // localUrl: "https://lab2-server.onrender.com",
            // localUrl: "https://localhost:4080",
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