var database = firebase.database()

var dataTable = null

async function main() {
    let FETCH_STATUS = false
    // let FETCHED_DATA = [];
    let index = 1
    await database.ref('ttnapp').limitToLast(3000).once('value', function(snapshot) {
        //FETCHED_DATA = []

        snapshot.forEach(data => {
            // FETCHED_DATA.push(s.val())

            var location = data.child('payload_fields').val()

            var dt = data.child('metadata').val().time
            var sfd = new Date(dt)
            var date = sfd.getUTCFullYear()+'-'+(sfd.getUTCMonth()+1)+'-'+sfd.getUTCDate()
            var time = (sfd.getUTCHours()+7) + ':' + sfd.getUTCMinutes() + ':' + sfd.getUTCSeconds() // + '.' + sfd.getUTCMilliseconds()
            
            if (data.val().dev_id !== 'patok1') {
                return // the codes below will no be executed
            }


            const bodyTable = document.getElementById('bodyTable')

            const tr = document.createElement('tr')
            const arr = [index, date, time, location.latitude, location.longitude]
            const tds = []

            arr.map(a => {
                let x = document.createElement('td')

                x.innerText = a
                tds.push(x)
            })

            tds.forEach(td => tr.appendChild(td))

            bodyTable.appendChild(tr)
            index += 1

        })
        dataTable = $('#table').DataTable();
    })

    // No double data
    database.ref('ttnapp').endAt().limitToLast(1).on('child_added', function (snapshot) {
        if (!FETCH_STATUS) {
            FETCH_STATUS = true
            return
        }
        
        var location = snapshot.child('payload_fields').val()

        var dt = snapshot.child('metadata').val().time
        var sfd = new Date(dt)
        var date = sfd.getUTCFullYear()+'-'+(sfd.getUTCMonth()+1)+'-'+sfd.getUTCDate()
        var time = (sfd.getUTCHours()+7) + ':' + sfd.getUTCMinutes() + ':' + sfd.getUTCSeconds() // + '.' + sfd.getUTCMilliseconds()

        if (snapshot.val().dev_id !== 'patok1') {
            return // the codes below will no be executed
        }

        const bodyTable = document.getElementById('bodyTable')

        const tr = document.createElement('tr')
        const arr = [index, date, time, location.latitude, location.longitude]
        const tds = []

        arr.map(a => {
            let x = document.createElement('td')

            x.innerText = a
            tds.push(x)
        })

        tds.forEach(td => tr.appendChild(td))

        //bodyTable.appendChild(tr)
        index += 1
            
        dataTable.row.add(arr).draw(false)

    })
    
    
}

main()

