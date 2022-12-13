const db = require('../database/ConsultationConnect')
const ObjectId = require('mongodb').ObjectId
/*

Database Pattern

| name: String
| description: String
| hours: Array

*/
module.exports = {
	async index(req, res){
		let data = []

		await db.find().forEach((e) => {
			data.push(e)
		});
		
		return res.json(data)
	},
	async create(req, res){
		const { name, description, hours } = req.body

		let doc = {
			name, 
			description, 
			hours
		}

		await db.insertOne(doc);
		res.status(200)
		return res.json(doc)
	},
	async search(req, res){
		const { search, type } = req.body
		console.log('params 1 - ', req.body)
		console.log('params 2 - ', req.params)
		console.log('params 3 - ', req.query)
		let query = {}
		
		if(type === '_id'){
			console.log('_id')
			query = {_id: new ObjectId(search)}

			let data = []

			await db.find(query).forEach((e) => {
				data.push(e)
			});
			
			return res.json(data[0])
		}else{
			query[type] = search
			let data = []

			await db.find(query).forEach((e) => {
				data.push(e)
			});
			
			return res.json(data)
		}
		
		
	},
	async edit(req, res){

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
	}
}