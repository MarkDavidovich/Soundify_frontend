import { useState } from "react";
import { stationService } from "../../services/station.service.local";

import TextField from '@mui/material/TextField';

export function UpdateStation({ station, setIsOnUpdate, onUpdateStation, handleStationUpdate }) {


    const [stationToUpdate, setStationToUpdate] = useState(station)

    function handleChange(ev) {
        // ev.preventDefault()
        ev.stopPropagation()
        const field = ev.target.name
        const value = ev.target.value

        setStationToUpdate(prevUpdate => ({ ...prevUpdate, [field]: value }))
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        ev.stopPropagation()

        console.log("🚀 ~ handleSubmit ~ stationToUpdate:", stationToUpdate)

        handleStationUpdate(stationToUpdate)
        closeModal()
    }

    function closeModal() {
        setIsOnUpdate(false)
    }

    function handleModalClick(ev) {
        ev.stopPropagation()
    }

    // const { name, desc, imgUrl } = stationToUpdate

    return (
        <div className="update-modal-overlay" onClick={closeModal}>
            <div className="update-modal" onClick={handleModalClick}>
                <form className="modal-content" onSubmit={handleSubmit}>
                    <h3>Edit details</h3>
                    <button className="btn" onClick={closeModal}>x</button>
                    <div className="input-container grid">

                        <TextField className="station-name"
                            type="text"
                            id="txt"
                            label="Name"
                            name="name"
                            value={stationToUpdate.name}
                            onChange={handleChange}
                        />
                        <TextField className="station-desc"
                            type="text"
                            id="txt"
                            label="Description"
                            name="desc"
                            value={stationToUpdate.desc}
                            onChange={handleChange}
                        />

                    </div>
                    <button className="btn" type="submit"></button>

                </form>
                <p className="disclaimer">By proceeding, you agree to give Soundify access to the image you choose to upload. Please make sure you have the right to upload the image.</p>
            </div>

        </div>
    )
}