let margin = {top: 20, right: 20, bottom: 30, left: 40}
let width = 1429
let height = 1000
let updateTime = 800
let selected = null;
let selectedColor = null
let head=55
let body=10
let isBack=1

d3.json("Data/dataset.json")
    .then(dataset => {

        let createSvg = () =>
            d3.select("body").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                .on("click", function(){

                    if (isBack!=0){
                        drawMosquitos(randomPosition(dataset))}

                    isBack=1
                })

        let drawMosquitos = (ds) => {

            const onClickComponent = (component) => {
                isBack=0
                const sortBody= [...ds].sort((a,b)=> a[component] - b[component]).map((data,index)=> ({...data,x:40 + index*120,y:300}))
                drawMosquitos(sortBody)
            }

            const mosquitos=svg.selectAll(".mosquito").data(ds, (d) => d.id)
            mosquitos.exit().remove()
            const mosquito=mosquitos.enter()
                .append('g')
                .attr('class','mosquito')
                .attr('id',(d)=>d.id)
            //console.log(dataset.length)

            mosquito
                .append("svg:image")
                .attr("id","wing")
                .attr("x",(d) => d.x + head + (d.rx/2))
                .attr("y", (d) => d.y - d.wing)
                .attr("xlink:href", "images/mosquito.svg")
                .attr("height", (d) => d.wing)
                .attr("width", (d) => d.wing)
                .on("click", () => onClickComponent('wing'))

            mosquito
                .append("svg:image")
                .attr("id","tail")
                .attr("x",(d) => d.x + head + d.rx + (d.rx/4))
                .attr("y", (d) => d.y-(d.tail/2.5))
                .attr("xlink:href", "images/tail.svg")
                .attr("height", (d) => d.tail)
                .attr("width", (d) => d.tail)
                .on("click", () => onClickComponent('tail'))

            mosquito
                .append("svg:image")
                .attr("id", "paw")
                .attr("x", (d) => d.x + head )
                .attr("y", (d) => d.y + body/1.5)
                .attr("xlink:href","images/paw.svg")
                .attr("height", (d)=> d.paw)
                .attr("width",(d)=>d.paw)
                .on("click", () => onClickComponent('paw'))
            mosquito
                .append("ellipse")
                .attr("id", "body")
                .attr("cx", (d) => d.x + head + d.rx -3 )
                .attr("cy", (d) => d.y )
                .attr("rx", (d) => d.rx)
                .attr("ry",body)
                .on("click", () => onClickComponent('rx'))
            mosquito
                .append("svg:image")
                .attr("id", "head")
                .attr("x", (d) => d.x + head/3)
                .attr("y", (d) => d.y - head/3)
                .attr("xlink:href","images/head.svg")
                .attr("height", head)
                .attr("width",head)
                .on("click",function(e) {
                    isBack=0
                    d3.select("#cloud").remove()
                    line=svg.append("svg:image")
                        .attr("id", "cloud")
                        .attr("x", e.x -40)
                        .attr("y", e.y -110)
                        .attr("xlink:href","images/cloud.svg")
                        .attr("height", 100)
                        .attr("width",100)
                })
            mosquitos.select('#body')
                .transition().duration(1000)
                .attr("cx", (d) => d.x + head + d.rx -3 )
                .attr("cy", (d) => d.y )
                .attr("rx", (d) => d.rx)
                .attr("ry",body)

            mosquitos.select('#wing')
                .transition().duration(1000)
                .attr("x",(d) => d.x + head + (d.rx/2) )
                .attr("y",(d) => d.y - d.wing )
                .attr("height", (d) => d.wing)
                .attr("width", (d) => d.wing)

            mosquitos.select('#tail')
                .transition().duration(1000)
                .attr("x",(d) => d.x + head + d.rx + (d.rx/4) )
                .attr("y",(d)=>d.y-(d.tail/2.5) )
                .attr("height", (d) => d.tail)
                .attr("width", (d) => d.tail)

            mosquitos.select('#paw')
                .transition().duration(1000)
                .attr("x",(d) => d.x + head )
                .attr("y",(d) => d.y + body/1.5 )
                .attr("height", (d) => d.paw)
                .attr("width", (d) => d.paw)

            mosquitos.select('#head')
                .transition().duration(1000)
                .attr("x",(d) => d.x + head/3 )
                .attr("y",(d) => d.y - head/3 )

            d3.selectAll("#cloud").remove()
        }

        let svg = createSvg()
        drawMosquitos(dataset)

        let randomPosition=(ds)=>{
            return ds
                .map(data => ({...data,x: Math.floor(Math.random() * 1280),y:Math.floor(Math.random() * 720)+30}))
        }

    })

    .catch(error => {
        console.log(error)
    })