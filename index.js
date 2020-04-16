const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const Business = require("./models/Business")
const City = require("./models/City")
const Point = require("./models/Point")

require('dotenv').config()

const app = express()

const port = process.env.PORT || 8001

app.listen(port, () => {
    console.log("The API server is up and running on port", port)
})

app.use(express.json({limit: '100mb'}));
app.use(cors())
mongoose.connect(process.env.MONGO_ENDPOINT, {useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology:true});

app.get("/", (req, res) => {
    res.json({"status": "true", "message": "API is running"})
})

app.post("/", async (req, res) => {
    const data = req.body.data
    const results = await batchInsertOrUpdate(data)
    res.json({status: true, failures: results[0], updates: results[1], inserts: results[2]})
})

async function batchInsertOrUpdate(data)
{
    return new Promise(async function(resolve, reject) {
        let status = -1
        let updates = 0
        let inserts = 0
        let failures = 0
        for(let i=0; i<data.length; i++)
        {
            const record = data[i]
            status = await insertOrUpdate(record)
            switch(status)
            {
                case -1:
                    failures += 1
                    break;
                case 0:
                    updates += 1
                    break
                case 1:
                    inserts += 1
                    break
                default:
                    failures += 1
            }
        }
        resolve([failures, updates, inserts])
    })
}

async function insertOrUpdate(record)
{
    let cityInDb = await City.findOne({name: record["city"]}).exec()
    if(cityInDb === null)
    {
        cityInDb = await City({name: record["city"], slug: record["city"].toLowerCase()}).save()
    }

    record["city"] = cityInDb["_id"]
    const businessInDb = await Business.findOne({name: record["name"], city: record["city"]}).exec()
    if(businessInDb)
    {
        const update = await Business.update({name: record["name"]}, record).exec()
        if("nModified" in update && update["nModified"] > 0) return 0
        return -1
    }
    else
    {
        const insert = await Business(record).save()
        if("_id" in insert) return 1
        return -1
    }
}