


export function StationPreview({ station }) {
    return (

        <article className=" toy-preview ">
            <div className="station-img">
                <img src={station.imgUrl} alt="" />
            </div>
            <div className="sation-name">
            <h3 className="toy-name">{station.name}</h3>
            </div>
            <div className="station-desc">
            <h5 className="toy-name">{station.desc}</h5>
            </div>
         

        </article>
    )
}
