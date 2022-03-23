async function getLaunch() {
    const searchParams = new URLSearchParams(window.location.search)

    const launchid = searchParams.get("launchId")

    const response = await fetch(`https://api.spacexdata.com/v4/launches/${launchid}`)

    const id = await response.json()

    return id
}

async function setLaunch() {
    const launch = await getLaunch()
    const launchRow = document.getElementById('launch_row')

    launchRow.innerHTML += `
            <div class="col-sm-6 col-xs-6 col-md-6 col-lg-6 col-xl-6">
                <div class="card">
                <img src="${launch.links.patch.large}" class="card-img-top" alt="...">
                <div class="card-body">
                    <div>
                        <img id="smallImage" src="${launch.links.patch.small}" class="card-img-top" alt="...">
                        <h5 id="launchName" class="card-title">${launch.name}</h5>
                    </div>
                        <p id="launchDetails" class="card-text">Launch details: ${launch.details}</p>
                    <div>
                        <p id="dateDetails" class="card-text">Date details: ${launch.date_utc}</p>
                    </div>
                </div>
                </div>
            </div>
        `
}


setLaunch()