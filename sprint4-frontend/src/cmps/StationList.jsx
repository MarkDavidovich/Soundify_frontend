import { StationPreview } from "./StationPreview";


export function StationList({ stations }) {


  return (
    <section>
      <ul className="station-list">
        {
          stations.map(station => (
            <li className=" clean-list" key={station._id}>
              <div>
                <StationPreview station={station}
                />
              </div>
            </li>

          ))
        }
      </ul>
    </section>
  )

}
