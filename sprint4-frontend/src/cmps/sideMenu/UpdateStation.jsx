import { useState } from "react";
import { stationService } from "../../services/station.service.local";

import TextField from '@mui/material/TextField';

export function UpdateStation({ station, setIsOnUpdate, onUpdateStation, handleStationUpdate }) {

    const [stationToUpdate, setStationToUpdate] = useState(station)
    const [imagePreview, setImagePreview] = useState(null)

    function handleChange(ev) {
        // ev.preventDefault()
        ev.stopPropagation()
        const field = ev.target.name
        const value = ev.target.value

        setStationToUpdate(prevUpdate => ({ ...prevUpdate, [field]: value }))
        setImagePreview(URL.createObjectURL(file))
    }

    function handleFileChange(ev) {
        const file = ev.target.files[0]
        if (file) {
            const filePreviewUrl = URL.createObjectURL(file)
            setImagePreview(filePreviewUrl)

            setStationToUpdate(prevUpdate => ({ ...prevUpdate, imgUrl: file }))
        }
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        ev.stopPropagation()

        const formData = new FormData()
        formData.append('image', stationToUpdate.imageFile)

        handleStationUpdate(stationToUpdate)

        closeModal()
    }

    function closeModal() {
        setIsOnUpdate(false)
    }

    function handleModalClick(ev) {
        ev.stopPropagation()
    }

    console.log("🚀 ~ UpdateStation ~ stationToUpdate:", stationToUpdate)

    return (
        <div className="update-modal-overlay" onClick={closeModal}>
            <div className="update-modal flex" onClick={handleModalClick}>
                <form className="modal-content" onSubmit={handleSubmit}>
                    <div className="modal-top">
                        <h3>Edit details</h3>
                        <button className="close-btn" onClick={closeModal}>
                            <svg data-encore-id="icon" role="img" aria-label="Close" aria-hidden="true" viewBox="0 0 16 16" class="Svg-sc-ytk21e-0 kcUFwU">
                                <path d="M2.47 2.47a.75.75 0 0 1 1.06 0L8 6.94l4.47-4.47a.75.75 0 1 1 1.06 1.06L9.06 8l4.47 4.47a.75.75 0 1 1-1.06 1.06L8 9.06l-4.47 4.47a.75.75 0 0 1-1.06-1.06L6.94 8 2.47 3.53a.75.75 0 0 1 0-1.06Z"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="content-container grid">

                        <input className="station-name"
                            type="text"
                            id="txt"
                            label="Name"
                            name="name"
                            value={stationToUpdate.name}
                            onChange={handleChange}
                        />

                        <input className="station-desc"
                            type="text"
                            id="txt"
                            label="Description"
                            name="desc"
                            value={stationToUpdate.desc}
                            onChange={handleChange}
                        />

                        <div className="station-img">
                            {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}

                            <label htmlFor="image-upload" className="image-upload-btn">
                                Upload Image
                            </label>
                            <input
                                type="file"
                                id="image-upload"
                                name="image"
                                accept="image/*"
                                onChange={handleFileChange} hidden />
                        </div>

                        <p className="disclaimer">By proceeding, you agree to give Soundify access to the image you choose to upload. Please make sure you have the right to upload the image.</p>

                        <button className="save-btn" type="submit">Save</button>
                    </div>

                </form>
            </div>

        </div>
    )
}