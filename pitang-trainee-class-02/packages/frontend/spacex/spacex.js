async function getLaunches(prev, next) {
    const response = await fetch('https://api.spacexdata.com/v4/launches')
    const data = await response.json()

    return data.slice(prev, next)
}

async function sum(prev, next) {
    let aux = prev
    prev += 30
    next += aux + 30

    const launches = await getLaunches(prev, next)

    setLaunchesRows(launches)
}


function setLaunchesRows(launches) {
    const launchesRow = document.getElementById('launches_row')
    const launchesHeading = document.querySelector('h1')

    launchesHeading.innerText += `(${launches.length})`

    for (const launch of launches) {
        launchesRow.innerHTML += `
    <div class="col-sm-12 col-xs-12 col-md-6 col-lg-4 col-xl-4">
      <div class="card">
      <img src="${launch.links.patch.large}" class="card-img-top" alt="...">
      <div class="card-body">
          <h5 class="card-title"><a href="launch.html?launchId=${launch.id}" >${launch.name}</a></h5>
          <p class="card-text">${launch.details}</p>
      </div>
      </div>
    </div>
    `
    }
}

async function main() {
    const launches = await getLaunches(0, 30)

    setLaunchesRows(launches)
}


main()