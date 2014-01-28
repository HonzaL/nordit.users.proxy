
module.exports = {
    default: {
	db: {
	    mongo: "mongodb://localhost/nbims"
	},
	users: {
	    port: 8090,
    	    host: "users2.nordit.cz",
	},
	routerFile: "table.g.json",
	router: {
	    port: 8095,
	    pre: {},
	    post: {
		"/cw/eu/": "192.168.2.12:8084"
	    }
	}
    },
    development: {
	db: {
	    mongo: "mongodb://localhost/nbims_dev"
	},
	users: {
            host: "localhost"
	}
    }
}
