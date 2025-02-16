
document.getElementById('authorize_button').style.visibility = 'hidden';
document.getElementById('signout_button').style.visibility = 'hidden';

function fetchSheetData() {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: 'YOUR_SPREADSHEET_ID',
        range: 'Sheet1!A:A' // Assuming your data is in column A
    }).then(function(response) {
        var range = response.result;
        if (range.values.length > 0) {
            let sum = 0;
            for (var i = 0; i < range.values.length; i++) {
                var number = parseFloat(range.values[i][0]);
                if (!isNaN(number)) {
                    sum += number;
                }
            }
            document.getElementById('result').innerText = `Sum of column A: ${sum}`;
        } else {
            document.getElementById('result').innerText = 'No data found.';
        }
    }, function(response) {
        console.log('Error: ' + response.result.error.message);
    });
}

/**
 * Print the names and majors of students in a sample spreadsheet:
 * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 */
async function getContent() {
  document.getElementById('loader').style.visibility = 'hidden';
  alert('authorized, getting content...');

  let response;
  try {
      // Fetch first 10 files
      response = await gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
          range: 'Class Data!A2:E',
      });
  } catch (err) {
      document.getElementById('content').innerText = err.message;
      return;
  }
  const range = response.result;
  if (!range || !range.values || range.values.length == 0) {
      document.getElementById('content').innerText = 'No values found.';
      return;
  }
  // Flatten to string to display
  const output = range.values.reduce(
      (str, row) => `${str}${row[0]}, ${row[4]}\n`,
      'Name, Major:\n');
  document.getElementById('content').innerText = output;
}