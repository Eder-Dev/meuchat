const db = require('../database/BookingConnect')
const ObjectId = require('mongodb').ObjectId
/*

Database Pattern

| cpf: Number
| numSUS: Number
| data: Date
| consultation: String

*/
module.exports = {
	async index(req, res) {
		let data = []

		await db.find().forEach((e) => {
			data.push(e)
		});
		
		return res.json(data)
	},

	async create(req, res){		
		const { name, cpf, numSUS, date, consultation } = req.body
		console.log('Body - ', req.body)
		cpf.replaceAll('.','').replaceAll('-','')
		numSUS.replaceAll('.','').replaceAll('-','')

		let doc = {
			name,
			cpf, 
			numSUS, 
			date, 
			consultation
		}

		await db.insertOne(doc);
		res.status(200)
		return res.json(doc)
	},
	async search(req, res) {
		const { search, type } = req.body

		let query = {}
		query[type] = search
		console.log(query)
		let data = []

		await db.find(query).forEach((e) => {
			data.push(e)
		});
		
		return res.json(data)
	},
	async delete(req, res){
		const { id } = req.body
		let query = {_id: new ObjectId(id)}

		const result = await db.deleteOne(query)

		console.log(result, query)
		if (result.deletedCount === 1) {
	      return res.json({status:"Successfully deleted one document."});
	    } else {
	      return res.json({status:"No documents matched the query. Deleted 0 documents."});
	    }
	},
}
