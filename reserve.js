const express = require('express')
const {google} = require('googleapis');
const keys = require('./keys.json')
const cors = require('cors')

//initialize express
const app = express()
app.use(cors())
app.use(express.json())


app.get('/a',  async (request, response) =>{
    const auth = new google.auth.GoogleAuth({
        keyFile: "keys.json", //the key file
        //url to spreadsheets API
        scopes: "https://www.googleapis.com/auth/spreadsheets", 
    });

    //Auth client Object
    const authClientObject = await auth.getClient();
    
    //Google sheets instance
    const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });

    // spreadsheet id
    const spreadsheetId = "10xhJgxg0H3uHZ_hsWstGwtjEU6dVWIk1eHsLn9myNWs";

    // Get metadata about spreadsheet
    //const sheetInfo = await googleSheetsInstance.spreadsheets.get({
    //    auth,
    //    spreadsheetId,
    //});

    //Read from the spreadsheet
    //const readData = await googleSheetsInstance.spreadsheets.values.get({
    //    auth, //auth object
    //    spreadsheetId, // spreadsheet id
    //    range: "a!A:A", //range of cells to read from.
    //    majorDimension: "COLUMNS",
    //})
    

    //write data into the google sheets
    await googleSheetsInstance.spreadsheets.values.append({
        auth, //auth object
        spreadsheetId, //spreadsheet id
        range: "a!A:A", //sheet name and range of cells
        valueInputOption: "USER_ENTERED", // The information will be passed according to what the usere passes in as date, number or text
        resource: {
            majorDimension: "COLUMNS",
            values: [['article', 'author']]
        },
    });
    
    response.send("Request submitted.!!")
});

app.get('/', async (req, res) =>{
    const auth = new google.auth.GoogleAuth({
        keyFile: "keys.json", //the key file
        //url to spreadsheets API
        scopes: "https://www.googleapis.com/auth/spreadsheets", 
    });

    //Auth client Object
    const authClientObject = await auth.getClient();
    
    //Google sheets instance
    const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });

    // spreadsheet id
    const spreadsheetId = "10xhJgxg0H3uHZ_hsWstGwtjEU6dVWIk1eHsLn9myNWs";

    // Get metadata about spreadsheet
    const sheetInfo = await googleSheetsInstance.spreadsheets.get({
        auth,
        spreadsheetId,
    });
    console.log('SheetInfo - ', sheetInfo.data.sheets)
    //Read from the spreadsheet
    const readData = await googleSheetsInstance.spreadsheets.values.get({
        auth, //auth object
        spreadsheetId, // spreadsheet id
        range: "a!A:Z", //range of cells to read from.
        majorDimension: "COLUMNS",
    })
    let data = readData.data.values
    console.log(data)
    let result = {
        horario: []
    }
    for (var i = 0; i < data.length; i++) {
        let element = data[i]
        let formatHoursAndLimit = element.splice(0,1)[0].split(' - ');
        let hours = formatHoursAndLimit[0]
        let limite = parseInt(formatHoursAndLimit[1])
        console.log(hours + ' - ',element)
        console.log(element.length, limite)
        if(element.length !== limite){
            
            result.horario.push(hours)
        }
    }
    
    res.json(result)
})

const PORT = 3001;

//start server
const server = app.listen(PORT, () =>{
    console.log(`Server started on port localhost:${PORT}`);
});
